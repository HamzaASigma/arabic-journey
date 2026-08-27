/* ===== Rihlati — games ===== */

function shuffle(a) { return a.slice().sort(() => Math.random() - 0.5); }

// ================= QUIZ QUEST =================
const QUIZ_LENGTH = 10;
let quiz = null;

function buildQuestions() {
  const qs = [];
  // Letter -> name (4)
  shuffle(LETTERS).slice(0, 4).forEach(l => {
    const opts = shuffle([l.name].concat(
      shuffle(LETTERS.filter(x => x.ch !== l.ch)).slice(0, 3).map(x => x.name)));
    qs.push({ q: "What is the name of this letter?", big: l.ch, sub: null,
      options: opts, answer: l.name });
  });
  // Word meanings (4)
  const allWords = DECKS.reduce((a, d) => a.concat(d.cards), []);
  shuffle(allWords).slice(0, 4).forEach(w => {
    const opts = shuffle([w.en].concat(
      shuffle(allWords.filter(x => x.en !== w.en)).slice(0, 3).map(x => x.en)));
    qs.push({ q: "What does this word mean?", big: w.ar, sub: w.tr, options: opts, answer: w.en });
  });
  // Numbers (2)
  [3, 7, 9].sort(() => Math.random() - .5).slice(0, 2).forEach(n => {
    const num = NUMBERS[n];
    const opts = shuffle([num.tr].concat(
      shuffle(NUMBERS.filter(x => x.n !== n)).slice(0, 3).map(x => x.tr)));
    qs.push({ q: "Which number is this? (" + n + ")", big: num.digit, sub: null,
      options: opts, answer: num.tr });
  });
  // Phrases (1-2)
  const allPhr = PHRASES.reduce((a, g) => a.concat(g.items), []);
  shuffle(allPhr).slice(0, 2).forEach(p => {
    const opts = shuffle([p.en].concat(
      shuffle(allPhr.filter(x => x.en !== p.en)).slice(0, 3).map(x => x.en)));
    qs.push({ q: "What does this phrase mean?", big: p.ar, sub: p.tr, options: opts, answer: p.en });
  });
  return shuffle(qs).slice(0, QUIZ_LENGTH);
}

function startQuiz() {
  document.getElementById("game-picker").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  quiz = {
    questions: buildQuestions(),
    current: 0,
    score: 0,
    streak: 0,
    lives: 3,
    correct: 0
  };
  renderQuizQuestion();
}

function renderQuizQuestion() {
  if (quiz.current >= quiz.questions.length || quiz.lives <= 0) return endQuiz();

  const q = quiz.questions[quiz.current];
  document.getElementById("quiz-hearts").innerHTML =
    Array(3).fill(0).map((_, i) =>
      '<span class="' + (i < quiz.lives ? "" : "hearts-lost") + '">❤️</span>').join("");
  document.getElementById("quiz-streak").textContent = quiz.streak;
  document.getElementById("quiz-score").textContent = quiz.score;

  let html = '<div class="quiz-q">' + q.q + "</div>";
  if (q.big && LETTERS.some(l => l.ch === q.big)) {
    html += '<div class="quiz-big-ar ar-inline">' + q.big +
      ' <button class="speak-btn" style="background:var(--gold);vertical-align:middle" onclick="speak(\'' + q.big + '\')">🔊</button></div>';
  } else if (q.big) {
    html += '<div class="quiz-big-ar ar-inline" style="font-size:44px;cursor:pointer" onclick="speak(\'' + q.big + '\')">' + q.big + "</div>";
  }
  if (q.sub) html += '<div class="quiz-sub">“' + q.sub + '”</div>';
  html += '<div class="quiz-options">' + q.options.map((o, i) =>
    "<button class=\"quiz-opt\" data-i=\"" + i + "\" onclick=\"answerQuiz(this,'" +
    o.replace(/'/g, "\\'") + "')\">" + o + "</button>").join("") + "</div>" +
    '<div class="quiz-feedback" id="quiz-feedback"></div>';
  document.getElementById("quiz-body").innerHTML = html;
}

function answerQuiz(btn, chosen) {
  const q = quiz.questions[quiz.current];
  const fb = document.getElementById("quiz-feedback");
  const buttons = document.querySelectorAll(".quiz-opt");
  buttons.forEach(b => b.disabled = true);

  if (chosen === q.answer) {
    btn.classList.add("correct");
    quiz.streak++;
    quiz.correct++;
    state.bestQuizStreak = Math.max(state.bestQuizStreak, quiz.streak);
    const bonus = quiz.streak >= 5 ? 5 : 0;
    quiz.score += 10 + bonus;
    fb.textContent = "✅ Correct! +" + (10 + bonus) + " XP" +
      (bonus ? " (🔥 streak bonus!)" : "");
    fb.className = "quiz-feedback good";
    confetti(25);
  } else {
    btn.classList.add("wrong");
    buttons.forEach(b => { if (b.textContent === q.answer) b.classList.add("correct"); });
    quiz.lives--;
    quiz.streak = 0;
    fb.textContent = "❌ The answer was: " + q.answer;
    fb.className = "quiz-feedback bad";
  }
  document.getElementById("quiz-hearts").innerHTML =
    Array(3).fill(0).map((_, i) =>
      '<span class="' + (i < quiz.lives ? "" : "hearts-lost") + '">❤️</span>').join("");
  document.getElementById("quiz-score").textContent = quiz.score;
  document.getElementById("quiz-streak").textContent = quiz.streak;
  saveState();

  setTimeout(() => {
    quiz.current++;
    renderQuizQuestion();
  }, 1300);
}

function endQuiz() {
  addXP(quiz.score);
  state.quizWins = (state.quizWins || 0) + 1;
  saveState();
  const perfect = quiz.correct === QUIZ_LENGTH && quiz.lives === 3;
  if (perfect) confetti(160);
  document.getElementById("quiz-body").innerHTML =
    '<div class="quiz-center"><div style="font-size:56px">' +
    (quiz.lives > 0 ? (perfect ? "🏆" : "🎉") : "💪") + "</div>" +
    '<h3>' + (perfect ? "PERFECT RUN!" : quiz.lives > 0 ? "Great job!" : "Good effort!") + "</h3>" +
    '<div class="quiz-final-score">+' + quiz.score + " XP ⭐</div>" +
    '<p style="font-weight:700;color:#8a7f70;margin-bottom:18px">XP added to your total!</p>' +
    '<button class="btn btn-primary btn-lg" onclick="startQuiz()">Play Again 🔄</button> ' +
    "<button class=\"btn btn-ghost btn-lg\" onclick=\"quitQuiz()\">Back to Arcade</button></div>";
}

function quitQuiz() {
  document.getElementById("quiz-screen").classList.add("hidden");
  document.getElementById("game-picker").classList.remove("hidden");
}

// ================= MATCH MANIA =================
let memGame = null;

function startMatchGame() {
  document.getElementById("game-picker").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");

  const words = shuffle(DECKS.reduce((a, d) => a.concat(d.cards), [])).slice(0, 6);
  const cards = [];
  words.forEach((w, i) => {
    cards.push({ id: i, type: "ar", text: w.ar, pairId: i });
    cards.push({ id: i + 100, type: "en", text: w.en, pairId: i });
  });
  memGame = { cards: shuffle(cards), flipped: [], matched: 0, misses: 0, lock: false };
  renderMatchGame();
}

function renderMatchGame() {
  document.getElementById("quiz-hearts").innerHTML = "🧠";
  document.getElementById("quiz-streak").textContent = "Misses: " + memGame.misses;
  document.getElementById("quiz-score").textContent = memGame.matched * 5 + " XP";

  let html = '<div class="match-stats"><span>🎯 Match Arabic ↔ English</span><span>✅ ' +
    memGame.matched + '/6 pairs</span></div><div class="memory-grid">';
  memGame.cards.forEach((c, idx) => {
    const face = c.type === "ar"
      ? '<div class="mem-face mem-front ar-txt">' + c.text + "</div>"
      : '<div class="mem-face mem-front">' + c.text + "</div>";
    html += '<div class="mem-card' +
      (c.matched ? " matched" : "") +
      "\" onclick=\"flipMemCard(" + idx + ')">' +
      '<div class="mem-inner"><div class="mem-face mem-back">❔</div>' + face + "</div></div>";
  });
  html += '</div><div class="quiz-center" style="padding:16px 0 0">' +
    '<button class="btn btn-ghost" onclick="quitQuiz()">← Back to Arcade</button>';
  if (memGame.matched === 6) {
    const bonus = memGame.misses === 0 ? 30 : 0;
    html += '<div class="quiz-final-score">+' + (memGame.matched * 5 + bonus) + " XP ⭐</div>" +
      (bonus ? '<p style="font-weight:900;color:var(--green)">🏆 FLAWLESS VICTORY BONUS!</p>' : "") +
      '<button class="btn btn-primary btn-lg" style="margin-top:10px" onclick="startMatchGame()">Play Again 🔄</button>';
  }
  html += "</div>";
  document.getElementById("quiz-body").innerHTML = html;

  // reapply flipped states
  memGame.flipped.forEach(idx => {
    const el = document.querySelector(".memory-grid .mem-card:nth-child(" + (idx + 1) + ")");
    if (el && !memGame.cards[idx].matched) el.classList.add("flipped");
  });
}

function flipMemCard(idx) {
  const card = memGame.cards[idx];
  if (memGame.lock || card.matched) return;
  if (memGame.flipped.indexOf(idx) >= 0) return;

  memGame.flipped.push(idx);
  const el = document.querySelector(".memory-grid .mem-card:nth-child(" + (idx + 1) + ")");
  if (el) el.classList.add("flipped");

  if (memGame.flipped.length === 2) {
    memGame.lock = true;
    const [a, b] = memGame.flipped.map(i => memGame.cards[i]);
    setTimeout(() => {
      if (a.pairId === b.pairId && a.type !== b.type) {
        a.matched = b.matched = true;
        memGame.matched++;
        confetti(20);
        speak(a.type === "ar" ? a.text : b.text);
        if (memGame.matched === 6) {
          state.perfectMatch = memGame.misses === 0;
          addXP(memGame.matched * 5 + (state.perfectMatch ? 30 : 0));
          saveState();
        }
      } else {
        memGame.misses++;
      }
      memGame.flipped = [];
      memGame.lock = false;
      renderMatchGame();
    }, 800);
  }
}

// ================= LETTER SOUND GAME =================
let lsGame = null;

function startLetterSound() {
  document.getElementById("game-picker").classList.add("hidden");
  document.getElementById("quiz-screen").classList.remove("hidden");
  nextLetterRound(true);
}

function nextLetterRound(first) {
  const pick = LETTERS[(Math.random() * LETTERS.length) | 0];
  const opts = shuffle([pick.name].concat(
    shuffle(LETTERS.filter(x => x.ch !== pick.ch)).slice(0, 3).map(x => x.name)));
  lsGame = { letter: pick, options: opts };
  document.getElementById("quiz-hearts").innerHTML = "👂";
  document.getElementById("quiz-streak").textContent = "Listen & choose";
  document.getElementById("quiz-score").textContent = "🔊";

  document.getElementById("quiz-body").innerHTML =
    '<div class="quiz-q">Which letter makes this sound?</div>' +
    '<div class="quiz-center" style="padding:14px 0">' +
    "<button class=\"btn btn-secondary btn-lg\" onclick=\"speak('" + pick.ex.ar + "')\">▶️ Play the sound of “" +
    pick.ex.tr + "” (" + pick.ex.en + ")</button></div>" +
    '<div class="quiz-options">' + opts.map(o =>
      "<button class=\"quiz-opt\" onclick=\"answerLetterSound(this,'" + o.replace(/'/g, "\\'") + "')\">" + o + "</button>").join("") +
    '</div><div class="quiz-feedback" id="ls-feedback"></div>';
}

function answerLetterSound(btn, chosen) {
  const correct = chosen === lsGame.letter.name;
  const fb = document.getElementById("ls-feedback");
  document.querySelectorAll(".quiz-opt").forEach(b => {
    b.disabled = true;
    if (b.textContent === lsGame.letter.name) b.classList.add("correct");
  });
  if (!correct) btn.classList.add("wrong");

  if (correct) {
    fb.textContent = "✅ That's " + lsGame.letter.name + "! (+8 XP)";
    fb.className = "quiz-feedback good";
    confetti(25);
    addXP(8);
  } else {
    fb.textContent = "❌ It was " + lsGame.letter.name + " " + lsGame.letter.ch + " — try another!";
    fb.className = "quiz-feedback bad";
  }
  setTimeout(() => {
    quitQuizToLS();
    nextLetterRound();
  }, 1400);
}

function quitQuizToLS() {
  // keep the quiz-screen shell open for the next letter round
}
