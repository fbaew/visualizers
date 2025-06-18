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
shape, offsets, scaling, colour, blur amount, parallax strength and animation
speed in real time. Shapes are filled with translucent colours (about 30% opacity) that blend together with a soft glow while previous frames fade slowly for a trailing effect. You can add or remove layers on the fly, save the current configuration
as JSON to local storage or the provided textarea and load it later, choose from
several presets or randomize all layer settings with a single click.

## Triangles Visualizer

Open `triangles/index.html` to see bouncing triangles that can link up
into six-sided polygons when three edges gather within a chosen radius.
A travelling pulse races around a forming polygon before the source
triangles vanish. Finished polygons keep floating and can be clicked to
explode back into triangles. Use **Toggle Settings** to adjust triangle
count, snap distance and pulse radius.
