const input = 382;
// const input = 3;

const zeroItem = { value: 0 };
let buffer = zeroItem;
buffer.next = buffer;
let bufferLength = 1;

for (let i = 1; i <= 50000000; i++) {
  if (i % 10000 === 0) console.log(i);
  let steps = input % bufferLength;
  while (steps > 0) {
    buffer = buffer.next;
    steps--;
  }
  const next = buffer.next;
  buffer.next = { value: i, next: next };
  buffer = buffer.next;
  bufferLength++;
}

console.log(zeroItem.next.value);
