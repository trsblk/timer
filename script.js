// Selecting elements
const header = document.querySelector("header");
const btnConfirm = document.querySelector(".btn-confirm");
const mainSect = document.querySelector("main");
const countEl = document.querySelector(".count");
const btnTimerSet = document.querySelector(".timer-submit");

// Changes

// Functions
setTimeout(function () {
  header.classList.remove("hidden");
}, 2000);

btnConfirm.addEventListener("click", function () {
  mainSect.scrollIntoView({ behavior: "smooth" });
  mainSect.classList.remove("hidden");
});

let intervalTimer;

btnTimerSet.addEventListener("click", function () {
  const userInputSec = Number(document.querySelector(".input-number").value);

  // Calculating remaining seconds
  let sec = userInputSec % 60;

  // Calculating remaining minutes
  let min = Math.trunc(userInputSec / 60);

  // Check if it is a running timer
  if (intervalTimer) clearInterval(intervalTimer);

  // Only positive seconds
  if (userInputSec > 0) {
    // Create timer

    intervalTimer = setInterval(function () {
      countEl.textContent = `${min.toString().padStart(2, "0")}:${sec
        .toString()
        .padStart(2, "0")}`;

      // updating min and seconds
      if (sec === 0 && min !== 0) {
        sec = 60;
        min--;
      }

      // if 00:00 then stop the timer
      if (sec === 0 && min === 0) {
        clearInterval(intervalTimer);
      }
      sec--;
    }, 1000);
  } else {
    countEl.textContent = `00:00`;
  }
});
