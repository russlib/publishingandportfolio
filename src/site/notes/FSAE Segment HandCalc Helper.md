---
dg-publish: true
permalink: /fsae-handcalc/
tags:
  - calculator
  - FSAE
  - published
dg-note-icon: none
dg-metatags:
  og:image: /img/cards/fsae-segment-handcalc.png
---

# Battery Module Structural Analysis

[![Open In Colab](https://colab.research.google.com/assets/colab-badge.svg)](https://colab.research.google.com/github/russlib/SegmentHandCalcs/blob/main/FSAESegmentHandCalcs.ipynb)

*Click "Open in Colab" to experiment with different parameters*

![Segment Casing](/img/user/Segment%20Casing%20Image%20From%20SES.png)

These hand calcs translated into a script allowed for quick iteration and structural optimization of our FSAE Battery Segments. The initial version was made back in 2024 (in MATLAB).

This document includes current SES calculations, SES calculations to be introduced in 2026, and calculations deemed to help verify solid mechanical design.

---

## Table of Contents
1. [Constants and Geometry](#1-constants-and-geometry)
2. [Load Cases & Bending Stress](#2-load-cases--bending-stress)
3. [Fasteners: Tension, Shear, and Bearing](#3-fasteners)
4. [Bond Strength Analysis](#4-bond-strength-analysis)
5. [Euler-Johnson Buckling Analysis](#5-euler-johnson-buckling-analysis)
6. [Passive Thermal Properties](#6-passive-thermal-properties)
7. [Summary Results Table](#7-summary-results-table)
8. [Sources Referenced](#sources-referenced)

---

## 1. Constants and Geometry

We establish the physical foundations and material properties here.

### Segment Assembly Diagram

```
             ____________________________________________________________
            /                                                           /|
           /                     POLYCARBONATE LID                     / |
          /___________________________________________________________/  |
         |                                                           |   | <--EneSegHeight
         |                                                           |   |      (105.6mm)
         |___________________________________________________________|   |
         |                                                           |  /
         |                                                           | / <--EneSegmentWidth
         |___________________________________________________________|/        (81.2mm)
           <------------------- EneSegmentDepth ------------------->
                                 (417.0mm)
```

### Cell Layout (Top View)

```
         _________________________________________________________
      | | [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ] |
      | | [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ] |
      | | [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ] |  (81.2mm)WIDTH
      | | [ o o ]   [ o o ]   [ o o ]   [ o o ]   [ o o ]           |
      | |_________________________________________________________| |
      |                                                             |
        <---------------------- DEPTH (417.0mm) ------------------->
```

### Input Parameters

| Parameter | Value | Unit |
|-----------|-------|------|
| Module Width | 20.3 | mm |
| Segment Height | 105.6 | mm |
| Module Depth | 69.5 | mm |
| Module Weight | 0.278 | kg |
| Segment Depth | 417.0 | mm |
| Segment Width | 81.2 | mm |
| Garolite Thickness | 3.175 (1/8") | mm |
| Polycarbonate Thickness | 9.525 (3/8") | mm |
| Total Modules | 23 | - |

### Material Properties

| Material | Property | Value |
|----------|----------|-------|
| **Garolite G10** | Strength | 262 MPa |
| | Modulus | 16.5 GPa |
| **Polycarbonate** | Flexural Strength | 93 MPa |
| | Modulus | 2.21 GPa |

---

## 2. Load Cases & Bending Stress

Calculated for **20g vertical** and **40g lateral** crash loads per SES requirements.

Assuming a uniformly distributed load where total force $F$ is related to the distributed load $w$ by $F = w \cdot L$:

### Maximum Bending Moment
$$ M_{max} = \frac{w L^2}{8} = \frac{F \cdot L}{8} $$

### Bending Stress
$$ \sigma = \frac{M \cdot c}{I} $$

### Maximum Deflection
$$ \delta_{max} = \frac{5 w L^4}{384 E I} = \frac{5 F \cdot L^3}{384 E I} $$

### Results - Polycarbonate Lid

| Parameter | Value |
|-----------|-------|
| Vertical Force (20g) | 1254.5 N |
| Bending Moment | 65.4 N·m |
| **Lid Safety Factor** | **1.75** |

*Verifies that our polycarbonate lid will survive a 20g vertical crash load - cells will not break the lid or fly out.*

---

## 3. Fasteners

### Tensile Stress Area

For a threaded rod subjected to pure tensile loading, strength is defined by the average of minor and pitch diameters. The **tensile-stress area** $A_t$ is:

$$ A_t = \frac{\pi}{4} \left( \frac{d_p + d_r}{2} \right)^2 $$

**For ISO metric threads (M6):**
$$ d_p = d - 0.649519p, \quad d_r = d - 1.226869p $$

Where:
- $d$ = major/outside diameter (6.0 mm)
- $p$ = thread pitch (1.0 mm)

**Axial Tensile Stress:**
$$ \sigma_t = \frac{F}{A_t} $$

> *Ref: Norton, R. L. (2020). Machine Design: An Integrated Approach. 6th ed., p. 907.*

### Fastener Results (M6 Bolts)

| Load Case | Safety Factor |
|-----------|---------------|
| Bolt Tension (20g Vertical) | **39.83** |
| Bolt Plug Shear (20g Vertical) | **23.88** |
| Bolt Shear (40g Horizontal) | **3.32** |
| Bolt Tear-out (40g Horizontal) | **2.65** |

---

## 4. Bond Strength Analysis

Given simple loading, how strong is the bonded G10? This does not account for finger joints (which add additional strength).

| Parameter | Value |
|-----------|-------|
| FR4/G10 Bond Strength | 15.2 MPa |
| 40g Horizontal Force | 2509.0 N |
| **Bond Safety Factor** | **2.80** |

---

## 5. Euler-Johnson Buckling Analysis

### Euler-Johnson Buckling Criteria

**Critical Slenderness and Radius of Gyration:**
$$ C_c = \pi \sqrt{\frac{2E}{\sigma_y}}, \quad k = \sqrt{\frac{I_{xx}}{A}} $$

**Johnson (Inelastic) Buckling if $SR < C_c$:**
$$ P_{cr} = A \left[ \sigma_y - \frac{1}{E} \left( \frac{\sigma_y \cdot SR}{2\pi} \right)^2 \right] $$

**Euler (Elastic) Buckling if $SR \ge C_c$:**
$$ P_{cr} = \frac{\pi^2 E I_{xx}}{L^2} $$

> *(Ref: Norton, Machine Design, 6th Ed., p. 231)*

### Results

| Parameter | Value |
|-----------|-------|
| Buckling Mode | Johnson (Inelastic) |
| **Buckling Safety Factor** | **120.70** |

---

## 6. Passive Thermal Properties

Calculating the heat dissipation capacity of the segment casing through conduction.

| Parameter | Value |
|-----------|-------|
| Total Surface Area | 0.156 m² |
| Garolite Conductivity | 0.288 W/m·K |
| **Passive Heat Transfer Rate** | **14.13 W/K** |

---

## 7. Summary Results Table

| Section | Load Case | Safety Factor |
|---------|-----------|---------------|
| 2.4 | Lid - 20g Vertical | 1.75 |
| 3.2 | Bolt Tension - 20g Vertical | 39.83 |
| 3.3 | Bolt Plug-out - 20g Vertical | 23.88 |
| 3.4 | Bolt Shear - 40g Horizontal | 3.32 |
| 3.5 | Bolt Tear-out - 40g Horizontal | 2.65 |
| 4.1 | Bond Strength - 40g Horizontal | 2.80 |
| 5.2 | Casing Buckling - 40g Horizontal | 120.70 |

**All safety factors > 1.0** - Structure passes SES crash load requirements.

---

## Code

> [!example]- Python Implementation (click to expand)
> ```python
> import math
> import pandas as pd
>
> # Conversion Constants
> PSI_TO_PA = 6894.76
> MM_TO_M = 1/1000
> INCH_TO_M = 25.4/1000
> G = 9.80665
>
> # 1.1 Module Dimensions
> ene_mod_width = 20.3 * MM_TO_M
> ene_seg_height = 105.6 * MM_TO_M
> ene_mod_depth = 69.5 * MM_TO_M
> module_weight = 0.278  # kg
>
> # 1.2 Segment Assembly
> ene_segment_depth = 6 * ene_mod_depth
> ene_segment_width = ene_mod_width * 4
> garolite_thickness = (1/8) * INCH_TO_M
> segment_modules_weight = module_weight * 23
>
> # 1.3 Material Properties
> garolite_strength = 38000 * PSI_TO_PA
> garolite_modulus = 2400000 * PSI_TO_PA
> poly_thickness = 3/8 * INCH_TO_M
> poly_strength = 93e6  # Pa
> poly_modulus = 2.21e9 # Pa
>
> # 2.1 Load Cases
> top_force = segment_modules_weight * 20 * G  # 20g vertical
> side_force = segment_modules_weight * 40 * G  # 40g lateral
>
> # See full implementation in Colab notebook
> ```

---

## Sources Referenced

1. [Enepaq VTC6 Module Datasheet](https://enepaq.com/wp-content/uploads/2023/09/VTC6-Sony-Murata-Li-ion-Battery-Module-With-Temperature-Sensor-Datasheet-Tesla-Battery-Sponsorship-Formula-SAE-Electric-Formula-Student-Battery-Pack.pdf) - Module dimensions and weight specifications.
2. [Laminated Plastics G-10/FR4 Data](https://laminatedplastics.com/g-10.pdf) - Material strengths, bonding data, and tear-out limits.
3. [MatWeb Polycarbonate Data](https://www.matweb.com/search/DataSheet.aspx?MatGUID=501acbb63cbc4f748faa7490884cdbca) - Mechanical properties for the module lid.
