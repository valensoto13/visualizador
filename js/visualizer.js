/* visualizer.js
 Visualizador paso a paso de algoritmos de ordenamiento:
  - Burbuja (Bubble Sort)
  - Selección (Selection Sort)
  - Inserción (Insertion Sort)
 
 Cada algoritmo avanza “por pasos”, devolviendo:
 {a, b, swap, done}
 donde:
   a,b → índices comparados
   swap → si hubo intercambio
   done → si se terminó el algoritmo
*/

const STATE = {
  items: [],     // Arreglo actual a ordenar
  n: 0,          // Cantidad de elementos
  algo: 'bubble',// Algoritmo elegido
  playing: false,// Si se está ejecutando automáticamente
  interval: null,// Intervalo del modo automático
  speed: 200     // Velocidad en ms de cada paso
};

// Copia el arreglo inicial y reinicia estados internos
function initItems(vals){
  STATE.items = vals.slice();      // copia del arreglo
  STATE.n = STATE.items.length;    // cantidad de elementos

  // Reiniciar el estado del algoritmo elegido
  if(STATE.algo === 'bubble') bubble_init();
  if(STATE.algo === 'selection') selection_init();
  if(STATE.algo === 'insertion') insertion_init();
}

///////////////////////////////////////////
// ALGORITMO 1: ORDENAMIENTO POR BURBUJA //
///////////////////////////////////////////

// Variables internas del bubble sort
let b_i=0, b_j=0, b_swapped=false;

// Reinicia el algoritmo burbuja
function bubble_init(){
  b_i=0;         // Pasada actual
  b_j=0;         // Comparación interna dentro de la pasada
  b_swapped=false; // Si hubo intercambios
}

// Ejecuta un paso del algoritmo burbuja
function bubble_step(){
  const n = STATE.n;

  if(n === 0) return {done:true};        // caso borde
  if(b_i >= n-1) return {done:true};     // ya se ordenó

  // Comparaciones internas
  if(b_j < n - b_i - 1){
    const a = b_j, b = b_j+1;            // índices comparados
    
    // Si están desordenados → intercambia
    if(STATE.items[a] > STATE.items[b]){
      const tmp = STATE.items[a];
      STATE.items[a] = STATE.items[b];
      STATE.items[b] = tmp;

      b_swapped = true;
      b_j++;

      return {a,b,swap:true,done:false};
    }

    // No hubo intercambio
    b_j++;
    return {a,b,swap:false,done:false};

  } else {

    // Si en una pasada no hubo intercambios → ya está ordenado
    if(!b_swapped) return {done:true};

    // Reiniciar para la próxima pasada
    b_swapped=false;
    b_j=0;
    b_i++;

    return {a:0,b:0,swap:false,done:false};
  }
}

///////////////////////////////////////////////////
// ALGORITMO 2: ORDENAMIENTO POR SELECCIÓN       //
///////////////////////////////////////////////////

// Variables internas
let s_i=0, s_j=1, s_min=0;

function selection_init(){
  s_i=0; 
  s_j=1; 
  s_min=0;      // índice del mínimo encontrado
}

// Ejecuta un paso del selection sort
function selection_step(){
  const n = STATE.n;

  if(n === 0) return {done:true};
  if(s_i >= n-1) return {done:true};  // ya ordenado

  // Buscando el mínimo
  if(s_j < n){
    const a = s_min, b = s_j;

    // Si encontramos un valor menor → actualizar mínimo
    if(STATE.items[b] < STATE.items[s_min]) 
      s_min = b;

    s_j++;

    return {a,b,swap:false,done:false};
  
  } else {
    // Terminó la búsqueda, ahora intercambiar si corresponde
    let res;

    if(s_min !== s_i){
      const tmp = STATE.items[s_i];
      STATE.items[s_i] = STATE.items[s_min];
      STATE.items[s_min] = tmp;

      res = {a:s_i,b:s_min,swap:true,done:false};

    } else {
      // No hubo intercambio
      res = {a:s_i,b:s_i,swap:false,done:false};
    }

    // Avanzamos a la siguiente posición
    s_i++; 
    s_j = s_i+1; 
    s_min = s_i;

    return res;
  }
}

///////////////////////////////////////////////////
// ALGORITMO 3: ORDENAMIENTO POR INSERCIÓN       //
///////////////////////////////////////////////////

// Variables internas
let ins_i=1, ins_j=1;

// Reinicia el algoritmo
function insertion_init(){
  ins_i=1; 
  ins_j=1;
}

// Ejecuta un paso del insertion sort
function insertion_step(){
  const n = STATE.n;

  if(n === 0) return {done:true};
  if(ins_i >= n) return {done:true};

  // Comparación hacia atrás
  if(ins_j > 0 && STATE.items[ins_j-1] > STATE.items[ins_j]){
    const a = ins_j-1, b = ins_j;

    // Intercambio
    const tmp = STATE.items[a]; 
    STATE.items[a] = STATE.items[b]; 
    STATE.items[b] = tmp;

    ins_j--;

    return {a,b,swap:true,done:false};

  } else {
    // Avanzar al siguiente elemento a insertar
    ins_i++; 
    ins_j = ins_i;
    return {a:0,b:0,swap:false,done:false};
  }
}

///////////////////////////////////////////
// FUNCIÓN QUE DIBUJA LAS BARRAS EN PANTALLA
///////////////////////////////////////////
function render(){
  const container = document.getElementById('bars');
  container.innerHTML = '';
  const maxv = Math.max(1, ...STATE.items);

  // Crear una barra para cada valor
  STATE.items.forEach(v => {
    const bar = document.createElement('div');
    bar.className = 'bar';
    bar.style.height = Math.round((v / maxv) * 240) + 'px';
    bar.textContent = v;
    container.appendChild(bar);
  });
}

///////////////////////////////////////////
// Resalta los elementos que se comparan
///////////////////////////////////////////
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

///////////////////////////////////////////
// Ejecuta un solo paso del algoritmo
///////////////////////////////////////////
function stepOnce(){
  let res;

  if(STATE.algo === 'bubble') res = bubble_step();
  else if(STATE.algo === 'selection') res = selection_step();
  else if(STATE.algo === 'insertion') res = insertion_step();

  // Si ya terminó
  if(res.done){
    highlight();  // limpiar resaltado
    stopPlaying();
    render();
    return;
  }

  render();                          // dibujar con cambios
  highlight(res.a, res.b, res.swap); // resaltar comparación
}

///////////////////////////////////////////
// Reproducción automática
///////////////////////////////////////////
function play(){
  if(STATE.playing) return;
  STATE.playing = true;
  STATE.interval = setInterval(stepOnce, STATE.speed);
}

// Pausar ejecución
function stopPlaying(){
  STATE.playing = false;
  if(STATE.interval){
    clearInterval(STATE.interval);
    STATE.interval = null;
  }
}

///////////////////////////////////////////
// Reinicia todo y genera nuevo arreglo
///////////////////////////////////////////
function reset(){
  stopPlaying();
  const vals = generateValues();
  initItems(vals);
  render();
  highlight();
}

// Genera arreglo según tipo seleccionado
function generateValues(){
  const type = document.getElementById('dataset').value;

  if(type === 'random'){
    const n = parseInt(document.getElementById('count').value) || 12;
    const maxv = parseInt(document.getElementById('maxv').value) || 100;

    const arr = [];
    for(let i=0;i<n;i++) 
      arr.push(Math.floor(Math.random()*maxv)+1);

    return arr;

  } else if(type === 'preset'){
    return [5,3,8,1,4,7,2,6];
  }

  return [];
}

///////////////////////////////////////////
// Conectar botones e inicializar
///////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {

  // Cambiar algoritmo
  document.getElementById('algorithm').addEventListener('change', e=>{
    STATE.algo = e.target.value;
    if(STATE.algo==='bubble') bubble_init();
    if(STATE.algo==='selection') selection_init();
    if(STATE.algo==='insertion') insertion_init();
  });

  // Botones
  document.getElementById('shuffle').addEventListener('click', reset);
  document.getElementById('step').addEventListener('click', stepOnce);
  document.getElementById('play').addEventListener('click', play);
  document.getElementById('pause').addEventListener('click', stopPlaying);
  document.getElementById('reset').addEventListener('click', reset);

  // Control de velocidad
  document.getElementById('speed').addEventListener('input', e=>{
    STATE.speed = parseInt(e.target.value);
    if(STATE.playing){ 
      stopPlaying();
      play();
    }
  });

  // Inicializar por primera vez
  reset();
});

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
