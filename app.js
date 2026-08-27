/* ============================================================
   Arabic Journey — app logic
   ============================================================ */
'use strict';

/* ---------- tiny helpers ---------- */
const $  = s => document.querySelector(s);
const $$ = s => Array.from(document.querySelectorAll(s));
const rnd = n => Math.floor(Math.random() * n);
const pick = a => a[rnd(a.length)];
const shuffled = a => { const c=[...a]; for(let i=c.length-1;i>0;i--){ const j=rnd(i+1); [c[i],c[j]]=[c[j],c[i]]; } return c; };
const cap = s => s.charAt(0).toUpperCase() + s.slice(1);

/* ---------- inline icons ---------- */
const I = {
  vol : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>',
  left : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>',
  right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>',
  flip : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/></svg>',
  shuf : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>',
  star : '<svg viewBox="0 0 24 24" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
  x    : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>',
  chev : '<svg class="chev" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>',
  bulb : '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="var(--gold)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18h6"/><path d="M10 22h4"/><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.4 1 2.3h6c0-.9.4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>'
};

/* ---------- persistent progress ---------- */
const STORE_KEY = 'aj-progress-v1';
function loadProgress(){
  try{ return JSON.parse(localStorage.getItem(STORE_KEY)) || {letters:{},words:{},quizBest:{}}; }
  catch(e){ return {letters:{},words:{},quizBest:{}}; }
}
function saveProgress(){ try{ localStorage.setItem(STORE_KEY, JSON.stringify(progress)); }catch(e){} }
let progress = loadProgress();

const isLetterLearned = i => !!progress.letters[i];
const wordKey = (cat,w) => cat + '|' + w.ar;
const isWordLearned = (cat,w) => !!progress.words[wordKey(cat,w)];

/* ---------- speech ---------- */
let warnedNoVoice = false;
let arVoice = null;
function loadVoices(){
  try{
    const vs = speechSynthesis.getVoices();
    arVoice = vs.find(v => v.lang && v.lang.toLowerCase().startsWith('ar')) || null;
  }catch(e){}
}
if ('speechSynthesis' in window){
  loadVoices();
  speechSynthesis.onvoiceschanged = loadVoices;
}
function speak(text){
  if (!('speechSynthesis' in window)){ toast('Audio is not supported in this browser.'); return; }
  loadVoices();
  if (!arVoice && !warnedNoVoice){
    warnedNoVoice = true;
    toast('Tip: install an Arabic voice in your OS settings to hear pronunciation.');
  }
  speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ar-SA';
  u.rate = 0.85;
  if (arVoice) u.voice = arVoice;
  speechSynthesis.speak(u);
}

/* ---------- toast ---------- */
let toastTimer = null;
function toast(msg){
  const el = $('#toast');
  el.textContent = msg;
  el.classList.remove('hidden');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=> el.classList.add('hidden'), 3500);
}

/* ================= ROUTING ================= */
const ROUTES = ['home','alphabet','vowels','numbers','words','grammar','phrases','quiz'];
const VIEW_ID = r => r === 'words' ? 'view-wordsec' : 'view-' + r;

function currentRoute(){
  const h = location.hash.replace('#','');
  return ROUTES.includes(h) ? h : 'home';
}
function applyRoute(){
  const r = currentRoute();
  $$('.view').forEach(v => v.classList.remove('active'));
  $('#' + VIEW_ID(r)).classList.add('active');
  $$('#main-nav button').forEach(b =>
    b.classList.toggle('current', b.dataset.route === r));
  window.scrollTo({top:0});
}
document.addEventListener('click', e => {
  const t = e.target.closest('[data-route]');
  if (!t) return;
  e.preventDefault();
  const r = t.dataset.route;
  if (location.hash === '#' + r) applyRoute(); else location.hash = '#' + r;
});

/* ================= THEME ================= */
function applyTheme(t){
  document.documentElement.dataset.theme = t;
  $('#theme-btn').innerHTML = t === 'dark'
    ? '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>'
    : '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>';
  try{ localStorage.setItem('aj-theme', t); }catch(e){}
}
$('#theme-btn').addEventListener('click', () =>
  applyTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));

/* ================= HOME ================= */
const TIPS = [
  'Read out loud — your mouth learns faster than your eyes.',
  'Learn the 28 letters in small groups of five. Celebrate each group!',
  'Arabic has no capital letters and no “is/am/are” in the present tense. One less thing to worry about.',
  'Words share roots: k-t-b gives you book, writer, office and library at once.',
  'Five focused minutes a day beats one heroic hour a week.',
  'Listen to the same phrase three times before reading its translation.',
  'Make mistakes loudly. Fluent speakers are just learners who kept talking.'
];
let tipIdx = rnd(TIPS.length);
function rotateTip(){
  const el = $('#tip-text');
  el.classList.remove('swap'); void el.offsetWidth;
  el.textContent = TIPS[tipIdx % TIPS.length];
  el.classList.add('swap');
  tipIdx++;
}
function greet(){
  const h = new Date().getHours();
  const g = h < 12 ? 'Sabāḥ al-khayr — good morning!'
          : h < 18 ? 'Nahāruk saʿīd — good afternoon!'
          : 'Masāʾ al-khayr — good evening!';
  $('#hero-greeting').textContent = g;
}
function counts(){
  const L = Object.keys(progress.letters).length;
  const W = Object.keys(progress.words).length;
  const bestPct = Math.max(0, ...Object.values(progress.quizBest), 0);
  return {L, W, totalW: WORD_TOTAL, bestPct};
}
function updateProgressUI(){
  const {L,W,totalW,bestPct} = counts();
  const overall = Math.round((L + W) / (LETTERS.length + totalW) * 100);
  $('#overall-bar').style.width = overall + '%';
  $('#overall-pct').textContent = overall + '%';
  $('#stat-letters').textContent = L + '/' + LETTERS.length;
  $('#stat-letters-bar').style.width = (L / LETTERS.length * 100) + '%';
  $('#stat-words').textContent = W + '/' + totalW;
  $('#stat-words-bar').style.width = (W / totalW * 100) + '%';
  $('#stat-quiz').textContent = bestPct ? bestPct + '%' : '—';
  $('#stat-quiz-bar').style.width = bestPct + '%';
}

/* ================= ALPHABET ================= */
let alphaFilter = 'all';
let alphaQuery = '';

function renderAlphabet(){
  const grid = $('#alpha-grid');
  const list = LETTERS.map((L,i)=>({L,i})).filter(({L})=>{
    if (alphaFilter === 'learned' && !isLetterLearned(String(lettersKeyOf(L)))) return false;
    if (alphaFilter === 'todo' && isLetterLearned(String(lettersKeyOf(L)))) return false;
    if (alphaFilter === 'joiners' && !L.joins) return false;
    if (alphaFilter === 'non' && L.joins) return false;
    if (alphaQuery){
      const q = alphaQuery.toLowerCase();
      const hay = (L.name + ' ' + L.sound + ' ' + L.ex.en + ' ' + L.ex.tr).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
  grid.innerHTML = list.map(({L,i})=>`
    <button type="button" class="letter-card ${isLetterLearned(String(i))?'learned':''}" data-i="${i}">
      <span class="lc-star">${I.star}</span>
      <span class="lc-char">${L.ch}</span>
      <span class="lc-name">${L.name}</span>
      <span class="lc-sound">“${L.sound}”</span>
    </button>`).join('');
  $('#alpha-count').textContent = list.length ? list.length + ' letters shown' : 'Nothing matches your search.';
}
/* store letters by their position so renames stay stable */
const lettersKeyOf = L => LETTERS.indexOf(L);

function openLetter(i){
  renderModal(i);
  $('#modal-overlay').classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeModal(){
  $('#modal-overlay').classList.add('hidden');
  document.body.style.overflow = '';
}
function renderModal(i){
  const L = LETTERS[i];
  const learned = isLetterLearned(String(i));
  $('#modal-body').innerHTML = `
    <div class="md-top">
      <div class="big-letter">${L.ch}</div>
      <div class="md-title">
        <h3 id="modal-title">${cap(L.name)} <button type="button" class="say-btn" style="vertical-align:middle;margin-left:.4rem" data-say="${L.name}" data-say-latin>${I.vol}</button></h3>
        <p>Letter ${i+1} of 28</p>
      </div>
    </div>
    <div class="forms-strip">
      <div class="form-cell"><span class="arabic">${L.forms.iso}</span><span class="form-label">Isolated</span></div>
      <div class="form-cell"><span class="arabic">${L.forms.fin}</span><span class="form-label">End</span></div>
      <div class="form-cell"><span class="arabic">${L.forms.ini}</span><span class="form-label">Start</span></div>
      <div class="form-cell"><span class="arabic">${L.forms.med}</span><span class="form-label">Middle</span></div>
    </div>
    <div class="hint-box">${I.bulb}<span>${L.hint}</span></div>
    <div class="ex-word">
      <div><span class="arabic">${L.ex.ar}</span><small>${L.ex.tr} — “${L.ex.en}”</small></div>
      <button type="button" class="say-btn" data-say="${L.ex.ar}" aria-label="Hear example word">${I.vol}</button>
    </div>
    ${L.note ? `<p class="note-line">Note: ${L.note}</p>` : ''}
    <button type="button" class="btn btn-primary" style="margin-top:.8rem;width:100%" data-say="${L.ch}" aria-label="Hear the letter sound">${I.vol} Hear this letter</button>`;
  $('#modal-star').classList.toggle('active', learned);
  $('#modal-star').innerHTML = I.star;
}
$('#modal-close').addEventListener('click', closeModal);
$('#modal-overlay').addEventListener('click', e => { if (e.target.id === 'modal-overlay') closeModal(); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
  if (!$('#modal-overlay').classList.contains('hidden')){
    const cur = Number($('#modal-star').dataset.i || 0);
    if (e.key === 'ArrowRight'){ /* RTL: right arrow goes to previous letter */ openLetter((cur - 1 + 28) % 28); }
    if (e.key === 'ArrowLeft'){ openLetter((cur + 1) % 28); }
  }
});
$('#modal-prev').addEventListener('click', () => {
  const cur = Number($('#modal-star').dataset.i || 0);
  openLetter((cur - 1 + LETTERS.length) % LETTERS.length);
});
$('#modal-next').addEventListener('click', () => {
  const cur = Number($('#modal-star').dataset.i || 0);
  openLetter((cur + 1) % LETTERS.length);
});
$('#modal-star').addEventListener('click', () => {
  const i = String($('#modal-star').dataset.i);
  progress.letters[i] = !progress.letters[i];
  if (!progress.letters[i]) delete progress.letters[i];
  saveProgress();
  renderModal(Number(i));
  renderAlphabet();
  updateProgressUI();
});

$('#alpha-search').addEventListener('input', e => { alphaQuery = e.target.value.trim(); renderAlphabet(); });
$('#alpha-filters').addEventListener('click', e => {
  const c = e.target.closest('.chip'); if(!c) return;
  $$('#alpha-filters .chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active');
  alphaFilter = c.dataset.filter;
  renderAlphabet();
});

/* ================= VOWELS ================= */
function renderVowels(){
  $('#marks-grid').innerHTML = VOWELS.map(v=>`
    <div class="mark-card">
      <div class="mk-row">
        <span class="mk-mark arabic">\u0640${v.mark}</span>
        <span class="mk-name">${v.name}</span>
        <span class="mk-sound">${v.sound ? '“'+v.sound+'”' : '—'}</span>
      </div>
      <p class="mk-desc">${v.desc}</p>
    </div>`).join('');

  $('#long-grid').innerHTML = LONG_VOWELS.map(v=>`
    <div class="mark-card">
      <div class="mk-row">
        <span class="mk-mark arabic">${v.out}</span>
        <span class="mk-name">${v.sound}</span>
      </div>
      <p class="mk-desc">${v.desc}</p>
    </div>`).join('');

  $('#vowel-base').innerHTML = LETTERS.map((L,i)=>
    `<option value="${i}">${L.ch} — ${L.name}</option>`).join('');
  $('#vowel-base').addEventListener('change', renderCombos);
  renderCombos();
}
function renderCombos(){
  const L = LETTERS[$('#vowel-base').value];
  const FATH='\u064E', DAMM='\u064F', KASR='\u0650', SUK='\u0652';
  const combos = [
    {t:L.ch+FATH, s:L.name.slice(0,-1)+'a'},
    {t:L.ch+DAMM, s:L.name.slice(0,-1)+'u'},
    {t:L.ch+KASR, s:L.name.slice(0,-1)+'i'},
    {t:L.ch+SUK,  s:L.name+' (no vowel)'},
    {t:L.ch+FATH+'ا', s:L.name.slice(0,-1)+'ā'},
    {t:L.ch+DAMM+'و', s:L.name.slice(0,-1)+'ū'},
    {t:L.ch+KASR+'ي', s:L.name.slice(0,-1)+'ī'}
  ];
  $('#vowel-grid').innerHTML = combos.map(c=>`
    <button type="button" class="combo-card" data-say="${c.t.replace(SUK,'')}">
      <span class="cc-out">${c.t}</span>
      <span class="cc-sound">${c.s}</span>
    </button>`).join('');
}

/* ================= NUMBERS ================= */
function renderNumbers(){
  $('#numbers-grid').innerHTML = NUMBERS.map(n=>`
    <div class="num-card">
      <span class="num-digit arabic" dir="ltr">${n.d}</span>
      <span class="num-value">${n.v.toLocaleString()}</span>
      <span class="num-ar arabic">${n.ar}</span>
      <span class="num-tr">${n.tr}</span>
      <button type="button" class="say-btn" style="margin-top:.5rem" data-say="${n.ar}" aria-label="Hear number">${I.vol}</button>
    </div>`).join('');
}

/* ================= WORDS ================= */
let catIdx = 0;
let deckPos = 0;
let deckOrder = [];
let listView = false;

function renderCatChips(){
  $('#word-cats').innerHTML = WORDS.map((c,i)=>{
    const done = c.items.filter(w=>isWordLearned(c.cat,w)).length;
    return `<button type="button" class="chip ${i===catIdx?'active':''}" data-cat="${i}">
      ${c.cat} <b style="color:${done===c.items.length?'var(--gold)':'inherit'}">${done}/${c.items.length}</b></button>`;
  }).join('');
}
function setCategory(i){
  catIdx = i;
  deckPos = 0;
  deckOrder = WORDS[i].items.map((_,k)=>k);
  renderCatChips();
  renderDeckArea();
  renderCard();
}
function renderDeckArea(){
  $('#deck-area').classList.toggle('hidden', listView);
  $('#words-list').classList.toggle('hidden', !listView);
  $('#btn-deck-view').classList.toggle('active', !listView);
  $('#btn-list-view').classList.toggle('active', listView);
  if (listView) renderList();
}
function curWord(){
  const cat = WORDS[catIdx];
  return cat.items[deckOrder[deckPos]];
}
function renderCard(){
  const cat = WORDS[catIdx], w = curWord();
  const learned = isWordLearned(cat.cat, w);
  $('#flashcard').classList.remove('flipped');
  $('#fc-cat-front').textContent = cat.cat;
  $('#fc-cat-back').textContent = cat.cat;
  $('#fc-ar').textContent = w.ar;
  $('#fc-tr').textContent = w.tr;
  $('#fc-en').textContent = cap(w.en);
  $('#fc-star').classList.toggle('active', learned);
  const done = cat.items.filter(x=>isWordLearned(cat.cat,x)).length;
  $('#cat-progress-label').textContent = `Deck: ${cat.cat} — ${done}/${cat.items.length} starred`;
  $('#cat-progress-bar').style.width = (done / cat.items.length * 100) + '%';
}
function step(dir){
  const n = WORDS[catIdx].items.length;
  deckPos = (deckPos + dir + n) % n;
  renderCard();
}
$('#fc-next').addEventListener('click', ()=>step(1));
$('#fc-prev').addEventListener('click', ()=>step(-1));
$('#fc-flip').addEventListener('click', ()=>$('#flashcard').classList.toggle('flipped'));
$('#flashcard').addEventListener('click', e => {
  if (e.target.closest('button')) return;
  $('#flashcard').classList.toggle('flipped');
});
$('#flashcard').addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); $('#flashcard').classList.toggle('flipped'); }
});
$('#fc-shuffle').addEventListener('click', ()=>{
  deckOrder = shuffled(deckOrder);
  deckPos = 0;
  renderCard();
  toast('Deck shuffled.');
});
$('#fc-star').addEventListener('click', ()=>{
  const cat = WORDS[catIdx], w = curWord(), k = wordKey(cat.cat,w);
  if (progress.words[k]) delete progress.words[k]; else progress.words[k] = true;
  saveProgress();
  renderCard();
  renderCatChips();
  updateProgressUI();
});
$('#word-cats').addEventListener('click', e => {
  const c = e.target.closest('.chip'); if(!c) return;
  setCategory(Number(c.dataset.cat));
});
$('#btn-deck-view').addEventListener('click', ()=>{ listView=false; renderDeckArea(); });
$('#btn-list-view').addEventListener('click', ()=>{ listView=true; renderDeckArea(); });

function renderList(){
  const cat = WORDS[catIdx];
  $('#words-list').innerHTML = cat.items.map((w,k)=>`
    <div class="word-row">
      <button type="button" class="star-toggle ${isWordLearned(cat.cat,w)?'on':''}" data-w="${k}" aria-label="Toggle learned">${I.star}</button>
      <span class="wr-ar">${w.ar}</span>
      <span class="wr-tr">${w.tr}</span>
      <span class="wr-en">${cap(w.en)}</span>
      <button type="button" class="say-btn" data-say="${w.ar}" aria-label="Listen">${I.vol}</button>
    </div>`).join('');
}
$('#words-list').addEventListener('click', e => {
  const st = e.target.closest('.star-toggle');
  if (st){
    const cat = WORDS[catIdx], w = cat.items[Number(st.dataset.w)];
    const k = wordKey(cat.cat,w);
    if (progress.words[k]) delete progress.words[k]; else progress.words[k] = true;
    saveProgress();
    st.classList.toggle('on');
    renderCatChips();
    updateProgressUI();
    return;
  }
  if (e.target.closest('[data-say]')) return; // handled globally
});

/* ================= GRAMMAR ================= */
function renderGrammar(){
  $('#grammar-list').innerHTML = GRAMMAR.map((g,i)=>`
    <div class="lesson ${i===0?'open':''}">
      <button type="button" class="lesson-head">${g.title}${I.chev}</button>
      <div class="lesson-body">${g.body}</div>
    </div>`).join('');
}

/* ================= PHRASES ================= */
function renderPhrases(){
  $('#phrases-list').innerHTML = PHRASE_GROUPS.map(g=>`
    <div class="phrase-group">
      <h3 class="pg-title">${g.title}</h3>
      ${g.items.map(p=>`
        <div class="phrase-row">
          <span class="pr-ar">${p.ar}</span>
          <span class="pr-mid"><span class="pr-tr">${p.tr}</span><span class="pr-en">${p.en}</span></span>
          <button type="button" class="say-btn" data-say="${p.ar}" aria-label="Listen">${I.vol}</button>
        </div>`).join('')}
    </div>`).join('');

  $('#dialogue').innerHTML = DIALOGUE.map((d,i)=>`
    <div class="bubble ${d.who}" data-line="${i}">
      <span class="arabic">${d.ar}</span>
      <span class="bub-tr">${d.tr}</span>
      <span class="bub-en">${d.en}</span>
    </div>`).join('');
}
async function playDialogue(){
  const btn = $('#play-dialogue');
  btn.disabled = true;
  btn.textContent = 'Playing…';
  const lines = $$('#dialogue .bubble');
  for (let i=0;i<lines.length;i++){
    lines.forEach(b=>b.classList.remove('active'));
    lines[i].classList.add('active');
    lines[i].scrollIntoView({block:'nearest', behavior:'smooth'});
    await speakWait(DIALOGUE[i].ar);
    await new Promise(r=>setTimeout(r,250));
  }
  lines.forEach(b=>b.classList.remove('active'));
  btn.disabled = false;
  btn.textContent = 'Play conversation';
}
function speakWait(text){
  return new Promise(res=>{
    if (!('speechSynthesis' in window)){ setTimeout(res, 1200); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang='ar-SA'; u.rate=.85;
    if (arVoice) u.voice = arVoice;
    let done = false;
    const finish = ()=>{ if(!done){ done=true; res(); } };
    u.onend = finish; u.onerror = finish;
    setTimeout(finish, 4000); /* safety net */
    speechSynthesis.speak(u);
  });
}
$('#play-dialogue').addEventListener('click', playDialogue);

/* ================= QUIZ ================= */
let quizTopic = 'mixed';
let quiz = null;

function makeOptions(correct, pool, format){
  const opts = [correct];
  const rest = pool.filter(x => x !== correct);
  while (opts.length < 4 && rest.length){
    const p = pick(rest);
    if (!opts.includes(p)) opts.push(p);
  }
  return shuffled(opts).map(format);
}
function letterQuestion(){
  const L = pick(LETTERS);
  if (Math.random() < .5){
    return {
      html:`<span class="q-big">${L.ch}</span>`,
      prompt:'Which letter is this?',
      options: makeOptions(cap(L.name), LETTERS.map(l=>cap(l.name)), n=>({label:n})),
      answer: cap(L.name),
      say: L.ch
    };
  }
  return {
    html:`<span class="q-prompt">Which letter makes the sound</span>`,
    sub:`“${L.sound}” — ${L.hint}`,
    options: makeOptions(L.ch, LETTERS.map(l=>l.ch), c=>({label:c, arabic:true})),
    answer: L.ch,
    say: null
  };
}
function vocabQuestion(){
  const dirArToEn = Math.random() < .5;
  const cat = pick(WORDS);
  const w = pick(cat.items);
  const pool = [];
  WORDS.forEach(c=>c.items.forEach(x=>pool.push(x)));
  if (dirArToEn){
    return {
      html:`<span class="q-big">${w.ar}</span>`,
      prompt:'What does this word mean?',
      options: makeOptions(w.en, pool.map(x=>x.en), e=>({label:cap(e)})),
      answer: w.en,
      say: w.ar
    };
  }
  return {
    html:`<span class="q-prompt" style="font-size:1.6rem">${cap(w.en)}</span>`,
    prompt:'How do you say this in Arabic?',
    options: makeOptions(w.ar, pool.map(x=>x.ar), a=>({label:a, arabic:true})),
    answer: w.ar,
    say: null
  };
}
function numberQuestion(){
  const n = pick(NUMBERS.filter(x=>x.v<=20 || x.v===100 || x.v===1000));
  if (Math.random() < .5){
    return {
      html:`<span class="q-big" dir="ltr">${n.d}</span>`,
      prompt:'What number is this?',
      options: makeOptions(n.tr, NUMBERS.map(x=>x.tr), t=>({label:t})),
      answer: n.tr,
      say: n.ar
    };
  }
  return {
    html:`<span class="q-prompt" style="font-size:1.5rem">${n.ar}</span><span class="q-sub">${n.tr}</span>`,
    prompt:'Which numeral matches?',
    options: makeOptions(n.v, NUMBERS.map(x=>x.v), v=>({label:v.toLocaleString()})),
    answer: String(n.v),
    say: null
  };
}
function genQuestion(){
  const bag = {letters:[letterQuestion], vocab:[vocabQuestion], numbers:[numberQuestion]};
  if (quizTopic !== 'mixed') return bag[quizTopic][0]();
  return pick([letterQuestion, vocabQuestion, vocabQuestion, numberQuestion])();
}

function startQuiz(){
  quiz = {qs: Array.from({length:10}, genQuestion), idx:0, score:0};
  $('#quiz-setup').classList.add('hidden');
  $('#quiz-result').classList.add('hidden');
  $('#quiz-play').classList.remove('hidden');
  showQuestion();
}
function showQuestion(){
  const q = quiz.qs[quiz.idx];
  $('#q-progress').textContent = `Question ${quiz.idx+1} of ${quiz.qs.length}`;
  $('#q-score').textContent = `Score: ${quiz.score}`;
  $('#q-bar').style.width = (quiz.idx / quiz.qs.length * 100) + '%';
  $('#q-question').innerHTML = q.html + `<span class="q-prompt">${q.prompt}</span>` +
    (q.sub ? `<span class="q-sub">${q.sub}</span>` : '');
  $('#q-options').innerHTML = q.options.map((o,i)=>
    `<button type="button" class="opt ${o.arabic?'arabic-opt':''}" data-i="${i}"
      style="${o.arabic?'':'font-family:inherit'}">${o.label}</button>`).join('');
  $('#q-feedback').textContent = '';
  $('#q-feedback').className = 'q-feedback';
  $('#btn-next-q').classList.add('hidden');
}
function answerQuestion(btn){
  const q = quiz.qs[quiz.idx];
  const chosen = q.options[Number(btn.dataset.i)];
  const ok = chosen.label === q.answer;
  $$('#q-options .opt').forEach(b=>{
    b.disabled = true;
    const o = q.options[Number(b.dataset.i)];
    if (o.label === q.answer) b.classList.add('correct');
  });
  if (ok){
    quiz.score++;
    btn.classList.add('correct');
    $('#q-feedback').textContent = pick(['Correct! Aḥsant.', 'Exactly right!', 'Well done!', 'Perfect!']);
    $('#q-feedback').classList.add('good');
  } else {
    btn.classList.add('wrong');
    $('#q-feedback').innerHTML = `The answer was <b>${q.answer}</b>`;
    $('#q-feedback').classList.add('bad');
  }
  if (q.say) speak(q.say);
  $('#q-score').textContent = `Score: ${quiz.score}`;
  $('#btn-next-q').classList.remove('hidden');
}
function finishQuiz(){
  const pct = Math.round(quiz.score / quiz.qs.length * 100);
  const prevBest = progress.quizBest[quizTopic] || 0;
  const isRecord = pct > prevBest;
  if (isRecord) progress.quizBest[quizTopic] = pct;
  saveProgress();
  updateProgressUI();

  $('#quiz-play').classList.add('hidden');
  $('#quiz-result').classList.remove('hidden');
  $('#score-ring').style.setProperty('--pct', pct + '%');
  $('#qr-score').textContent = pct + '%';
  $('#qr-msg').textContent =
    pct === 100 ? 'Flawless! You are ready for harder things.' :
    pct >= 80  ? 'Excellent work — nearly automatic!' :
    pct >= 60  ? 'Good progress. One more round will lock it in.' :
    pct >= 30  ? 'You are building the foundations. Review and retry!' :
                 'Every expert started here. Try again — slowly wins.';
  $('#qr-best').textContent =
    isRecord ? 'New personal best for this topic!' :
    `Your best on this topic: ${prevBest}%`;
}
$('#btn-start-quiz').addEventListener('click', startQuiz);
$('#btn-again').addEventListener('click', startQuiz);
$('#btn-change-topic').addEventListener('click', ()=>{
  $('#quiz-result').classList.add('hidden');
  $('#quiz-play').classList.add('hidden');
  $('#quiz-setup').classList.remove('hidden');
});
$('#btn-next-q').addEventListener('click', ()=>{
  quiz.idx++;
  if (quiz.idx >= quiz.qs.length) finishQuiz(); else showQuestion();
});
$('#quiz-topics').addEventListener('click', e=>{
  const c = e.target.closest('.chip'); if(!c) return;
  $$('#quiz-topics .chip').forEach(x=>x.classList.remove('active'));
  c.classList.add('active');
  quizTopic = c.dataset.topic;
});
$('#q-options').addEventListener('click', e=>{
  const b = e.target.closest('.opt');
  if (b && !b.disabled) answerQuestion(b);
});

/* ================= GLOBAL DELEGATION ================= */
document.addEventListener('click', e => {
  const say = e.target.closest('[data-say]');
  if (say){
    e.stopPropagation();
    speak(say.dataset.say);
    say.classList.add('pulse');
    setTimeout(()=>say.classList.remove('pulse'), 1200);
    return;
  }
  const lc = e.target.closest('.letter-card');
  if (lc){
    const i = Number(lc.dataset.i);
    $('#modal-star').dataset.i = i;
    openLetter(i);
    return;
  }
  const cc = e.target.closest('.combo-card');
  if (cc){ /* handled by data-say above */ }
});

/* ================= RESET ================= */
$('#reset-progress').addEventListener('click', ()=>{
  if (!confirm('Clear all saved progress? This cannot be undone.')) return;
  progress = {letters:{},words:{},quizBest:{}};
  saveProgress();
  renderAlphabet();
  renderCatChips();
  renderCard();
  updateProgressUI();
  toast('Progress cleared. Fresh start!');
});

/* ================= INIT ================= */
function initStaticButtons(){
  $('#fc-prev').innerHTML = I.left;
  $('#fc-next').innerHTML = I.right;
  $('#fc-flip').innerHTML = I.flip;
  $('#fc-shuffle').innerHTML = I.shuf;
  $('#fc-star').innerHTML = I.star;
  $('#modal-close').innerHTML = I.x;
  $('#modal-star').innerHTML = I.star;
}
function init(){
  let theme = null;
  try{ theme = localStorage.getItem('aj-theme'); }catch(e){}
  applyTheme(theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));

  initStaticButtons();
  greet();
  rotateTip();
  setInterval(rotateTip, 9000);

  renderAlphabet();
  renderVowels();
  renderNumbers();
  renderCatChips();
  setCategory(0);
  renderGrammar();
  renderPhrases();
  updateProgressUI();

  window.addEventListener('hashchange', applyRoute);
  applyRoute();
}
init();
