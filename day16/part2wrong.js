// let initial = 'abcde';
// let result  = 'baedc';
const initial = 'abcdefghijklmnop';
const result  = 'lgpkniodmjacfbeh';
//[ 10, 13, 11, 7, 14, 12, 1, 15, 5, 9, 3, 0, 8, 4, 6, 2 ]

const indexes = [];
for (let i = 0; i < result.length; i++) {
  indexes[i] = initial.indexOf(result[i]);
}
console.log(indexes);

let programs = initial.split('');

function shuffle() {
  const newProgs = [];
  for (let i = 0; i < programs.length; i++) {
    newProgs[i] = programs[indexes[i]];
  }
  programs = newProgs;
}

for (let i = 0; i < 1000000000; i++) {
  if (i % 1000000 === 0) {
    console.log(i);
  }
  shuffle();
  if (i > 999999990) {
    console.log(programs.join(''));
  }
}

console.log(programs.join(''));
