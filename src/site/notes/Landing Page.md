---
dg-publish: true
dg-home: true
permalink: /
tags:
  - website
  - gardenEntry
---

# Portfolio

<div class="card-grid">

<div class="card">
<a href="/busbar-calculator/">
<div class="card-image">
<img src="/img/cards/busbar-calculator.png" alt="Busbar Calculator">
</div>
<div class="card-content">
<h3>Busbar Calculator Notebook</h3>
<p>Tool to model busbar temperatures and efficiency</p>
<span class="card-tag">Calculator</span>
</div>
</a>
</div>

<div class="card">
<a href="/fsae-handcalc/">
<div class="card-image">
<img src="/img/cards/fsae-segment-handcalc.png" alt="Segment HandCalc">
</div>
<div class="card-content">
<h3>FSAE Segment HandCalc Helper</h3>
<p>Script validating structural design during initial phase</p>
<span class="card-tag">Calculator</span>
</div>
</a>
</div>

<div class="card">
<a href="/battery-cooling-testing/">
<div class="card-image">
<img src="/img/cards/battery-cooling.png" alt="Battery Cooling">
</div>
<div class="card-content">
<h3>Battery Cooling Testing</h3>
<p>Experimental testing to find H-coeff of battery cooling setups</p>
<span class="card-tag">Project</span>
</div>
</a>
</div>

</div>

<style>
.card-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  padding: 1rem 0;
}

@media (max-width: 900px) {
  .card-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .card-grid {
    grid-template-columns: 1fr;
  }
}

.card {
  background: var(--background-secondary, #1e1e1e);
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  border: 1px solid var(--background-modifier-border, #333);
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

.card a {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card-image {
  width: 100%;
  height: 160px;
  background: var(--background-primary-alt, #2a2a2a);
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card-content {
  padding: 1rem;
}

.card-content h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  color: var(--text-normal, #dcddde);
}

.card-content p {
  margin: 0 0 0.75rem 0;
  font-size: 0.9rem;
  color: var(--text-muted, #888);
  line-height: 1.4;
}

.card-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--interactive-accent, #7c3aed);
  color: white;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
}
</style>
