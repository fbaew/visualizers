# Visualizers

Various self-contained visualizations built with HTML and JavaScript.

## Project Structure

- `index.html` is a simple launcher that links to each visualizer.
- Every visualizer lives in its own folder containing an `index.html` file.

## Common Features

These projects share a couple of design goals:

- Each visualizer is a single-page HTML and JavaScript application.
- A shared stylesheet gives the parameter dialogs a consistent look.
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
shape, offsets, scaling, colour, blur amount, opacity and drift parameters in
real time. Parallax is now driven by a low frequency oscillator so each layer
slowly drifts in its own direction while rotating. The visualizer now includes
circles, diamonds and stars in addition to triangles, squares and hexagons.
Each layer can specify minimum and maximum size factors for its shapes along
with a jitter amount. The backdrop of each layer can be blurred independently.
You can add or remove layers on the fly, save the current configuration as JSON
to local storage or the provided textarea and load it later, choose from
several presets or randomize all layer settings with a single click.
Shapes on the same layer now gently repel each other so they shift around
instead of overlapping when their sizes change.

## Triangles Visualizer

Open `triangles/index.html` to see bouncing triangles that can link up
into six-sided polygons when three edges gather within a chosen radius.
A travelling pulse races around a forming polygon before the source
triangles vanish. Finished polygons keep floating and can be clicked to
explode back into triangles. Use **Toggle Settings** to adjust triangle
count, snap distance and pulse radius.

## Mandelbrot Visualizer

Open `mandelbrot/index.html` to explore the Mandelbrot set. Scroll the mouse
wheel to zoom toward or away from the cursor. The settings panel lets you
adjust the maximum iteration count and shift the colour palette.

## Particles Visualizer

Open `particles/index.html` for a drifting particle system with multiple size
classes. Each class can have its own colour, gravity strength, trail amount and
specular glow. Use the settings panel to choose how many classes exist, how the
particle population is split between them and the overall particle count.

## Spirograph Visualizer

Open `spirograph/index.html` to watch spirograph curves being drawn. Sliders
control the outer and inner radii, the pen offset and the drawing speed.
