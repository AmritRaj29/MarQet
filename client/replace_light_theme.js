const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'components'),
  path.join(__dirname, 'app'),
];

const replacements = [
  // Backgrounds
  { from: /\bbg-zinc-950\b/g, to: "bg-gray-50" },
  { from: /\bbg-zinc-900\b/g, to: "bg-white" },
  { from: /\bbg-zinc-800\/80\b/g, to: "bg-white/80" },
  { from: /\bbg-zinc-800\b/g, to: "bg-gray-100" },
  { from: /\bbg-black\b/g, to: "bg-white" },

  // Text
  { from: /\btext-white\/90\b/g, to: "text-zinc-800" },
  { from: /\btext-white\/80\b/g, to: "text-zinc-800" },
  { from: /\btext-white\/70\b/g, to: "text-zinc-700" },
  { from: /\btext-white\/60\b/g, to: "text-zinc-600" },
  { from: /\btext-white\/50\b/g, to: "text-zinc-500" },
  { from: /\btext-white\/40\b/g, to: "text-zinc-400" },
  { from: /\btext-white\/30\b/g, to: "text-zinc-400" },
  { from: /\btext-white\/20\b/g, to: "text-zinc-300" },
  { from: /\btext-white\b/g, to: "text-zinc-900" },
  
  // Borders
  { from: /\bborder-white\/50\b/g, to: "border-zinc-400" },
  { from: /\bborder-white\/30\b/g, to: "border-zinc-300" },
  { from: /\bborder-white\/20\b/g, to: "border-zinc-300" },
  { from: /\bborder-white\/10\b/g, to: "border-zinc-200" },
  { from: /\bborder-white\/5\b/g, to: "border-zinc-200" },

  // Hover States Background
  { from: /\bhover:bg-zinc-900\b/g, to: "hover:bg-gray-100" },
  { from: /\bhover:bg-zinc-800\b/g, to: "hover:bg-gray-200" },
  { from: /\bhover:bg-zinc-700\b/g, to: "hover:bg-gray-300" },

  // Semi-transparent backgrounds
  { from: /\bbg-white\/20\b/g, to: "bg-black/20" },
  { from: /\bbg-white\/10\b/g, to: "bg-black/10" },
  { from: /\bbg-white\/5\b/g, to: "bg-black/5" },
  { from: /\bhover:bg-white\/20\b/g, to: "hover:bg-black/20" },
  { from: /\bhover:bg-white\/10\b/g, to: "hover:bg-black/10" },
  { from: /\bhover:bg-white\/5\b/g, to: "hover:bg-black/5" },

  // Gradients
  { from: /\bfrom-zinc-950\b/g, to: "from-gray-50" },
  { from: /\bvia-zinc-950\b/g, to: "via-gray-50" },
  { from: /\bto-zinc-950\b/g, to: "to-gray-50" },
  { from: /\bfrom-zinc-900\b/g, to: "from-white" },
  { from: /\bvia-zinc-900\b/g, to: "via-white" },
  { from: /\bto-zinc-900\b/g, to: "to-white" },
  { from: /\bfrom-black\b/g, to: "from-gray-50" },
  { from: /\bto-black\b/g, to: "to-gray-50" },
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
console.log("Light theme replacement complete.");
