/* visualizer.js
 A simple step-based visualizer that mirrors the Python contract:
 init(vals) and step() returning {a,b,swap,done}
 This JS file implements the algorithms directly so the demo runs in the browser.
*/
const STATE = {
  items: [],
  n: 0,
  algo: 'bubble',
  playing: false,
  interval: null,
  speed: 200 // ms
};

// Helpers to deep copy arrays
function initItems(vals){
  STATE.items = vals.slice();
  STATE.n = STATE.items.length;
  // reset algos' internal state:
  if(STATE.algo === 'bubble') bubble_init();
  if(STATE.algo === 'selection') selection_init();
  if(STATE.algo === 'insertion') insertion_init();
}

//////////////////////
// Bubble (JS mirror)
let b_i=0, b_j=0, b_swapped=false;
function bubble_init(){
  b_i=0; b_j=0; b_swapped=false;
}
function bubble_step(){
  const n = STATE.n;
  if(n === 0) return {done:true};
  if(b_i >= n-1) return {done:true};
  if(b_j < n - b_i - 1){
    const a = b_j, b = b_j+1;
    if(STATE.items[a] > STATE.items[b]){
      const tmp = STATE.items[a]; STATE.items[a]=STATE.items[b]; STATE.items[b]=tmp;
      b_swapped = true; b_j++;
      return {a,b,swap:true,done:false};
    }
    b_j++;
    return {a,b,swap:false,done:false};
  } else {
    if(!b_swapped) return {done:true};
    b_swapped=false; b_j=0; b_i++;
    return {a:0,b:0,swap:false,done:false};
  }
}

//////////////////////
// Selection
let s_i=0, s_j=1, s_min=0;
function selection_init(){
  s_i=0; s_j=1; s_min=0;
}
function selection_step(){
  const n = STATE.n;
  if(n === 0) return {done:true};
  if(s_i >= n-1) return {done:true};
  if(s_j < n){
    const a = s_min, b = s_j;
    if(STATE.items[b] < STATE.items[s_min]) s_min = b;
    s_j++;
    return {a,b,swap:false,done:false};
  } else {
    let res;
    if(s_min !== s_i){
      const tmp = STATE.items[s_i]; STATE.items[s_i] = STATE.items[s_min]; STATE.items[s_min]=tmp;
      res = {a:s_i,b:s_min,swap:true,done:false};
    } else {
      res = {a:s_i,b:s_i,swap:false,done:false};
    }
    s_i++; s_j = s_i+1; s_min = s_i;
    return res;
  }
}

//////////////////////
// Insertion
let ins_i=1, ins_j=1;
function insertion_init(){
  ins_i=1; ins_j=1;
}
function insertion_step(){
  const n = STATE.n;
  if(n === 0) return {done:true};
  if(ins_i >= n) return {done:true};
  if(ins_j > 0 && STATE.items[ins_j-1] > STATE.items[ins_j]){
    const a = ins_j-1, b = ins_j;
    const tmp = STATE.items[a]; STATE.items[a] = STATE.items[b]; STATE.items[b] = tmp;
    ins_j--;
    return {a,b,swap:true,done:false};
  } else {
    ins_i++; ins_j = ins_i;
    return {a:0,b:0,swap:false,done:false};
  }
}

//////////////////////
// UI and animation
function render(){
  const container = document.getElementById('bars');
  container.innerHTML = '';
  const maxv = Math.max(1, ...STATE.items);
  STATE.items.forEach((v, idx) => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = Math.round((v / maxv) * 240) + 'px';
    bar.textContent = v;
    container.appendChild(bar);
  });
}

function highlight(a,b,swap){
  const bars = document.querySelectorAll('.bar');
  bars.forEach(bx => bx.classList.remove('active','swap'));
  if(typeof a === 'number' && typeof b === 'number'){
    if(bars[a]) bars[a].classList.add('active');
    if(bars[b]) bars[b].classList.add('active');
    if(swap){
      if(bars[a]) bars[a].classList.add('swap');
      if(bars[b]) bars[b].classList.add('swap');
    }
  }
}

function stepOnce(){
  let res;
  if(STATE.algo === 'bubble') res = bubble_step();
  else if(STATE.algo === 'selection') res = selection_step();
  else if(STATE.algo === 'insertion') res = insertion_step();
  if(res.done){
    highlight(); // clear
    stopPlaying();
    render();
    return;
  }
  render();
  highlight(res.a, res.b, res.swap);
}

function play(){
  if(STATE.playing) return;
  STATE.playing = true;
  STATE.interval = setInterval(stepOnce, STATE.speed);
}

function stopPlaying(){
  STATE.playing = false;
  if(STATE.interval) { clearInterval(STATE.interval); STATE.interval = null; }
}

function reset(){
  stopPlaying();
  const vals = generateValues();
  initItems(vals);
  render();
  highlight();
}

function generateValues(){
  const type = document.getElementById('dataset').value;
  if(type === 'random'){
    const n = parseInt(document.getElementById('count').value) || 12;
    const maxv = parseInt(document.getElementById('maxv').value) || 100;
    const arr = [];
    for(let i=0;i<n;i++) arr.push(Math.floor(Math.random()*maxv)+1);
    return arr;
  } else if(type === 'preset'){
    return [5,3,8,1,4,7,2,6];
  }
  return [];
}

document.addEventListener('DOMContentLoaded', () => {
  // Wire controls
  document.getElementById('algorithm').addEventListener('change', e=>{
    STATE.algo = e.target.value;
    if(STATE.algo==='bubble') bubble_init();
    if(STATE.algo==='selection') selection_init();
    if(STATE.algo==='insertion') insertion_init();
  });
  document.getElementById('shuffle').addEventListener('click', reset);
  document.getElementById('step').addEventListener('click', stepOnce);
  document.getElementById('play').addEventListener('click', play);
  document.getElementById('pause').addEventListener('click', stopPlaying);
  document.getElementById('reset').addEventListener('click', reset);
  document.getElementById('speed').addEventListener('input', e=>{
    STATE.speed = parseInt(e.target.value);
    if(STATE.playing){ stopPlaying(); play(); }
  });

  // initial
  reset();
});