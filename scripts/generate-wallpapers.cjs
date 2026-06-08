// Generates self-contained portrait (mobile) SVG wallpapers. 1080x2340 (~19.5:9).
// Replace these with your real AI-generated phone wallpapers later.
const fs = require("fs");
const path = require("path");
const OUT = path.join(__dirname, "..", "public", "wallpapers");
fs.rmSync(OUT, { recursive: true, force: true });
fs.mkdirSync(OUT, { recursive: true });

const W = 1080, H = 2340;
const specs = [
  { id: "aurora-drift", colors: ["#0b1e3b", "#1b6ca8", "#39b6a8", "#a8e6c9"], style: "mesh" },
  { id: "ember-dusk", colors: ["#1a0a0f", "#5e1733", "#c8443f", "#f0a35e"], style: "mesh" },
  { id: "violet-haze", colors: ["#120726", "#3b1f78", "#7b4bd6", "#d9a7ff"], style: "rings" },
  { id: "moss-stone", colors: ["#0e1410", "#26402a", "#5c7b52", "#b9c79a"], style: "mesh" },
  { id: "solar-flare", colors: ["#1a0d00", "#7a3b00", "#e07a1f", "#ffd56b"], style: "rings" },
  { id: "tidal-glass", colors: ["#02161c", "#0a4d57", "#1f9aa6", "#9be3df"], style: "mesh" },
  { id: "noir-fold", colors: ["#050505", "#1a1a1d", "#33343a", "#6b6d78"], style: "folds" },
  { id: "rose-quartz", colors: ["#1c0a14", "#6e1f4a", "#d86b8f", "#ffd4cf"], style: "mesh" },
  { id: "neon-grid", colors: ["#060814", "#0d1b4c", "#2d6bff", "#54f0ff"], style: "grid" },
  { id: "sand-mirage", colors: ["#1a1206", "#5e4422", "#bb8a44", "#f2dca0"], style: "mesh" },
  { id: "deep-current", colors: ["#02060f", "#0a1f4d", "#1450a8", "#5fa8e0"], style: "folds" },
  { id: "lichen-pulse", colors: ["#0a1206", "#234d1f", "#5fb03d", "#c7f08a"], style: "rings" },
];

function meshBg(c) {
  return `<defs>
    <radialGradient id="g1" cx="28%" cy="22%" r="75%">
      <stop offset="0%" stop-color="${c[3]}" stop-opacity="0.95"/>
      <stop offset="45%" stop-color="${c[2]}" stop-opacity="0.5"/>
      <stop offset="100%" stop-color="${c[0]}" stop-opacity="0"/></radialGradient>
    <radialGradient id="g2" cx="78%" cy="82%" r="80%">
      <stop offset="0%" stop-color="${c[1]}" stop-opacity="0.9"/>
      <stop offset="60%" stop-color="${c[0]}" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="${c[0]}" stop-opacity="0"/></radialGradient>
    <linearGradient id="base" x1="0" y1="0" x2="0.6" y2="1">
      <stop offset="0%" stop-color="${c[0]}"/><stop offset="100%" stop-color="${c[1]}"/></linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#base)"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>`;
}
function rings(c){let r=meshBg(c);const cx=W/2,cy=H*0.42;for(let i=0;i<11;i++){const op=(0.05+i*0.01).toFixed(3);r+=`<circle cx="${cx}" cy="${cy}" r="${110+i*120}" fill="none" stroke="${c[3]}" stroke-opacity="${op}" stroke-width="2"/>`;}return r;}
function folds(c){let r=meshBg(c);for(let i=0;i<9;i++){const y=200+i*250;const op=(0.05+(i%3)*0.03).toFixed(3);r+=`<path d="M0 ${y} C 300 ${y-120}, 800 ${y+140}, ${W} ${y-50} L${W} ${H} L0 ${H} Z" fill="${c[2]}" fill-opacity="${op}"/>`;}return r;}
function grid(c){let r=meshBg(c);for(let x=0;x<=W;x+=72)r+=`<line x1="${x}" y1="0" x2="${x}" y2="${H}" stroke="${c[3]}" stroke-opacity="0.06" stroke-width="1"/>`;for(let y=0;y<=H;y+=72)r+=`<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${c[3]}" stroke-opacity="0.06" stroke-width="1"/>`;r+=`<circle cx="${W/2}" cy="${H*0.4}" r="300" fill="${c[2]}" fill-opacity="0.18"/>`;return r;}

const grain=`<filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/><feColorMatrix type="saturate" values="0"/></filter><rect width="${W}" height="${H}" filter="url(#n)" opacity="0.04"/>`;

for (const s of specs) {
  let body = s.style==="rings"?rings(s.colors):s.style==="folds"?folds(s.colors):s.style==="grid"?grid(s.colors):meshBg(s.colors);
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">${body}${grain}</svg>`;
  fs.writeFileSync(path.join(OUT, `${s.id}.svg`), svg);
}
console.log("done:", specs.length, "portrait wallpapers", W+"x"+H);
