// const colorDisplay = document.querySelector('#colorDisplay');
// const messageDisplay = document.querySelector('#message');
// const currentStreakDisplay = document.querySelector('#currentStreak');
// const bestStreakDisplay = document.querySelector('#bestStreak');
// const heartDisplay = document.querySelector('#incre');

// const colorBoxes = Array.from(document.querySelectorAll('.color-box'));
// const newRoundBtn = document.querySelector('#newRoundBtn');
// const easyBtn = document.querySelector('#easyBtn');
// const hardBtn = document.querySelector('#hardBtn');
// const resetStreakBtn = document.querySelector('#resetStreakBtn');

// let colors = [];
// let correctColor = '';
// let currentStreak = 0;
// let bestStreak = 0;
// let numColors = 6;

// let hearts = 3;
// let timer = 30;
// let timerId = null;
// let isRoundActive = true;

// const TIME_INC = 7;
// const TIME_DEC = 5;
// const START_TIMER = 30;
// const MAX_HEARTS = 3;

// function init() {
//   loadBestStreak();
//   hearts = MAX_HEARTS;
//   timer = START_TIMER;
//   updateAllDisplays();
//   attachListeners();
//   setupGame();
//   startTimer();
// }

// function attachListeners() {
//   colorBoxes.forEach(box => box.addEventListener('click', handleColorClick));
//   newRoundBtn.addEventListener('click', onNewRoundClick);
//   easyBtn.addEventListener('click', () => setMode(3));
//   hardBtn.addEventListener('click', () => setMode(6));
//   resetStreakBtn.addEventListener('click', resetBestStreak);
// }

// function loadBestStreak() {
//   const s = localStorage.getItem('colorGameBestStreak');
//   bestStreak = s ? parseInt(s, 10) || 0 : 0;
// }

// function saveBestStreak() {
//   localStorage.setItem('colorGameBestStreak', String(bestStreak));
// }

// function generateRandomColor() {
//   const r = Math.floor(Math.random() * 256);
//   const g = Math.floor(Math.random() * 256);
//   const b = Math.floor(Math.random() * 256);
//   return `rgb(${r}, ${g}, ${b})`;
// }

// function generateColors(n) {
//   const arr = [];
//   for (let i = 0; i < n; i++) arr.push(generateRandomColor());
//   return arr;
// }

// function pickCorrectColor(arr) {
//   return arr[Math.floor(Math.random() * arr.length)];
// }

// function setupGame() {
//   colors = generateColors(numColors);
//   correctColor = pickCorrectColor(colors);
//   colorDisplay.textContent = correctColor.toUpperCase();
//   isRoundActive = true;
//   message(`Pick a color!`);
//   // assign colors / hide extras
//   colorBoxes.forEach((box, i) => {
//     if (i < numColors) {
//       box.style.display = 'block';
//       box.style.backgroundColor = colors[i];
//       box.classList.remove('fade');
//       box.style.cursor = 'pointer';
//     } else {
//       box.style.display = 'none';
//     }
//   });
//   newRoundBtn.textContent = 'New Round';
//   document.querySelector('header').style.background = '';
//   updateAllDisplays();
// }

// function handleColorClick(e) {
//   if (!isRoundActive) return;
//   const box = e.currentTarget;
//   const clickedColor = box.style.backgroundColor;
//   if (clickedColor === correctColor) {
//     handleCorrect(box);
//   } else {
//     handleWrong(box);
//   }
// }

// function handleCorrect(box) {
//   currentStreak++;
//   timer += TIME_INC;
//   message(`Correct! +${TIME_INC}s`, '#4ECDC4');

//   // TASK - 2 -> "Streak!" Message When Streak ≥ 3
//   if (currentStreak > bestStreak) {
//     bestStreak = currentStreak;
//     saveBestStreak();
//     message(`New best streak! +${TIME_INC}s`, '#4ECDC4');
//   }
//   colorBoxes.style.backgroundColor = 'yellow';
//   // reveal all as correct
//   colorBoxes.forEach(b => {
//     if (b.style.display !== 'none') b.style.backgroundColor = correctColor;
//   });
//   document.querySelector('header').style.background = correctColor;
//   isRoundActive = false;
//   updateAllDisplays();
//   newRoundBtn.textContent = 'Next Round';
//   // auto next round shortly
//   setTimeout(() => {
//     if (hearts > 0 && timer > 0) setupGame();
//   }, 1200);
// }

// function handleWrong(box) {
//   hearts = Math.max(0, hearts - 1);
//   timer = Math.max(0, timer - TIME_DEC);
//   currentStreak = 0;
//   box.classList.add('fade');
//   box.style.cursor = 'default';
//   message(`Wrong! -${TIME_DEC}s`, '#FF6B6B');
//   updateAllDisplays();
//   if (hearts <= 0) {
//     gameOver('No hearts left — Game Over!');
//   } else if (timer <= 0) {
//     gameOver('Time up — Game Over!');
//   }
// }

// function updateAllDisplays(){
//   currentStreakDisplay.textContent = currentStreak;
//   bestStreakDisplay.textContent = bestStreak;
//   heartDisplay.textContent = '❤️'.repeat(hearts) + '🤍'.repeat(MAX_HEARTS - hearts);
//   updateTimerInMessage();
// }

// function message(txt, color = 'white'){
//   messageDisplay.style.color = color;
//   messageDisplay.dataset.base = txt;
//   updateTimerInMessage();
// }

// function updateTimerInMessage() {
//   const base = messageDisplay.dataset.base || '';
//   messageDisplay.textContent = base ? `${base} | Time: ${timer}s` : `Time: ${timer}s`;
// }

// function startTimer() {
//   stopTimer();
//   timerId = setInterval(() => {
//     timer = Math.max(0, timer - 1);
//     updateTimerInMessage();
//     if (timer <= 0) {
//       gameOver('Time up — Game Over!');
//     }
//   }, 1000);
// }

// function stopTimer() {
//   if (timerId) {
//     clearInterval(timerId);
//     timerId = null;
//   }
// }

// function gameOver(reason) {
//   stopTimer();
//   isRoundActive = false;
//   message(reason, '#FF6B6B');
//   colorBoxes.forEach(b => (b.style.cursor = 'default'));
//   newRoundBtn.textContent = 'Restart';
// }

// function onNewRoundClick() {
//   if (newRoundBtn.textContent === 'Restart') {
//     restartAll();
//     return;
//   }
//   if (!isRoundActive) {
//     // start next round (keep hearts & timer)
//     setupGame();
//   } else {
//     // if round still active, restart timer and reshuffle
//     setupGame();
//   }
// }

// function restartAll() {
//   hearts = MAX_HEARTS;
//   timer = START_TIMER;
//   currentStreak = 0;
//   updateAllDisplays();
//   setupGame();
//   startTimer();
//   message('Game restarted. Good luck!');
// }

// function setMode(n) {
//   numColors = n;
//   if (n === 3) {
//     easyBtn.classList.add('selected');
//     hardBtn.classList.remove('selected');
//   } else {
//     hardBtn.classList.add('selected');
//     easyBtn.classList.remove('selected');
//   }
//   setupGame();
// }

// function resetBestStreak() {
//   if (!confirm('Reset best streak?')) return;
//   bestStreak = 0;
//   currentStreak = 0;
//   localStorage.removeItem('colorGameBestStreak');
//   updateAllDisplays();
//   message('Best streak cleared');
//   setTimeout(() => message('Pick a color!'), 1200);
// }

// document.addEventListener('DOMContentLoaded', init);
// ...existing code...
const colorDisplay = document.querySelector('#colorDisplay');
const messageDisplay = document.querySelector('#message');
const currentStreakDisplay = document.querySelector('#currentStreak');
const bestStreakDisplay = document.querySelector('#bestStreak');
const heartDisplay = document.querySelector('#incre');

const colorBoxes = Array.from(document.querySelectorAll('.color-box'));
const newRoundBtn = document.querySelector('#newRoundBtn');
const easyBtn = document.querySelector('#easyBtn');
const hardBtn = document.querySelector('#hardBtn');
const resetStreakBtn = document.querySelector('#resetStreakBtn');

let colors = [];
let correctColor = '';
let currentStreak = 0;
let bestStreak = 0;
let numColors = 6;

let hearts = 3;
let timer = 30;
let timerId = null;
let isRoundActive = true;

const TIME_INC = 7;
const TIME_DEC = 5;
const START_TIMER = 30;
const MAX_HEARTS = 3;

function init() {
  loadBestStreak();
  hearts = MAX_HEARTS;
  timer = START_TIMER;
  updateAllDisplays();
  attachListeners();
  setupGame();
  startTimer();
}

function attachListeners() {
  colorBoxes.forEach(box => box.addEventListener('click', handleColorClick));
  newRoundBtn.addEventListener('click', onNewRoundClick);
  easyBtn.addEventListener('click', () => setMode(3));
  hardBtn.addEventListener('click', () => setMode(6));
  resetStreakBtn.addEventListener('click', resetBestStreak);
}

function loadBestStreak() {
  const s = localStorage.getItem('colorGameBestStreak');
  bestStreak = s ? parseInt(s, 10) || 0 : 0;
}

function saveBestStreak() {
  localStorage.setItem('colorGameBestStreak', String(bestStreak));
}

function generateRandomColor() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  return `rgb(${r}, ${g}, ${b})`;
}

function generateColors(n) {
  const arr = [];
  for (let i = 0; i < n; i++) arr.push(generateRandomColor());
  return arr;
}

function pickCorrectColor(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function setupGame() {
  colors = generateColors(numColors);
  correctColor = pickCorrectColor(colors);
  colorDisplay.textContent = correctColor.toUpperCase();
  // reset header bold on new round
  colorDisplay.style.fontWeight = '';
  isRoundActive = true;
  message(`Pick a color!`);
  // assign colors / hide extras and remove previous glows/shake
  colorBoxes.forEach((box, i) => {
    box.classList.remove('shake');
    box.style.border = 'none';
    box.style.boxShadow = 'none';
    if (i < numColors) {
      box.style.display = 'block';
      box.style.backgroundColor = colors[i];
      box.classList.remove('fade');
      box.style.cursor = 'pointer';
    } else {
      box.style.display = 'none';
    }
  });
  newRoundBtn.textContent = 'New Round';
  document.querySelector('header').style.background = '';
  updateAllDisplays();
}

function handleColorClick(e) {
  if (!isRoundActive) return;
  const box = e.currentTarget;
  const clickedColor = box.style.backgroundColor;
  if (clickedColor === correctColor) {
    handleCorrect(box);
  } else {
    handleWrong(box);
  }
}

function handleCorrect(box) {
  const prevStreak = currentStreak;
  currentStreak++;
  timer += TIME_INC;

  // Correct color glows (yellow border + glow)
  box.style.border = '4px solid gold';
  box.style.boxShadow = '0 0 20px 5px rgba(255,215,0,0.7), inset 0 0 10px rgba(255,255,200,0.3)';
  box.style.transition = 'all 0.3s ease';

  // First win message when streak goes from 0 to 1
  if (currentStreak === 1 && prevStreak === 0) {
    message(`First Win!`, '#00FF00');
    // show the regular +time message after a short delay
    setTimeout(() => message(`Correct! +${TIME_INC}s`, '#4ECDC4'), 900);
  } else if (currentStreak >= 3) {
    // Streak message when streak >= 3
    message(`🔥 Streak! ${currentStreak} 🔥 Correct! +${TIME_INC}s`, '#00FF00');
  } else {
    message(`Correct! +${TIME_INC}s`, '#4ECDC4');
  }

  // update best streak and bold header if new best
  if (currentStreak > bestStreak) {
    bestStreak = currentStreak;
    saveBestStreak();
    colorDisplay.style.fontWeight = 'bold';
  }

  // reveal all as correct
  colorBoxes.forEach(b => {
    if (b.style.display !== 'none') b.style.backgroundColor = correctColor;
  });
  document.querySelector('header').style.background = correctColor;
  isRoundActive = false;
  updateAllDisplays();
  newRoundBtn.textContent = 'Next Round';
  // auto next round shortly
  setTimeout(() => {
    if (hearts > 0 && timer > 0) setupGame();
  }, 1200);
}

function handleWrong(box) {
  hearts = Math.max(0, hearts - 1);
  timer = Math.max(0, timer - TIME_DEC);
  currentStreak = 0;

  // add fade and shake animation class (remove after animation)
  box.classList.add('fade');
  box.style.cursor = 'default';
  box.classList.add('shake');
  setTimeout(() => box.classList.remove('shake'), 700);

  message(`Wrong! -${TIME_DEC}s`, '#FF6B6B');
  updateAllDisplays();
  if (hearts <= 0) {
    gameOver('No hearts left — Game Over!');
  } else if (timer <= 0) {
    gameOver('Time up — Game Over!');
  }
clickedBox.classList.add('shake');

}

function updateAllDisplays(){
  currentStreakDisplay.textContent = currentStreak;
  bestStreakDisplay.textContent = bestStreak;
  heartDisplay.textContent = '❤️'.repeat(hearts) + '🤍'.repeat(MAX_HEARTS - hearts);
  updateTimerInMessage();
}

function message(txt, color = 'white'){
  messageDisplay.style.color = color;
  messageDisplay.dataset.base = txt;
  updateTimerInMessage();
}

function updateTimerInMessage() {
  const base = messageDisplay.dataset.base || '';
  messageDisplay.textContent = base ? `${base} | Time: ${timer}s` : `Time: ${timer}s`;
}

function startTimer() {
  stopTimer();
  timerId = setInterval(() => {
    timer = Math.max(0, timer - 1);
    updateTimerInMessage();
    if (timer <= 0) {
      gameOver('Time up — Game Over!');
    }
  }, 1000);
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
}

function gameOver(reason) {
  stopTimer();
  isRoundActive = false;
  message(reason, '#FF6B6B');
  colorBoxes.forEach(b => (b.style.cursor = 'default'));
  newRoundBtn.textContent = 'Restart';
}

function onNewRoundClick() {
  if (newRoundBtn.textContent === 'Restart') {
    restartAll();
    return;
  }
  if (!isRoundActive) {
    // start next round (keep hearts & timer)
    setupGame();
  } else {
    // if round still active, restart timer and reshuffle
    setupGame();
  }
}

function restartAll() {
  hearts = MAX_HEARTS;
  timer = START_TIMER;
  currentStreak = 0;
  updateAllDisplays();
  setupGame();
  startTimer();
  message('Game restarted. Good luck!');
}

function setMode(n) {
  numColors = n;
  if (n === 3) {
    easyBtn.classList.add('selected');
    easyBtn.style.backgroundColor = 'lightgreen';
    hardBtn.classList.remove('selected');
    hardBtn.style.backgroundColor = '';
  } else {
    hardBtn.classList.add('selected');
    hardBtn.style.backgroundColor = 'lightcoral';
    easyBtn.classList.remove('selected');
    easyBtn.style.backgroundColor = '';
  }
  setupGame();
}

function resetBestStreak() {
  if (!confirm('Reset best streak?')) return;
  bestStreak = 0;
  currentStreak = 0;
  localStorage.removeItem('colorGameBestStreak');
  updateAllDisplays();
  message('Best streak cleared');
  setTimeout(() => message('Pick a color!'), 1200);
}

document.addEventListener('DOMContentLoaded', init);
// ...existing code...