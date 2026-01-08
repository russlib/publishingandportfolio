---
{"dg-publish":true,"permalink":"/nusselt-correlation-derivation/"}
---

###### Nusselt Correlation
$$Nu = \frac{h L}{k} = C \cdot Re^m \cdot Pr^n$$
###### Reynolds and Prandtl 
$$Re = \frac{V L}{\nu}, \quad Pr = \frac{\nu \rho C_p}{k}$$
###### Plugging them in
$$\frac{h L}{k} = C \left( \frac{V L}{\nu} \right)^m \left( \frac{\nu \rho C_p}{k} \right)^n$$
###### Rearranging
$$h = \frac{k}{L} \cdot C \cdot \frac{V^m L^m}{\nu^m} \cdot \frac{\nu^n \rho^n C_p^n}{k^n}$$

###### Simplified Expression

$$h = C \cdot L^{m-1} \cdot V^m \cdot \nu^{n-m} \cdot \rho^n \cdot C_p^n \cdot k^{1-n}$$
Note how the heat transfer coefficient is related to Velocity to the
{ #m}
 power. From what I've seen m is generally about 0.6-0.7 (or lower.() With knowledge of the fan affinity laws V is proportional to P^3 . With the m coefficent of 0.7 my best guess is that doubling the cooling ability needs 16x the amount of power. (later on I actually calculate this correlation from experimental testing)
