// Selecting elements
const header = document.querySelector('header');
const btnConfirm = document.querySelector('.btn-confirm');
const mainSect = document.querySelector('main');
const countEl = document.querySelector('.count');
const btnTimerSet = document.querySelector('.timer-submit');
const inputSec = document.querySelector('.input-number');
const timerBlockRemainingEl = document.querySelector('.block-time-remaining');
const timerBlockEl = document.querySelector('.timer-block');
const timerBlockContainer = document.querySelector('.timer-block--container');

// Global variables
let intervalTimer;
const timerObj = {};

// Functions
const loadTimer = function () {
  countEl.textContent = `00:00`;
  inputSec.value = 0;
};

setTimeout(function () {
  header.classList.remove('hidden');
}, 2000);

const showTimerBlock = function () {
  timerBlockEl.classList.remove('hidden-timer-block');
};

const hideTimerBlock = function () {
  timerBlockEl.classList.add('hidden-timer-block');
};

const activeSetBtn = function () {
  btnTimerSet.classList.add('clicked-btn');
  btnTimerSet.value = `Counting...`;
};

const unactiveSetBtn = function () {
  btnTimerSet.classList.remove('clicked-btn');
  btnTimerSet.value = `Set the timer`;
  inputSec.value = 0;
};

// Event handlers

btnConfirm.addEventListener('click', function () {
  mainSect.scrollIntoView({ behavior: 'smooth' });
  mainSect.classList.remove('hidden');
});

btnTimerSet.addEventListener('click', function () {
  timerObj.seconds = Number(document.querySelector('.input-number').value);

  // User should choose how many timer blocks should it be
  // Test data : 1
  timerObj.blockNum = 2;

  console.log(timerObj);

  // Calculating remaining seconds
  let sec = timerObj.seconds % 60;

  // Calculating remaining minutes
  let min = Math.trunc(timerObj.seconds / 60);

  // Check if it is a running timer
  if (intervalTimer) clearInterval(intervalTimer);

  // Only positive seconds are allowed
  if (timerObj.seconds > 0) {
    // Create timer

    activeSetBtn();
    showTimerBlock();
    intervalTimer = setInterval(function () {
      countEl.textContent = `${min.toString().padStart(2, '0')}:${sec
        .toString()
        .padStart(2, '0')}`;

      // Adding the timer to the block where it should be displayed
      timerBlockRemainingEl.textContent = `${min
        .toString()
        .padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;

      // updating min and seconds
      if (sec === 0 && min !== 0) {
        sec = 60;
        min--;
      }

      // if 00:00 then stop the timer
      if (sec === 0 && min === 0) {
        clearInterval(intervalTimer);
        unactiveSetBtn();
        hideTimerBlock();
      }
      sec--;
    }, 1000);
  } else {
    countEl.textContent = `00:00`;
  }
});

loadTimer();

// const createTimerBlocks = function (number) {
//   for (let i = 0; i < number; i++) {
//     const html = `<div class="timer-block ">
//     <span class="block-number">${i}</span>
//     <span class="block-time-remaining">00:00</span>
//   </div>`;
//     timerBlockContainer.insertAdjacentHTML('beforeend', html);
//   }
// };
