const now = new Date();

// store the date of the next potential date of despatch
var next = new Date();

// Daily cut off time
const cutoffTimeHours = 15; // The hour, in 24HR clock format
const cutoffTimeMinutes = 0; // Minutes - value between 0 and 59

// set 'next' var time to cutoff time
next.setHours(cutoffTimeHours);
next.setMinutes(cutoffTimeMinutes);
next.setSeconds(0);

// List all dates that orders will NOT be despatched from the warehouse,
// other than weekends, which are automatically skipped
const nonDespatchDays = [
  '2021-01-04',
  '2021-01-05',
  '2021-01-06',
  '2021-01-07',
];

// Set whether or not the warehouse will despatch goods on a weekend.
const saturdayDespatch = false;
const sundayDespatch = false;

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
  const timer = document.getElementById(id);
  const daysSpan = timer.querySelector('.days');
  const hoursSpan = timer.querySelector('.hours');
  const minutesSpan = timer.querySelector('.minutes');
  const deliverySpan = timer.querySelector('.delivery');

  function updateCountdown() {
    const t = getTimeRemaining(cutoffTime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);

    if (t.total <= 0) {
      clearInterval(timeinterval);
    }
  }

  deliverySpan.innerHTML =
    formatDeliveryDate(deliveryDate) + addDateSuffix(deliveryDate);
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
 * @param {object} nextDespatchDate - The next possible date of despatch, before checking for
 *                                    weekends and non-despatch dates
 */
function getNextDespatchDate(nextDespatchDate) {
  let isWeekend = false;
  let isNonDespatchDay = false;

  // Check if current despatch day is a Saturday
  if (nextDespatchDate.getDay() == 6 && saturdayDespatch == false) {
    isWeekend = true;
  }

  // Check if current despatch day is a Sunday
  if (nextDespatchDate.getDay() == 0 && sundayDespatch == false) {
    isWeekend = true;
  }

  // Check if current despatch date is a non-despatch day
  if (nonDespatchDays.includes(convertDateTimeToIsoString(nextDespatchDate))) {
    isNonDespatchDay = true;
  }

  if (isWeekend == true || isNonDespatchDay == true) {
    nextDespatchDate.setDate(nextDespatchDate.getDate() + 1);
    nextDespatchDate = getNextDespatchDate(nextDespatchDate);
  }

  return nextDespatchDate;
}

/**
 * Get and return the next valid delivery date
 * @param {object} nextDeliveryDate - The first possible date of delivery, before checking for
 *                                    weekends.
 */
function getNextDeliveryDate(nextDeliveryDate) {
  deliveryDate = new Date(nextDeliveryDate.getTime());
  deliveryDate.setDate(deliveryDate.getDate() + 1);

  // Check if current despatch date is a weekend
  if (deliveryDate.getDay() == 6 || deliveryDate.getDay() == 0) {
    deliveryDate = getNextDeliveryDate(deliveryDate);
  }

  return deliveryDate;
}

/**
 *
 * @param {*} dateStr
 */
function formatDeliveryDate(dateStr) {
  var date = new Date(dateStr);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

/**
 * Return the correct date suffix (st, nd, rd, th) depending on date
 * @param {*} dateStr
 */
function addDateSuffix(dateStr) {
  var date = new Date(dateStr);
  d = date.toLocaleDateString('en-US', {
    day: 'numeric'
  });

  const nth = function (d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  };
  return nth();
}

// if cutoff time has passed for today, set cutoff day to tomorrow
if (now - next > 0) {
  next.setDate(next.getDate() + 1);
}

next = getNextDespatchDate(next);
var despatchDate = new Date(next.getTime());
var deliveryDate = getNextDeliveryDate(next);

initializeClock('delivery-timer', next);

// Debugging //
console.log('-----------');
console.log('NEXT: ', despatchDate);
console.log('DELIVERY: ', deliveryDate);
console.log('-----------');
console.log('Day Name: ', formatDeliveryDate(deliveryDate));
