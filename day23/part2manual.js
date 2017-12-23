// h = 0
// b = 105700
// c = 122700
// E: f = 1
// d = 2
// D: e = 2
// A: if d * e == b then f = 0
// e++
// if e == b then A else B
// A: d++
// if d == b then C else D
// C: if f == 0 then h++
// if b == c then end
// b -= 17
// goto E

let h = 0;
let b = 105700;
let c = 122700;
while (true) {
  let f = 1;
  let d = 2;
  while (d != b) {
    if (b % d == 0) {
      console.log(`b = ${b}, d = ${d}`);
      f = 0;
      break;
    }
    // let e = 2;
    // while (e != b) {
    //   if (d * e == b) {
    //     f = 0;
    //     break;
    //   }
    //   e++;
    // }
    d++;
    // console.log(`d = ${d}`);
  }
  if (f == 0) {
    h++;
  }
  if (b == c) {
    break;
  }
  b += 17;
  console.log(`b = ${b}, h = ${h}`);
}
console.log(h);