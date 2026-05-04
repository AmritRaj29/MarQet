const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'components'),
  path.join(__dirname, 'app'),
];

const replacements = [
  // Gradients
  { from: /from-indigo-500 via-purple-500 to-pink-500/g, to: "from-emerald-400 via-teal-400 to-cyan-400" },
  { from: /from-pink-500 via-purple-500 to-cyan-500/g, to: "from-teal-400 via-cyan-400 to-emerald-400" },
  { from: /from-pink-500 via-purple-500 to-primary/g, to: "from-teal-400 via-cyan-400 to-primary" },
  { from: /from-pink-500 to-purple-600/g, to: "from-teal-400 to-cyan-500" },
  { from: /from-pink-500 to-purple-500/g, to: "from-teal-400 to-cyan-400" },
  { from: /from-pink-500 to-primary/g, to: "from-teal-400 to-primary" },
  { from: /from-pink-500 to-rose-500/g, to: "from-teal-400 to-emerald-400" },
  { from: /from-purple-900/g, to: "from-cyan-900" },
  { from: /from-pink-900/g, to: "from-teal-900" },
  { from: /from-indigo-900/g, to: "from-emerald-900" },

  // Text
  { from: /text-pink-500/g, to: "text-teal-400" },
  { from: /text-purple-500/g, to: "text-cyan-400" },

  // Background
  { from: /bg-pink-500/g, to: "bg-teal-400" },
  { from: /bg-purple-500/g, to: "bg-cyan-400" },

  // Border
  { from: /border-pink-500/g, to: "border-teal-400" },
  { from: /border-purple-500/g, to: "border-cyan-400" },

  // Shadow
  { from: /shadow-pink-500/g, to: "shadow-teal-400" },
  { from: /rgba\(236,72,153,/g, to: "rgba(45,212,191," }, // pink-500 RGB
  { from: /rgba\(168,85,247,/g, to: "rgba(34,211,238," }, // purple-500 RGB

  // Fill
  { from: /fill-pink-500/g, to: "fill-teal-400" },
  
  // Custom states like hover
  { from: /hover:from-pink-400 hover:to-purple-400/g, to: "hover:from-teal-300 hover:to-cyan-300" },
  { from: /hover:text-pink-400/g, to: "hover:text-teal-300" },
];

function processDirectory(directory) {
  const files = fs.readdirSync(directory);
  
  for (const file of files) {
    const fullPath = path.join(directory, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (stat.isFile() && (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts'))) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let modified = false;
      
      for (const replacement of replacements) {
        if (content.match(replacement.from)) {
          content = content.replace(replacement.from, replacement.to);
          modified = true;
        }
      }
      
      if (modified) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

dirs.forEach(dir => processDirectory(dir));
console.log("Theme replacement complete.");
