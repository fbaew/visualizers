# Visualizers

Various self-contained visualizations built with HTML and JavaScript.

## Project Structure

- `index.html` is a simple launcher that links to each visualizer.
- Every visualizer lives in its own folder containing an `index.html` file.

## Common Features

These projects share a couple of design goals:

- Each visualizer is a single-page HTML and JavaScript application.
- A floating settings dialog lets users tweak parameters and can be toggled on
  and off.

### Available Visualizers

- **Layered Visualizer** – found in `layered/`.
- **Triangles Visualizer** – found in `triangles/`.
- **Mandelbrot Visualizer** – found in `mandelbrot/`.
- **Particles Visualizer** – found in `particles/`.
- **Spirograph Visualizer** – found in `spirograph/`.

## Layered Visualizer

Open `layered/index.html` in a browser to see a customizable multi-layer
visualization. Press **Toggle Settings** in the top-right corner to reveal
controls for each layer. Three layers are created by default and you can adjust
shape, offsets, scaling, colour, blur amount and animation speed in real time.
You can also add or remove layers on the fly, choose from several presets or
randomize all layer settings with a single click.

## Triangles Visualizer

Open `triangles/index.html` to see bouncing triangles that merge and
shatter based on edge proximity. Use **Toggle Settings** to reveal sliders
for the number of triangles and snap distance.
