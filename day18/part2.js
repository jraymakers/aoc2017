const fs = require('fs');

const data = fs.readFileSync(process.argv[2], 'utf8');
const lines = data.split('\n');

const instructions = [];
for (const line of lines) {
  const parts = line.split(' ');
  instructions.push({
    fn: parts[0],
    x: parts[1],
    y: parts[2],
  });
}

class Program {

  constructor(id, local, remote) {
    this.id = id;
    this.local = local;
    this.remote = remote;
    this.regs = { p: id };
    this.pc = 0;
    this.waiting = false;
    this.done = false;
    this.sndCount = 0;
  }

  setReg(r,v) {
    this.regs[r] = v;
  }

  value(x) {
    if (/[a-z]/i.test(x)) {
      return this.regs[x] || 0;
    } else {
      return parseInt(x, 10);
    }
  }

  snd(x) {
    // console.log(`[${this.id}] snd ${x}`);
    this.remote.push(this.value(x));
    this.sndCount++;
    this.pc++;
  }

  set(x,y) {
    // console.log(`[${this.id}] set ${x} ${y}`);
    this.setReg(x, this.value(y));
    this.pc++;
  }

  add(x,y) {
    this.setReg(x, this.value(x) + this.value(y));
    this.pc++;
  }

  mul(x,y) {
    this.setReg(x, this.value(x) * this.value(y));
    this.pc++;
  }

  mod(x,y) {
    this.setReg(x, this.value(x) % this.value(y));
    this.pc++;
  }

  rcv(x) {
    if (this.local.length > 0) {
      // console.log(`[${this.id}] rcv ${x}`);
      this.setReg(x, this.local.shift());
      this.waiting = false;
      this.pc++;
    } else {
      this.waiting = true;
    }
  }

  jgz(x,y) {
    if (this.value(x) > 0) {
      this.pc += this.value(y);
    } else {
      this.pc++;
    }
  }

  step() {
    if (this.done) return;

    const instruction = instructions[this.pc];
    const fn = this[instruction.fn];
    // console.log(`[${this.id}] instruction ${instruction.fn}`);
    fn.call(this, instruction.x, instruction.y);

    if (this.pc < 0 || this.pc >= instructions.length) {
      this.done = true;
    }
  }

  running() {
    return !this.done && !this.waiting;
  }

}

const q0 = [];
const q1 = [];

const p0 = new Program(0, q0, q1);
const p1 = new Program(1, q1, q0);

while (p0.running() || p1.running()) {
  p0.step();
  p1.step();
}
console.log(p0);
console.log(p1);

console.log(p1.sndCount);
