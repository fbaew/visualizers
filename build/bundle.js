(function(){
export function initLayered() {
      const baseParams = {
        opacity: 0.3,
        backdropBlur: 0,
        sizeVar: 0,
        sizeMin: 1,
        sizeMax: 1,
        driftSpeed: 1,
        driftAngle: 0,
      };
      const defaultParams = [
        {
          shape: "triangle",
          scaleX: 2,
          scaleY: 2,
          offsetX: 0,
          offsetY: 0,
          color: "#ff0000",
          blur: 0,
          speed: 1,
          parallax: 0.05,
          sizeMin: 0.8,
          sizeMax: 1.2,
        },
        {
          shape: "square",
          scaleX: 2,
          scaleY: 2,
          offsetX: 0,
          offsetY: 0,
          color: "#00ff00",
          blur: 0,
          speed: 1,
          parallax: 0.1,
          sizeMin: 0.8,
          sizeMax: 1.2,
        },
        {
          shape: "hexagon",
          scaleX: 2,
          scaleY: 2,
          offsetX: 0,
          offsetY: 0,
          color: "#0000ff",
          blur: 0,
          speed: 1,
          parallax: 0.15,
          sizeMin: 0.8,
          sizeMax: 1.2,
        },
      ];
      const presets = {
        Default: defaultParams,
        Rainbow: [
          {
            shape: "triangle",
            scaleX: 1,
            scaleY: 1,
            offsetX: 0,
            offsetY: 0,
            color: "#ff0000",
            blur: 0,
            speed: 1,
            parallax: 0.05,
          },
          {
            shape: "triangle",
            scaleX: 1.5,
            scaleY: 1.5,
            offsetX: 0,
            offsetY: 0,
            color: "#00ff00",
            blur: 0,
            speed: 1.5,
            parallax: 0.1,
          },
          {
            shape: "triangle",
            scaleX: 2,
            scaleY: 2,
            offsetX: 0,
            offsetY: 0,
            color: "#0000ff",
            blur: 0,
            speed: 2,
            parallax: 0.15,
          },
        ],
        BlurrySquares: [
          {
            shape: "square",
            scaleX: 1,
            scaleY: 1,
            offsetX: 0,
            offsetY: 0,
            color: "#ff00ff",
            blur: 5,
            speed: 1,
            parallax: 0.05,
          },
          {
            shape: "square",
            scaleX: 1,
            scaleY: 1,
            offsetX: 0,
            offsetY: 0,
            color: "#00ffff",
            blur: 10,
            speed: 1,
            parallax: 0.1,
          },
          {
            shape: "square",
            scaleX: 1,
            scaleY: 1,
            offsetX: 0,
            offsetY: 0,
            color: "#ffff00",
            blur: 15,
            speed: 1,
            parallax: 0.15,
          },
        ],
      };

      const shapeList = [
        "triangle",
        "square",
        "hexagon",
        "circle",
        "diamond",
        "star",
      ];

      const layers = [];

      function getConfigJSON() {
        return JSON.stringify(layers.map((l) => l.params));
      }

      function packConfig() {
        return layers
          .map((l) => {
            const p = l.params;
            return [
              shapeList.indexOf(p.shape).toString(36),
              p.scaleX.toFixed(2),
              p.scaleY.toFixed(2),
              p.offsetX.toFixed(1),
              p.offsetY.toFixed(1),
              p.color.slice(1),
              p.blur.toFixed(1),
              p.opacity.toFixed(2),
              p.backdropBlur.toFixed(1),
              p.sizeVar.toFixed(2),
              p.sizeMin.toFixed(2),
              p.sizeMax.toFixed(2),
              p.speed.toFixed(2),
              p.parallax.toFixed(2),
              p.driftSpeed.toFixed(2),
              p.driftAngle.toFixed(2),
            ].join(",");
          })
          .join(";");
      }

      function unpackConfig(str) {
        if (!str) return [];
        return str.split(";").map((s) => {
          const v = s.split(",");
          return {
            shape: shapeList[parseInt(v[0], 36)],
            scaleX: parseFloat(v[1]),
            scaleY: parseFloat(v[2]),
            offsetX: parseFloat(v[3]),
            offsetY: parseFloat(v[4]),
            color: "#" + v[5],
            blur: parseFloat(v[6]),
            opacity: parseFloat(v[7]),
            backdropBlur: parseFloat(v[8]),
            sizeVar: parseFloat(v[9]),
            sizeMin: parseFloat(v[10]),
            sizeMax: parseFloat(v[11]),
            speed: parseFloat(v[12]),
            parallax: parseFloat(v[13]),
            driftSpeed: parseFloat(v[14]),
            driftAngle: parseFloat(v[15]),
          };
        });
      }

      function updateURL() {
        const url = new URL(window.location);
        url.searchParams.set("cfg", btoa(packConfig()));
        history.replaceState(null, "", url);
      }

      function applyConfig(arr) {
        arr.forEach((p, i) => {
          if (i < layers.length) {
            layers[i].params = { ...layers[i].params, ...p };
            layers[i].canvas.style.backdropFilter =
              `blur(${layers[i].params.backdropBlur}px)`;
            initShapes(layers[i]);
          } else {
            createLayer(p);
          }
        });
        while (layers.length > arr.length) removeLayer();
        createSettings();
      }

      let analyser = null,
        dataArray = null,
        audioLevel = 0,
        micEnabled = false;
      let audioBoost = 1;
      let globalScaleX = 1,
        globalScaleY = 1;

      async function toggleMic() {
        if (!micEnabled) {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({
              audio: true,
            });
            const ctx = new (window.AudioContext ||
              window.webkitAudioContext)();
            const source = ctx.createMediaStreamSource(stream);
            analyser = ctx.createAnalyser();
            analyser.fftSize = 256;
            dataArray = new Uint8Array(analyser.frequencyBinCount);
            source.connect(analyser);
            micEnabled = true;
            document.getElementById("micToggle").textContent = "Disable Mic";
          } catch (e) {
            alert("Microphone access denied");
          }
        } else {
          micEnabled = false;
          analyser = null;
          dataArray = null;
          document.getElementById("micToggle").textContent = "Enable Mic";
        }
      }

      function randomSize(params) {
        const range = params.sizeMax - params.sizeMin;
        let size = params.sizeMin + Math.random() * range;
        return size * (1 + (Math.random() * 2 - 1) * params.sizeVar);
      }

      function initShapes(layer) {
        const shapes = [];
        const step = 40;
        const w = layer.canvas.width;
        const h = layer.canvas.height;
        const sx = layer.params.scaleX * globalScaleX;
        const sy = layer.params.scaleY * globalScaleY;
        for (let x = -w; x < w; x += step * sx) {
          for (let y = -h; y < h; y += step * sy) {
            shapes.push({
              baseX: x,
              baseY: y,
              x: x,
              y: y,
              vx: 0,
              vy: 0,
              size: randomSize(layer.params),
              twinkleTime: 0,
            });
          }
        }
        layer.shapes = shapes;
      }

      function refreshSizes(layer) {
        layer.shapes.forEach((s) => {
          s.size = randomSize(layer.params);
        });
      }

      function createLayer(params) {
        const index = layers.length;
        const c = document.createElement("canvas");
        c.width = window.innerWidth;
        c.height = window.innerHeight;
        c.className = "layer";
        c.style.zIndex = index;
        document.body.appendChild(c);
        const fullParams = { ...baseParams, ...params };
        c.style.backdropFilter = `blur(${fullParams.backdropBlur}px)`;
        const layer = {
          canvas: c,
          ctx: c.getContext("2d"),
          params: fullParams,
          shapes: [],
        };
        layers.push(layer);
        initShapes(layer);
      }

      const urlCfg = new URLSearchParams(window.location.search).get("cfg");
      if (urlCfg) {
        try {
          const arr = unpackConfig(atob(urlCfg));
          applyConfig(arr);
        } catch (e) {
          for (let i = 0; i < 3; i++) createLayer(defaultParams[i]);
        }
      } else {
        for (let i = 0; i < 3; i++) createLayer(defaultParams[i]);
      }
      window.addEventListener("resize", () => {
        layers.forEach((l) => {
          l.canvas.width = window.innerWidth;
          l.canvas.height = window.innerHeight;
          initShapes(l);
        });
      });

      function removeLayer() {
        if (layers.length === 0) return;
        const l = layers.pop();
        l.canvas.remove();
      }

      function randomizeLayer(l) {
        l.params.shape =
          shapeList[Math.floor(Math.random() * shapeList.length)];
        l.params.scaleX = Math.random() * 2 + 1;
        l.params.scaleY = Math.random() * 2 + 1;
        l.params.offsetX = (Math.random() - 0.5) * 200;
        l.params.offsetY = (Math.random() - 0.5) * 200;
        l.params.color = `hsl(${Math.floor(Math.random() * 360)},100%,50%)`;
        l.params.blur = Math.floor(Math.random() * 10);
        l.params.speed = Math.random() * 2 + 0.5;
        l.params.parallax = Math.random() * 0.2;
        l.params.opacity = Math.random() * 0.5 + 0.1;
        l.params.backdropBlur = Math.floor(Math.random() * 10);
        l.params.sizeVar = Math.random() * 0.5;
        l.params.sizeMin = Math.random() * 0.8 + 0.4; // 0.4 - 1.2
        l.params.sizeMax = l.params.sizeMin + Math.random() * 1.0; // ensure max >= min
        l.params.driftSpeed = Math.random() * 1 + 0.5;
        l.params.driftAngle = Math.random() * Math.PI * 2;
        l.canvas.style.backdropFilter = `blur(${l.params.backdropBlur}px)`;
        initShapes(l);
      }

      function randomizeAll() {
        layers.forEach(randomizeLayer);
        createSettings();
      }

      function modulateParams(params, intensity) {
        if (intensity <= 0) return params;
        const out = {};
        Object.keys(params).forEach((k) => {
          const v = params[k];
          out[k] =
            typeof v === "number"
              ? v * (1 + (Math.random() * 2 - 1) * intensity)
              : v;
        });
        return out;
      }

      function applyPreset(name) {
        const preset = presets[name];
        if (!preset) return;
        layers.forEach((l, i) => {
          const p = preset[i % preset.length];
          l.params = { ...baseParams, ...p };
          l.canvas.style.backdropFilter = `blur(${l.params.backdropBlur}px)`;
          initShapes(l);
        });
        createSettings();
      }

      function addLayer() {
        const params = defaultParams[layers.length % defaultParams.length];
        createLayer(params);
        createSettings();
      }
      function drawShape(ctx, shape, size) {
        ctx.beginPath();
        if (shape === "square") {
          ctx.rect(-size / 2, -size / 2, size, size);
        } else if (shape === "triangle") {
          ctx.moveTo(0, -size / 2);
          ctx.lineTo(size / 2, size / 2);
          ctx.lineTo(-size / 2, size / 2);
          ctx.closePath();
        } else if (shape === "hexagon") {
          for (let i = 0; i < 6; i++) {
            const a = ((Math.PI * 2) / 6) * i;
            const x = (Math.cos(a) * size) / 2;
            const y = (Math.sin(a) * size) / 2;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
        } else if (shape === "circle") {
          ctx.arc(0, 0, size / 2, 0, Math.PI * 2);
        } else if (shape === "diamond") {
          ctx.moveTo(0, -size / 2);
          ctx.lineTo(size / 2, 0);
          ctx.lineTo(0, size / 2);
          ctx.lineTo(-size / 2, 0);
          ctx.closePath();
        } else if (shape === "star") {
          const points = 5;
          for (let i = 0; i < points * 2; i++) {
            const angle = (i * Math.PI) / points;
            const r = i % 2 === 0 ? size / 2 : size / 4;
            const x = Math.cos(angle) * r;
            const y = Math.sin(angle) * r;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.closePath();
        }
        ctx.fill();
      }
      function animate(time) {
        layers.forEach((l) => {
          const { ctx, canvas, params, shapes } = l;
          ctx.globalCompositeOperation = "destination-out";
          ctx.fillStyle = "rgba(0,0,0,0.1)";
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.globalCompositeOperation = "lighter";
          ctx.save();
          const intensity = audioLevel * audioBoost;
          const mp = modulateParams(params, intensity);
          const drift = Math.sin(time * 0.0002 * mp.driftSpeed) * mp.parallax;
          ctx.translate(
            canvas.width / 2 +
              mp.offsetX +
              Math.cos(mp.driftAngle) * drift * canvas.width,
            canvas.height / 2 +
              mp.offsetY +
              Math.sin(mp.driftAngle) * drift * canvas.height,
          );
          ctx.fillStyle = mp.color;
          ctx.globalAlpha = mp.opacity;
          ctx.filter = `blur(${mp.blur}px)`;
          ctx.globalCompositeOperation = "lighter";
          if (micEnabled && analyser) {
            analyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for (let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            audioLevel = sum / dataArray.length / 255;
          } else {
            audioLevel = 0;
          }

          const step = 40;
          const rot = time * 0.0002 * mp.speed + audioLevel * 2;

          // physics step
          for (let i = 0; i < shapes.length; i++) {
            const s = shapes[i];
            s.vx *= 0.9;
            s.vy *= 0.9;
            s.vx += (s.baseX - s.x) * 0.02;
            s.vy += (s.baseY - s.y) * 0.02;
          }
          for (let i = 0; i < shapes.length; i++) {
            const a = shapes[i];
            for (let j = i + 1; j < shapes.length; j++) {
              const b = shapes[j];
              let dx = b.x - a.x;
              let dy = b.y - a.y;
              const distSq = dx * dx + dy * dy;
              const minDist = step * 0.6;
              if (distSq < minDist * minDist) {
                const dist = Math.sqrt(distSq) || 0.001;
                const force = ((minDist - dist) / minDist) * 0.05;
                dx /= dist;
                dy /= dist;
                a.vx -= dx * force;
                a.vy -= dy * force;
                b.vx += dx * force;
                b.vy += dy * force;
              }
            }
          }
          shapes.forEach((s) => {
            s.x += s.vx;
            s.y += s.vy;
          });

          const twinkleDuration = 20;
          shapes.forEach((s) => {
            if (s.twinkleTime > 0) s.twinkleTime--;
            else if (Math.random() < 0.01) s.twinkleTime = twinkleDuration;
          });

          shapes.forEach((s) => {
            ctx.save();
            ctx.translate(s.x, s.y);
            ctx.rotate(rot);
            drawShape(ctx, mp.shape, step * 0.8 * s.size * (1 + audioLevel));
            if (s.twinkleTime > 0) {
              const phase = 1 - s.twinkleTime / twinkleDuration;
              ctx.fillStyle = "white";
              ctx.globalAlpha = mp.opacity * Math.sin(phase * Math.PI);
              drawShape(ctx, mp.shape, step * 0.8 * s.size * (1 + audioLevel));
              ctx.globalAlpha = mp.opacity;
              ctx.fillStyle = mp.color;
            }
            ctx.restore();
          });
          ctx.restore();
          ctx.globalCompositeOperation = "source-over";
          ctx.globalAlpha = 1;
          ctx.filter = "none";
        });
        requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      function createSettings() {
        const container = document.getElementById("settings");
        container.innerHTML = "";
        layers.forEach((l, idx) => {
          const div = document.createElement("div");
          div.className = "layer-config";
          div.innerHTML = `<strong>Layer ${idx + 1}</strong>`;
          const fields = [
            ["shape", "select", shapeList],
            ["scaleX", "number"],
            ["scaleY", "number"],
            ["offsetX", "number"],
            ["offsetY", "number"],
            ["color", "color"],
            ["blur", "number"],
            ["opacity", "number"],
            ["backdropBlur", "number"],
            ["sizeVar", "number"],
            ["sizeMin", "number"],
            ["sizeMax", "number"],
            ["speed", "number"],
            ["parallax", "number"],
            ["driftSpeed", "number"],
            ["driftAngle", "number"],
          ];
          fields.forEach((f) => {
            const label = document.createElement("label");
            let input;
            if (f[1] === "select") {
              input = document.createElement("select");
              f[2].forEach((opt) => {
                const o = document.createElement("option");
                o.value = opt;
                o.textContent = opt;
                input.appendChild(o);
              });
              input.value = l.params.shape;
            } else {
              input = document.createElement("input");
              input.type = f[1];
              input.value = l.params[f[0]];
              if (f[1] === "number") input.step = "0.1";
            }
            input.oninput = () => {
              l.params[f[0]] =
                f[1] === "number" ? parseFloat(input.value) : input.value;
              if (f[0] === "backdropBlur")
                l.canvas.style.backdropFilter = `blur(${l.params.backdropBlur}px)`;
              if (f[0] === "scaleX" || f[0] === "scaleY") initShapes(l);
              if (
                f[0] === "sizeMin" ||
                f[0] === "sizeMax" ||
                f[0] === "sizeVar"
              )
                refreshSizes(l);
              updateURL();
            };
            label.textContent = f[0] + ": ";
            label.appendChild(input);
            div.appendChild(label);
          });
          container.appendChild(div);
        });
        const ta = document.createElement("textarea");
        ta.id = "presetText";
        ta.placeholder = "Preset JSON";
        ta.value = localStorage.getItem("layeredPreset") || "";
        container.appendChild(ta);
        updateURL();
      }
      createSettings();
      document.getElementById("toggleSettings").onclick = () => {
        const dlg = document.getElementById("settings");
        const grp = document.getElementById("controlGroup");
        const show = dlg.style.display === "none";
        dlg.style.display = show ? "block" : "none";
        grp.style.display = show ? "block" : "none";
      };
      document.getElementById("addLayer").onclick = addLayer;
      document.getElementById("removeLayer").onclick = () => {
        removeLayer();
        createSettings();
      };
      document.getElementById("randomize").onclick = randomizeAll;
      const presetSelect = document.getElementById("presetSelect");
      Object.keys(presets).forEach((name) => {
        const o = document.createElement("option");
        o.value = name;
        o.textContent = name;
        presetSelect.appendChild(o);
      });
      presetSelect.onchange = () => {
        applyPreset(presetSelect.value);
      };
      document.getElementById("savePreset").onclick = () => {
        const data = JSON.stringify(layers.map((l) => l.params));
        localStorage.setItem("layeredPreset", data);
        document.getElementById("presetText").value = data;
        updateURL();
      };
      document.getElementById("loadPreset").onclick = () => {
        let data = document.getElementById("presetText").value.trim();
        if (!data) data = localStorage.getItem("layeredPreset");
        if (!data) return;
        try {
          const arr = JSON.parse(data);
          applyConfig(arr);
        } catch (e) {
          alert("Invalid preset");
        }
      };
      document.getElementById("micToggle").onclick = toggleMic;
      document.getElementById("audioBoost").oninput = (e) => {
        audioBoost = parseFloat(e.target.value);
      };
      document.getElementById("globalScaleX").oninput = (e) => {
        globalScaleX = parseFloat(e.target.value);
        layers.forEach(initShapes);
      };
      document.getElementById("globalScaleY").oninput = (e) => {
        globalScaleY = parseFloat(e.target.value);
        layers.forEach(initShapes);
      };

      const toggleBtn = document.getElementById("toggleSettings");
      let hideTimer = null;
      function showToggle() {
        toggleBtn.style.opacity = "1";
        if (hideTimer) clearTimeout(hideTimer);
        hideTimer = setTimeout(() => {
          toggleBtn.style.opacity = "0";
        }, 2000);
      }
      document.addEventListener("mousemove", showToggle);
      showToggle();
}

import { LayeredVisualizer } from './LayeredVisualizer.js';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(LayeredVisualizer));

})();
