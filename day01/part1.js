const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');
const digits = lines[0];

let sum = 0;
for (let i = 0; i < digits.length; i++) {
  const digit = digits[i];
  const nextDigit = digits[(i + 1) % digits.length];
  if (digit === nextDigit) {
    const digitNum = parseInt(digit, 10);
    sum += digitNum;
  }
}

console.log(sum);
