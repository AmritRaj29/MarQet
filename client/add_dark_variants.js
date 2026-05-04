const fs = require('fs');
const path = require('path');

const dirs = [
  path.join(__dirname, 'components'),
  path.join(__dirname, 'app'),
];

// Note: Order matters. More specific replacements should come first.
const replacements = [
  { from: /\bbg-gray-50\b/g, to: "bg-gray-50 dark:bg-zinc-950" },
  { from: /\bbg-white\/80\b/g, to: "bg-white/80 dark:bg-zinc-800/80" },
  { from: /\bbg-white\b(?!(\/| dark:))/g, to: "bg-white dark:bg-zinc-900" },
  { from: /\bbg-gray-100\b/g, to: "bg-gray-100 dark:bg-zinc-800" },
  
  { from: /\btext-zinc-800\b/g, to: "text-zinc-800 dark:text-white/90" },
  { from: /\btext-zinc-700\b/g, to: "text-zinc-700 dark:text-white/70" },
  { from: /\btext-zinc-600\b/g, to: "text-zinc-600 dark:text-white/60" },
  { from: /\btext-zinc-500\b/g, to: "text-zinc-500 dark:text-white/50" },
  { from: /\btext-zinc-400\b/g, to: "text-zinc-400 dark:text-white/40" },
  { from: /\btext-zinc-300\b/g, to: "text-zinc-300 dark:text-white/20" },
  { from: /\btext-zinc-900\b/g, to: "text-zinc-900 dark:text-white" },

  { from: /\bborder-zinc-400\b/g, to: "border-zinc-400 dark:border-white/50" },
  { from: /\bborder-zinc-300\b/g, to: "border-zinc-300 dark:border-white/20" },
  { from: /\bborder-zinc-200\b/g, to: "border-zinc-200 dark:border-white/10" },
  { from: /\bborder-zinc-100\b/g, to: "border-zinc-100 dark:border-white/5" },

  { from: /\bhover:bg-gray-100\b/g, to: "hover:bg-gray-100 dark:hover:bg-zinc-900" },
  { from: /\bhover:bg-gray-200\b/g, to: "hover:bg-gray-200 dark:hover:bg-zinc-800" },
  { from: /\bhover:bg-gray-300\b/g, to: "hover:bg-gray-300 dark:hover:bg-zinc-700" },
  { from: /\bhover:border-zinc-400\b/g, to: "hover:border-zinc-400 dark:hover:border-white/50" },

  { from: /\bfrom-gray-50\b/g, to: "from-gray-50 dark:from-zinc-950" },
  { from: /\bvia-gray-50\b/g, to: "via-gray-50 dark:via-zinc-950" },
  { from: /\bto-gray-50\b/g, to: "to-gray-50 dark:to-zinc-950" },
  { from: /\bfrom-white\b(?!(\/| dark:))/g, to: "from-white dark:from-zinc-900" },
  { from: /\bvia-white\b(?!(\/| dark:))/g, to: "via-white dark:via-zinc-900" },
  { from: /\bto-white\b(?!(\/| dark:))/g, to: "to-white dark:to-zinc-900" },
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
      
      // Don't modify the add_dark_variants script itself or next-themes wrapper
      if (file.includes('add_dark_variants') || file === 'ThemeProvider.tsx') continue;

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
console.log("Dark variants added successfully.");
