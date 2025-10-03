// Navegação simples entre "telas"
const screens = document.querySelectorAll('.screen');
function show(id){
  screens.forEach(s => s.classList.remove('active'));
  const target = document.getElementById(id);
  if(target) target.classList.add('active');
  // small extra: update hash for history
  location.hash = id;
}

// inicializa navegação
document.addEventListener('click', e => {
  const btn = e.target.closest('[data-target]');
  if(btn){
    const tgt = btn.getAttribute('data-target');
    show(tgt);
  }
});

// botão entrar na splash
document.getElementById('enterApp').addEventListener('click', () => show('menu'));

// se carregar com hash
window.addEventListener('load', () => {
  const initial = location.hash.replace('#','');
  if(initial && document.getElementById(initial)) show(initial);
  else show('splash');
  populateSchedule();
  populateMeals();
  drawPieChart();
  updateGauge();
});

// --- Dados de exemplo ---
const scheduleData = [
  {time:'07:30 - 08:15', activity:'Aquecimento', details:'Corrida leve / alongamento'},
  {time:'08:30 - 09:15', activity:'Matemática', details:'Aula 101 - Álgebra'},
  {time:'10:00 - 11:00', activity:'Treino de Força', details:'Musculação (pernas)'},
  {time:'13:30 - 14:15', activity:'Nutrição', details:'Palestra - Alimentação saudável'}
];

function populateSchedule(){
  const tbody = document.getElementById('scheduleBody');
  tbody.innerHTML = '';
  scheduleData.forEach(row => {
    const tr = document.createElement('tr');
    tr.innerHTML = <td>${row.time}</td><td>${row.activity}</td><td>${row.details}</td>;
    tbody.appendChild(tr);
  });
}

// Alimentação (exemplo)
const meals = [
  {name:'Café da manhã', kcal:320},
  {name:'Almoço', kcal:650},
  {name:'Lanche da tarde', kcal:180},
  {name:'Jantar', kcal:520},
];
function populateMeals(){
  const ul = document.getElementById('mealsList');
  if(!ul) return;
  ul.innerHTML = meals.map(m => <li>${m.name} — ${m.kcal} kcal</li>).join('');
}

// --- Monitoramento: gráfico simples (canvas) ---
function drawPieChart(){
  const canvas = document.getElementById('pieChart');
  if(!canvas) return;
  const ctx = canvas.getContext('2d');
  const data = [40, 25, 20, 15]; // Ex.: cardio, força, descanso, nutrição
  const colors = ['#4caf50','#f5b800','#f05454','#33c1a3'];
  const total = data.reduce((a,b)=>a+b,0);
  let start = -0.5 * Math.PI;
  const cx = canvas.width/2, cy = canvas.height/2, r = Math.min(cx,cy)-10;
  // limpa
  ctx.clearRect(0,0,canvas.width,canvas.height);
  data.forEach((val,i) => {
    const slice = val/total * Math.PI * 2;
    ctx.beginPath();
    ctx.moveTo(cx,cy);
    ctx.arc(cx,cy,r,start,start+slice);
    ctx.closePath();
    ctx.fillStyle = colors[i];
    ctx.fill();
    start += slice;
  });
  // legenda simples
  ctx.font = '12px sans-serif';
  ctx.fillStyle = '#dbe6ea';
  let y = 14;
  ['Cardio','Força','Descanso','Nutrição'].forEach((txt,i) => {
    ctx.fillStyle = colors[i];
    ctx.fillRect(8, y-10, 10, 10);
    ctx.fillStyle = '#dbe6ea';
    ctx.fillText(txt + ' ' + data[i] + '%', 26, y);
    y += 16;
  });
}

// Progress + gauge
function updateGauge(){
  const progressBar = document.getElementById('progressBar');
  const progressText = document.getElementById('progressText');
  const gauge = document.getElementById('gauge');
  // Exemplo fictício: calcular progresso a partir de dados
  const progress = 45; // %
  progressBar.style.width = progress + '%';
  progressText.textContent = progress + '%';
  // índice de saúde: simples cálculo fictício
  const index = 72; // 0-100
  gauge.textContent = index + ' / 100';
}
