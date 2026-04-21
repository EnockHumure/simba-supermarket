import { normalizeRwandanPhone, isValidRwandanPhone, translateProductLabel } from './i18n';

/**
 * These are demonstration tests for core Simba utility logic.
 * To run these, you would typically install 'vitest' and run 'npm test'.
 */

// Test normalizeRwandanPhone
console.log('Testing normalizeRwandanPhone...');
const phone1 = '0788695675';
const norm1 = normalizeRwandanPhone(phone1);
console.assert(norm1 === '+250788695675', `Expected +250788695675, got ${norm1}`);

const phone2 = ' +250 788 695 675 ';
const norm2 = normalizeRwandanPhone(phone2);
console.assert(norm2 === '+250788695675', `Expected +250788695675, got ${norm2}`);

// Test isValidRwandanPhone
console.log('Testing isValidRwandanPhone...');
console.assert(isValidRwandanPhone('0788695675') === true, 'Should be valid');
console.assert(isValidRwandanPhone('0711111111') === false, 'Should be invalid (prefix)');
console.assert(isValidRwandanPhone('123') === false, 'Should be invalid (length)');

// Test translateProductLabel
console.log('Testing translateProductLabel...');
const productName = 'Fresh Milk and Bread';
const translatedRw = translateProductLabel(productName, 'rw');
// Expecting 'Fresh' -> 'bihiye neza' or similar if in dict, Milk -> amata, Bread -> umukate
console.log(`Translated (RW): ${translatedRw}`);
console.assert(translatedRw.includes('amata'), 'Should contain amata');
console.assert(translatedRw.includes('umukate'), 'Should contain umukate');

const translatedFr = translateProductLabel(productName, 'fr');
console.log(`Translated (FR): ${translatedFr}`);
console.assert(translatedFr.includes('lait'), 'Should contain lait');
console.assert(translatedFr.includes('pain'), 'Should contain pain');

console.log('Tests completed!');
