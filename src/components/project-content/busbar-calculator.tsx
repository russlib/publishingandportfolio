import { Figure, Collapsible, BlockEquation, InlineEquation, ColabBadge } from "@/components/article";

const img = (name: string) => `/projects/busbar-calculator/${name}`;

const pythonCode = `import numpy as np
import matplotlib.pyplot as plt
import pandas as pd

# 1. MATERIAL DATABASE
materials = {
    'Copper':   {'density': 8960, 'Cp': 385, 'alpha': 0.00393, 'rho_ref': 1.68e-8},
    'Aluminum': {'density': 2700, 'Cp': 897, 'alpha': 0.0039,  'rho_ref': 2.82e-8},
    'Brass':    {'density': 8500, 'Cp': 377, 'alpha': 0.0020,  'rho_ref': 7.0e-8},
}

# 2. INPUTS
CHOSEN_MATERIAL = 'Copper'
I = 600                     # Current (A)
total_time = 7200           # 2 hours
V_load = 600                # System Voltage
h_conv = 8                  # Convection coeff (W/m^2*K)

# Realistic Dimensions (in meters)
L, w, h_dim = 1.0, 0.050, 0.010
T_amb, T_ref = 25, 20

# 3. SETUP & STEADY STATE
mat = materials[CHOSEN_MATERIAL]
A = w * h_dim
As = 2 * L * (w + h_dim)
mass = mat['density'] * (L * w * h_dim)
R_ref = mat['rho_ref'] * (L / A)

# Analytical Steady State
num = (I**2 * R_ref * (1 - mat['alpha'] * T_ref)) + (h_conv * As * T_amb)
den = (h_conv * As) - (I**2 * R_ref * mat['alpha'])
T_steady = num / den

# 4. SIMULATION ENGINE
dt = total_time / 5000
steps = int(total_time / dt)
time_axis = np.linspace(0, total_time, steps)

temp_history = np.zeros(steps)
q_conv_history = np.zeros(steps)
loss_history = np.zeros(steps)
T_current = T_amb

for i in range(steps):
    R_t = R_ref * (1 + mat['alpha'] * (T_current - T_ref))
    Q_gen = (I**2) * R_t
    Q_conv = h_conv * As * (T_current - T_amb)

    P_total = (I * V_load) + Q_gen
    energy_loss_pct = (Q_gen / P_total) * 100

    dT_dt = (Q_gen - Q_conv) / (mass * mat['Cp'])
    T_current += dT_dt * dt

    temp_history[i] = T_current
    q_conv_history[i] = Q_conv
    loss_history[i] = energy_loss_pct
`;

export function BusbarCalculatorContent() {
  return (
    <article className="article-prose">
      <section>
        <h2>Busbar Analysis</h2>
        <p>
          Transient thermal model for an FSAE busbar under continuous current. I wanted the team
          to see how busbar temperature actually behaves, not just get a steady-state number from
          a spreadsheet. Energy balance with I&sup2;R heating, convection dissipation, and
          temperature-dependent resistivity, solved both analytically for steady state and
          numerically for the full transient.
        </p>

        <ColabBadge
          href="https://colab.research.google.com/github/russlib/Publishing/blob/main/BusbarCalculator.ipynb"
          caption="Open the Colab notebook to change material, current, dimensions, or h-coefficient and re-run."
        />
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Theory</h2>

        <h3>Energy Balance</h3>
        <p>
          Starting from a control volume on the busbar: heat in from Joule heating, heat out via
          convection, no flow work, no phase change. That gives us:
        </p>
        <BlockEquation tex="Q_{gen} - Q_{conv} = \frac{dU}{dt}" />

        <h3>Busbar-Specific Form</h3>
        <BlockEquation tex="(I^2 \cdot R) - (h \cdot A_s \cdot (T - T_{amb})) = m \cdot C_p \cdot \frac{dT}{dt}" />

        <h3>Key Equations</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead>
              <tr><th>Equation</th><th>Formula</th></tr>
            </thead>
            <tbody>
              <tr><td><strong>Heat Generation</strong></td><td><InlineEquation tex="Q_{gen} = I^2 \cdot R" /></td></tr>
              <tr><td><strong>Convection (dissipation)</strong></td><td><InlineEquation tex="Q_{conv} = h \cdot A_s \cdot (T - T_{amb})" /></td></tr>
              <tr><td><strong>Cross-section area</strong></td><td><InlineEquation tex="A = w \cdot h_{dim}" /></td></tr>
              <tr><td><strong>Surface area (cooling)</strong></td><td><InlineEquation tex="A_s = 2 \cdot L \cdot (w + h_{dim})" /></td></tr>
              <tr><td><strong>Temp-dependent resistance</strong></td><td><InlineEquation tex="R(T) = R_{ref} \cdot [1 + \alpha \cdot (T - T_{ref})]" /></td></tr>
              <tr><td><strong>Mass</strong></td><td><InlineEquation tex="m = \rho \cdot (L \cdot w \cdot h_{dim})" /></td></tr>
            </tbody>
          </table>
        </div>

        <h3>Variables</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead>
              <tr><th>Symbol</th><th>Definition</th><th>SI Unit</th></tr>
            </thead>
            <tbody>
              <tr><td><InlineEquation tex="Q_{gen}" /></td><td>Internal heat generation (Joule heating)</td><td>W</td></tr>
              <tr><td><InlineEquation tex="Q_{conv}" /></td><td>Convective heat loss</td><td>W</td></tr>
              <tr><td><InlineEquation tex="I" /></td><td>Current</td><td>A</td></tr>
              <tr><td><InlineEquation tex="R" /></td><td>Electrical resistance (temp-dependent)</td><td>&Omega;</td></tr>
              <tr><td><InlineEquation tex="R_{ref}" /></td><td>Resistance at reference temperature</td><td>&Omega;</td></tr>
              <tr><td><InlineEquation tex="L, w, h_{dim}" /></td><td>Busbar length, width, height</td><td>m</td></tr>
              <tr><td><InlineEquation tex="A_s" /></td><td>Surface area for cooling</td><td>m&sup2;</td></tr>
              <tr><td><InlineEquation tex="h" /></td><td>Convective heat transfer coefficient</td><td>W/(m&sup2;&middot;K)</td></tr>
              <tr><td><InlineEquation tex="T, T_{amb}, T_{ref}" /></td><td>Busbar, ambient, reference temperatures</td><td>&deg;C or K</td></tr>
              <tr><td><InlineEquation tex="\alpha" /></td><td>Temperature coefficient of resistance</td><td>1/&deg;C</td></tr>
              <tr><td><InlineEquation tex="m" /></td><td>Mass</td><td>kg</td></tr>
              <tr><td><InlineEquation tex="C_p" /></td><td>Specific heat capacity</td><td>J/(kg&middot;K)</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Simulation Results</h2>

        <Figure
          src={img("busbar-analysis-plot.png")}
          alt="Busbar temperature rise, heat dissipated, and % energy loss over a 2-hour simulation"
          caption="Busbar temperature rise to steady state with convection and % energy loss over 2 hours. Copper, 600 A, h = 8 W/m²K."
        />

        <p>Three metrics over a 2-hour simulation:</p>
        <ul>
          <li><strong>Red:</strong> busbar temperature rising to steady state</li>
          <li><strong>Green:</strong> rate of heat dissipated to air (convection)</li>
          <li><strong>Blue dashed:</strong> percentage of electrical energy lost as heat</li>
        </ul>

        <h3>Summary</h3>
        <div className="overflow-x-auto my-[24px]">
          <table className="text-[13px]">
            <thead><tr><th>Parameter</th><th>Value</th></tr></thead>
            <tbody>
              <tr><td>Material</td><td>Copper</td></tr>
              <tr><td>Dimensions (W &times; H &times; L)</td><td>50 mm &times; 10 mm &times; 1000 mm</td></tr>
              <tr><td>Mass</td><td>4.480 kg</td></tr>
              <tr><td>Current</td><td>600 A</td></tr>
              <tr><td>h coefficient</td><td>8 W/m&sup2;&middot;K</td></tr>
              <tr><td>Steady-state temperature</td><td>38.52 &deg;C</td></tr>
              <tr><td>Final energy loss</td><td>0.0036 %</td></tr>
            </tbody>
          </table>
        </div>
      </section>

      <hr className="section-rule my-[48px]" />

      <section>
        <h2>Implementation</h2>
        <Collapsible title="Python code (click to expand)">
          <pre
            className="text-[12px] font-mono overflow-x-auto p-[12px] rounded-[8px]"
            style={{ background: "#f5f7fa", color: "#3c4257" }}
          >
            {pythonCode}
          </pre>
          <p className="mt-[12px] text-[13px] italic" style={{ color: "#687385" }}>
            Full implementation with visualization in the Colab notebook above.
          </p>
        </Collapsible>
      </section>
    </article>
  );
}
