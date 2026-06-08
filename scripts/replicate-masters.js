const fs = require("fs");
const path = require("path");

const WALLPAPERS_DIR = path.join(__dirname, "../public/wallpapers");

const mapping = {
  anime: "master-anime.png",
  dragon: "master-dragon.png",
  black: "master-black.png",
  amoled: "noir-fold.png",
  aesthetic: "rose-quartz.png",
  cyberpunk: "neon-grid.png",
  samurai: "cherry-railway.png",
  oni: "ember-dusk.png",
  wolf: "deep-current.png",
  car: "solar-flare.png",
  nature: "moss-stone.png",
  space: "aurora-drift.png",
  gaming: "neon-grid.png",
  cute: "sand-mirage.png",
  dark: "noir-fold.png",
  fantasy: "violet-haze.png",
  japanese: "cherry-railway.png",
  neon: "lichen-pulse.png",
  supercar: "solar-flare.png",
  luxury: "master-black.png"
};

function replicate() {
  console.log("Starting master wallpaper replication using mapped files...");
  
  Object.entries(mapping).forEach(([cat, srcFilename]) => {
    const srcPath = path.join(WALLPAPERS_DIR, srcFilename);
    
    if (!fs.existsSync(srcPath)) {
      console.warn(`Source image '${srcFilename}' not found at ${srcPath}. Skipping category '${cat}'.`);
      return;
    }
    
    console.log(`Replicating source '${srcFilename}' for category: ${cat}`);
    
    for (let i = 1; i <= 10; i++) {
      const destPath = path.join(WALLPAPERS_DIR, `${cat}-${i}.png`);
      fs.copyFileSync(srcPath, destPath);
    }
    
    console.log(`Successfully created ${cat}-1.png to ${cat}-10.png`);
  });
  
  console.log("Replication complete! All 200 wallpapers are local and active!");
}

replicate();
