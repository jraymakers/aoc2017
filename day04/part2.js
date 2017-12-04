const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

function valid(words) {
  const wordMap = {};
  for (const word of words) {
    const anaWord = word.split('').sort().join('');
    if (wordMap[anaWord]) {
      return false;
    }
    wordMap[anaWord] = true;
  }
  return true;
}

let countOfValid = 0;
for (const line of lines) {
  const words = line.split(' ');
  if (valid(words)) {
    countOfValid += 1;
  }
}

console.log(countOfValid);
