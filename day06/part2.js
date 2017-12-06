const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const numberStrings = data.split('\t');
const numbers = numberStrings.map((numStr) => parseInt(numStr, 10));

function maxIndex(nums) {
  let max = -Infinity;
  let maxi = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      max = nums[i]
      maxi = i;
    }
  }
  return maxi;
}

function hash(nums) {
  return nums.map((num) => num.toString(16)).join('');
}

function solve(nums) {
  let steps = 0;
  let seen = {};
  let looped = false;

  while (true) {
    const h = hash(nums);
    console.log(h);
    if (seen[h]) {
      if (looped) {
        return steps;
      } else {
        steps = 0;
        seen = {};
        looped = true;
      }
    }
    seen[h] = true;
    let index = maxIndex(nums);
    let count = nums[index];
    nums[index] = 0;
    while (count > 0) {
      index = (index + 1) % nums.length;
      nums[index] += 1;
      count -= 1;
    }
    steps += 1;
  }
}

console.log(solve(numbers));
