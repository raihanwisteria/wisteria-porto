const fs = require('fs');
const path = require('path');

const dir = 'src/components';
const files = [];

function getFiles(d) {
  const items = fs.readdirSync(d);
  for (const item of items) {
    const full = path.join(d, item);
    if (fs.statSync(full).isDirectory()) getFiles(full);
    else if (full.endsWith('.jsx')) files.push(full);
  }
}
getFiles(dir);
files.push('src/App.jsx');

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  
  // 1. Remove all dark: prefix classes
  content = content.replace(/dark:[^\s\"\'\`]+/g, '');
  
  // 2. Map -light colors to base colors
  content = content.replace(/bg-glass-light\/[0-9]+/g, 'bg-glass');
  content = content.replace(/bg-glass-dark\/[0-9]+/g, 'bg-glass');
  content = content.replace(/border-glass-border-light/g, 'border-glass-border');
  content = content.replace(/border-glass-border-dark/g, 'border-glass-border');
  content = content.replace(/bg-cream-dark/g, 'bg-elevated');
  content = content.replace(/bg-cream/g, 'bg-card');
  
  // 3. Fix multiple spaces inside className strings
  content = content.replace(/className=\"([^\"]+)\"/g, (match, p1) => {
    return 'className=\"' + p1.replace(/\s+/g, ' ').trim() + '\"';
  });
  
  fs.writeFileSync(file, content);
}
console.log('Cleanup done');
