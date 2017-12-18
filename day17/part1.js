const input = 382;
// const input = 3;

const buffer = [0];
let currentPosition = 0;

for (let i = 1; i <= 2017; i++) {
  currentPosition = (currentPosition + input) % (buffer.length);
  currentPosition = (currentPosition + 1) % (buffer.length + 1);
  buffer.splice(currentPosition, 0, i);
  // console.log(buffer);
}

currentPosition = (currentPosition + 1) % buffer.length;
console.log(buffer[currentPosition]);
