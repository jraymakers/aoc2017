const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');

let sum = 0;
let groupStack = [];
let context = 'group';

for (const c of data) {
  switch(context) {
    case 'group':
      if (c == '{') {
        groupStack.push(groupStack.length + 1);
      } else if (c == '}') {
        sum += groupStack.pop();
      } else if (c == '<') {
        context = 'garbage';
      }
      break;
    case 'garbage':
      if (c == '!') {
        context = 'ignore';
      } else if (c == '>') {
        context = 'group';
      }
      break;
    case 'ignore':
      context = 'garbage';
      break;
    default:
      console.log('unknown context');
  }
}

console.log(sum);
