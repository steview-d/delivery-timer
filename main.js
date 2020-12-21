function getTimeRemaining(endtime) {
  const total = Date.parse(endtime) - Date.parse(new Date());
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days,
    hours,
    minutes,
    seconds,
  };
}

function initializeClock(id, endtime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateCountdown() {
    const t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  updateCountdown();
  const timeinterval = setInterval(updateCountdown, 1000);
}

const now = new Date ()
const next = new Date()
// Find a way of getting to NEXT 3pm, be it that day or next

// NEXT 3pm
next.setHours(15);
next.setMinutes(0);
next.setSeconds(0);
if (now - next > 0) {
    next.setDate(next.getDate() +1);
}

// THEN check if it's a weekend
if (next.getDay() == 0) {
    next.setDate(next.getDate() +1)
}
if (next.getDay() == 6) {
    next.setDate(next.getDate() +2)
}

// THEN check if it's a date that should be skipped
datesToAvoid = [
    '2020-12-25', '2021-01-01'
]
console.log("-----------")
console.log(next)
console.log(next.toISOString().replace('T', ' ').slice(0, -5));
console.log('2020-12-14 15:00:00')
console.log("-----------")

const cutoffTimeString = '2020-12-14 15:00:00:700';
// const cutoffTime = new Date(cutoffTimeString.replace(/-/g, '/'))
const cutoffTime = new Date(cutoffTimeString)

console.log(cutoffTime);
initializeClock('countdown', cutoffTime);
