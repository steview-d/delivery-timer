const leadTime = 1;
const now = new Date();
var next = new Date();

// Daily cut off time
const cutoffTimeHours = 15; // The hour, in 24HR clock format
const cutoffTimeMinutes = 0; // Minutes - value between 0 and 59

// set 'next' var time to cutoff time
next.setHours(cutoffTimeHours);
next.setMinutes(cutoffTimeMinutes);
next.setSeconds(0);

const nonDespatchDays = ['2020-12-25', '2021-01-04'];

/**
 * @param {*} cutoffTime - Calculate and return the time remaining between 'cutoffTime' and now.
 */
function getTimeRemaining(cutoffTime) {
  const total = Date.parse(cutoffTime) - Date.parse(new Date());
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

/**
 * Set up the clock
 * @param {*} id - The ID of the element to update
 * @param {*} cutoffTime - The future date time to count down towards
 */
function initializeClock(id, cutoffTime) {
  const clock = document.getElementById(id);
  const daysSpan = clock.querySelector('.days');
  const hoursSpan = clock.querySelector('.hours');
  const minutesSpan = clock.querySelector('.minutes');
  const secondsSpan = clock.querySelector('.seconds');

  function updateCountdown() {
    const t = getTimeRemaining(cutoffTime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  const timeinterval = setInterval(updateCountdown, 1000);
  updateCountdown();
}

/**
 * Convert a new Date() object to an ISO String formatted date
 * @param {object} dateObject
 * @param {bool} time - Include time, or not
 */
function convertDateTimeToIsoString(dateObject, time = false) {
  let timeStr = time == true ? -9 : 10;
  return dateObject.toISOString().replace('T', ' ').slice(0, timeStr);
}

/**
 * Get and return the next valid despatch date
 */
function getNextDespatchDate(nextDespatchDate) {
  let isWeekend = false;
  let isNonDespatchDay = false;

  // Check if current despatch date is a weekend
  if (nextDespatchDate.getDay() == 6 || nextDespatchDate.getDay() == 0) {
    isWeekend = true;
    nextDespatchDate.setDate(nextDespatchDate.getDate() + 1);
  }

  // Check if current despatch date is a non-despatch day
  if (nonDespatchDays.includes(convertDateTimeToIsoString(nextDespatchDate))) {
    console.log('FOUND A DATE TO AVOID!!!');
    isNonDespatchDay = true;
    nextDespatchDate.setDate(nextDespatchDate.getDate() + 1);
  }

  if (isWeekend == true || isNonDespatchDay == true) {
    nextDespatchDate = getNextDespatchDate(nextDespatchDate);
  }

  return nextDespatchDate;
}

// if cutoff time has passed for today, set cutoff day to tomorrow
if (now - next > 0) {
  next.setDate(next.getDate() + 1);
}

next = getNextDespatchDate(next);

const nextCutoff = convertDateTimeToIsoString(next, true);

initializeClock('countdown', nextCutoff);

// Debugging //
console.log('-----------');
console.log(next);
console.log(nextCutoff);
console.log('-----------');
