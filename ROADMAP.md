# Project Roadmap

This document outlines where the project is headed and which tasks are suitable for new contributors.

## Long-Term Objectives

- Build a collection of roughly twenty JavaScript visualizations that share a common "node" concept.
  - Each visualization should be stylistically distinctive.
  - Nodes should be able to transform or animate into multiple nodes in interesting ways.
- Provide a standard API for interacting with nodes so visualizations can easily integrate with data sources.
- Develop a simple, standardized UI for adjusting visualization parameters, importing and exporting presets, and saving settings in `localStorage`.

## New Contributor Tasks

These items are suitable for newcomers looking for somewhere to start:

- Add or refine individual visualizations that demonstrate the node concept and show a unique visual style.
- Expand styling options or animations of existing visualizers.
- Keep the `README.md` and other documentation accurate whenever changes are made.

Agents should avoid implementing items listed under **Long-Term Objectives** unless explicitly instructed to do so.

## Visualization Concept Brainstorm

### 1. Node Garden
- **Goal:** A garden of nodes that sway and interact like plants in the wind.
- **Implementation Steps:**
  1. Create a physics module that treats each node as a springy stalk anchored to a base point.
  2. Use oscillating forces or a noise field to simulate wind that moves the nodes.
  3. Provide sliders to adjust spring stiffness, wind strength and colour palette.
  4. Allow the user to add or remove nodes to shape the garden.

### 2. Fractal Forest
- **Goal:** A recursive collection of branching trees with colourful leaves.
- **Implementation Steps:**
  1. Start from a trunk node that splits into branch nodes at configurable angles.
  2. Recursively spawn smaller branches until a depth limit is reached.
  3. Use sliders for angle spread, depth, thickness decay and leaf density.
  4. Animate seasonal colour changes to keep it visually lively.

### 3. Flow Field Particles
- **Goal:** Particles that follow a dynamic vector field.
- **Implementation Steps:**
  1. Generate a grid of directional vectors using Perlin noise or a similar technique.
  2. Spawn particles that sample the local vector and move accordingly.
  3. Expose parameters for field strength, particle lifespan and colour gradients.
  4. Optionally let users draw on the field to modify the vectors in real time.

### 4. Kaleidoscope Worlds
- **Goal:** Symmetric patterns that evolve from a central node.
- **Implementation Steps:**
  1. Duplicate nodes in radial symmetry around a centre point.
  2. Animate scale and rotation for each segment to produce a hypnotic effect.
  3. Provide controls for segment count, colour set and animation speed.
  4. Allow snapshots to be saved and reloaded as presets.

### 5. Orbital Playground
- **Goal:** Visualize planetary orbits with gravitational interactions.
- **Implementation Steps:**
  1. Treat each node as a body with mass, velocity and orbit radius.
  2. Use a simplified gravity model to update positions over time.
  3. Let users tweak mass, orbital eccentricity and trail appearance.
  4. Include random system generation for quick experiments.

### 6. Cellular Automata Grid
- **Goal:** A classic grid of cells that evolve under custom rules.
- **Implementation Steps:**
  1. Render a grid where each cell is a node with a binary or multi-state value.
  2. Allow rule definition through dropdowns or a rule code text box.
  3. Add controls for grid size, update speed and colour mapping.
  4. Provide preset rules like Conway's Game of Life or custom variations.

### 7. Sonic Nodes
- **Goal:** Nodes that react to audio input, forming shapes that dance with music.
- **Implementation Steps:**
  1. Capture audio frequencies via the Web Audio API and map them to node properties.
  2. Create visual elements that pulse, rotate or move based on sound intensity.
  3. Offer sliders for sensitivity, colour themes and geometry type.
  4. Support microphone input or loading a music file for playback.

### 8. Firework Fiesta
- **Goal:** Burst animations that mimic fireworks exploding in the sky.
- **Implementation Steps:**
  1. Launch projectiles that explode into a configurable number of spark nodes.
  2. Apply gravity and fade-out effects to each spark.
  3. Expose parameters for launch rate, explosion size and spark trails.
  4. Add the option to choreograph bursts according to a timeline or soundtrack.

### 9. Data Stream Network
- **Goal:** Visualize data flow between nodes in a network.
- **Implementation Steps:**
  1. Represent each node as a point connected by edges that carry "packets".
  2. Simulate packet movement along edges with adjustable speed and colour.
  3. Provide UI to add or remove nodes and edges interactively.
  4. Allow importing simple JSON descriptions of networks to drive the layout.

### 10. Magnetic Ink
- **Goal:** Lines of virtual ink that move like iron filings near magnets.
- **Implementation Steps:**
  1. Implement magnet nodes that exert attractive or repulsive forces.
  2. Draw particles that align along the resulting field lines.
  3. Tune magnet strength, number of particles and line width through settings.
  4. Let users drag magnets around to shape mesmerizing patterns.
