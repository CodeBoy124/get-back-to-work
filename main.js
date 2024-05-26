/** @type {"select"|"timer"|"productive"} */
let screen = "select";

const screenElements = {
  select: document.getElementById('select'),
  timer: document.getElementById('timer'),
  productive: document.getElementById('productive'),
}

function setScreen(targetScreen) {
  screen = targetScreen
  Object.values(screenElements).forEach(element => element.classList.remove('active'))
  screenElements[targetScreen].classList.add('active')
}

function action(targetScreen, callback) {
  return () => {
    if (screen !== targetScreen) return;
    callback();
  }
}

// state
let totalTime = 0;

// timer screen
const timer = {
  countdown: document.getElementById('timer-countdown'),
}

let timerInterval;

function formatSecondsToTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = seconds % 60;
  const secondsLeftFormatted = secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft;
  return `${minutes}:${secondsLeftFormatted}`;
}

function activateTimer() {
  timer.countdown.innerText = formatSecondsToTime(totalTime)
  timerInterval = setInterval(() => {
    totalTime -= 1
    if (totalTime <= 0) {
      clearInterval(timerInterval)
      setScreen('select')
      return;
    }
    timer.countdown.innerText = formatSecondsToTime(totalTime)
  }, 1000)
}

// select screen
const select = {
  zero: document.getElementById('select-zero'),
  five: document.getElementById('select-five'),
  fifteen: document.getElementById('select-fifteen'),
}

function selectDoZero() {
  setScreen('productive')
}

function selectDoFive() {
  totalTime = 60 * 5
  setScreen('timer')
  activateTimer()
}

function selectDoFifteen() {
  totalTime = 60 * 15
  setScreen('timer')
  activateTimer()
}

select.zero.addEventListener('click', action('select', selectDoZero))
select.five.addEventListener('click', action('select', selectDoFive))
select.fifteen.addEventListener('click', action('select', selectDoFifteen))

// productive screen
const productive = {
  break: document.getElementById('productive-break'),
}

function productiveBreak() {
  setScreen('select')
}

productive.break.addEventListener('click', action('productive', productiveBreak))