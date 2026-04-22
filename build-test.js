// Simple build test script
console.log('Testing build configuration...');
console.log('Node version:', process.version);
console.log('Environment:', process.env.NODE_ENV);

// Check if critical files exist
const fs = require('fs');
const path = require('path');

const criticalFiles = [
  'src/App.tsx',
  'src/main.tsx',
  'src/simba_products.json',
  'index.html',
  'vite.config.ts',
  'tsconfig.json'
];

console.log('\nChecking critical files:');
criticalFiles.forEach(file => {
  const exists = fs.existsSync(path.join(__dirname, file));
  console.log(`${exists ? '✓' : '✗'} ${file}`);
});

console.log('\nBuild test complete.');
