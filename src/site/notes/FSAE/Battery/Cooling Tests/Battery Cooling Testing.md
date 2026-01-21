---
{"dg-publish":true,"permalink":"/portfolio-items-published/src/site/notes/fsae/battery/cooling-tests/battery-cooling-testing/","tags":["BCTFSAE"]}
---


#documentation #PortfolioProject #MainHead


#### Goal: 
De-risk overheating during endurance by quantifying realistic cooling expectations for possible fan choices.

#### What did this project do?
Experimentally test to find h-coefficient of possible battery cooling setups. 




## **Understanding**
###### CFD vs Experimentation
This project originally started because I set out to create realistic cooling estimates for our battery. I had a brief stint of trying to set up thermal CFD but quickly realized that I was neither confident in heat transfer fundamentals(started this in 2024), nor understood CFD solvers. I ended up asking the FSAE discord and Ethan Perrin(Tesla Battery Engineer) pointed me toward irl physical testing being much more likely to give valid results much faster. 

![Pasted image 20260108082347.png](/img/user/Pasted%20image%2020260108082347.png)
![Pasted image 20260108082634.png](/img/user/Pasted%20image%2020260108082634.png)
*put on the path of getting a valid result and not just a result*

###### Heat Transfer First Principles and MATLAB Files
The start of this project was in the semester before I had taken my university's heat transfer course. Before I designed any test setups or plans I worked on a couple thermal models in MATLAB. 

Here's some of the files order of what I remember creating. The pdfs previews of the live scripts aren't that good, but it was some form of leaving documentation of my process. 

Follow this link to see the embedded PDFS: [[Heat Transfer/07_Resources/Heat Transfer First Principles and MATLAB Files Embed Link\|Heat Transfer First Principles and MATLAB Files Embed Link]]


<div class="transclusion internal-embed is-loaded"><a class="markdown-embed-link" href="/heat-transfer-first-principles-and-matlab-files-embed-link/" aria-label="Open link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></a><div class="markdown-embed">




###### Array Cooling
- Simple forced convection array cooling
- Helped me understand some of the fundamentals of heat transfer. I wasn't sure how this would transfer over to the very convoluted airflow path of the ENEPAQ bricks though.
<details><summary>📄 [[HeatTransferSimulinkFunction.pdf]] (Click to preview)</summary><iframe src="/img/user/HeatTransferSimulinkFunction.pdf" width="100%" height="900px" title="HeatTransferSimulinkFunction.pdf" style="border:1px solid #ccc;"></iframe></details>

###### Dynamic Similarity
- I was planning on creating "mock enepaq bricks" using 3D printing/lasercutting and round aluminum cylinders. I wanted to see if I could save a couple weeks by using imperial stock slightly bigger than 18mm round cells. I learned for my experimental model to be accurate it had to be dynamically similar and I wanted to see how I would expect my results to change.
<details><summary>📄 [[dynamicSimilarity.pdf]] (Click to preview)</summary><iframe src="/img/user/dynamicSimilarity.pdf" width="100%" height="900px" title="dynamicSimilarity.pdf" style="border:1px solid #ccc;"></iframe></details>
- Wanted to see if I could save a couple weeks by using imperial stock rather than 1:1 size metric stock(from china)

###### Simple 1R Cell Model for heat estimates
- Wanted to understand the timescales of heating and how reactive I to expect the system to be. 
<details><summary>📄 [[FPThermals.pdf]] (Click to preview)</summary><iframe src="/img/user/FPThermals.pdf" width="100%" height="900px" title="FPThermals.pdf" style="border:1px solid #ccc;"></iframe></details>


###### Nusselt Correlation
<details><summary>📄 [[NusseltCorr.pdf]] (Click to preview)</summary><iframe src="/img/user/NusseltCorr.pdf" width="100%" height="900px" title="NusseltCorr.pdf" style="border:1px solid #ccc;"></iframe></details>


<div class="transclusion internal-embed is-loaded"><a class="markdown-embed-link" href="/nusselt-correlation-derivation/" aria-label="Open link"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="svg-icon lucide-link"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg></a><div class="markdown-embed">




###### Nusselt Correlation
$Nu = \frac{h L}{k} = C \cdot Re^m \cdot Pr^n$
###### Reynolds and Prandtl 
$Re = \frac{V L}{\nu}, \quad Pr = \frac{\nu \rho C_p}{k}$
###### Plugging them in
$\frac{h L}{k} = C \left( \frac{V L}{\nu} \right)^m \left( \frac{\nu \rho C_p}{k} \right)^n$
###### Rearranging
$h = \frac{k}{L} \cdot C \cdot \frac{V^m L^m}{\nu^m} \cdot \frac{\nu^n \rho^n C_p^n}{k^n}$

###### Simplified Expression

$h = C \cdot L^{m-1} \cdot V^m \cdot \nu^{n-m} \cdot \rho^n \cdot C_p^n \cdot k^{1-n}$
Note how the heat transfer coefficient is related to Velocity to the
{ #m}
 power. From what I've seen m is generally about 0.6-0.7 (or lower.() With knowledge of the fan affinity laws V is proportional to P^3 . With the m coefficent of 0.7 my best guess is that doubling the cooling ability needs 16x the amount of power. (later on I actually calculate this correlation from experimental testing)


</div></div>




*Matlab's export mlx as pdf didn't end up very neat, but I wanted to represent what I was doing at the time in some way. My code back then honestly wasn't that good*

*Referenced Textbook: Fundamentals of Heat and Mass Transfer, 8th Edition BY Theodore L. Bergman*







</div></div>






#### **Designing**


#### **Testing**



#### **Creating Takeaways**





