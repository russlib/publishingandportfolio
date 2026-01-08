---
{"dg-publish":true,"permalink":"/fsae/battery/cooling-tests/battery-cooling-testing/","tags":["BCTFSAE"]}
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
- <iframe src="/img/user/HeatTransferSimulinkFunction.pdf" width="100%" height="900px" title="HeatTransferSimulinkFunction.pdf" style="border:1px solid #ccc;"></iframe>
	- Simple forced convection array cooling
		- Helped me understand some of the fundamentals of heat transfer. I wasn't sure how this would transfer over to the very convuluted airflow path of the ENEPAQ bricks though.
- [[dynamicSimilarity.pdf]]
	- Wanted to see if I could save a couple weeks by using imperial stock rather than 1:1 size metric stock(from china)
		- I was planning on creating "mock enepaq bricks" using 3D printing/lasercutting and round aluminum cylinders. I wanted to see if I could save a couple weeks by using imperial stock slightly bigger than 18mm round cells. I learned for my experimental model to be accurate it had to be dynamically similar and I wanted to see how I would expect my results to change. 

*Matlab's export mlx as pdf didn't end up very neat, but I wanted to represent what I was doing at the time in some way. My code back then honestly wasn't that good*

*Referenced Textbook: Fundamentals of Heat and Mass Transfer, 8th Edition BY Theodore L. Bergman*




#### **Designing**


#### **Testing**



#### **Creating Takeaways**





