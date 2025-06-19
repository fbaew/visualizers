const fs = require('fs');
const path = require('path');

const buildDir = path.resolve(__dirname, '../build');
if (!fs.existsSync(buildDir)) fs.mkdirSync(buildDir);

let html = fs.readFileSync(path.resolve(__dirname, '../app/index.html'), 'utf8');
html = html.replace('src="./src/index.js"', 'src="./bundle.js"');
fs.writeFileSync(path.join(buildDir, 'index.html'), html);

const index = fs.readFileSync(path.resolve(__dirname, '../app/src/index.js'), 'utf8');
const layered = fs.readFileSync(path.resolve(__dirname, '../app/src/layered.js'), 'utf8');
const bundle = `(function(){\n${layered}\n${index}\n})();`;
fs.writeFileSync(path.join(buildDir, 'bundle.js'), bundle);
