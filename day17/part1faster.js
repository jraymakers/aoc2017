const input = 382;
// const input = 3;

// const maxInsert = 10;
const maxInsert = 2017;
// const maxInsert = 50 * 1000 * 1000;

const valueAfter = [];
valueAfter.length = maxInsert + 1;
for (let i = 0; i <= maxInsert; i++) {
  valueAfter[i] = i;
}
let current = 0;

// function getValueArray(size) {
//   const values = [];
//   let v = 0;
//   while (size > 0) {
//     values.push(v);
//     v = valueAfter[v];
//     size--;
//   }
//   return values;
// }

for (let i = 1; i <= maxInsert; i++) {
  // console.log(getValueArray(i).join(','));
  // console.log(current);
  let steps = input % i;
  while (steps > 0) {
    current = valueAfter[current];
    steps--;
  }
  const nextValue = valueAfter[current];
  valueAfter[current] = i;
  valueAfter[i] = nextValue;
  current = i;
}

console.log(valueAfter[2017]);
