var today = new Date();

var date = today.getDate();
var hours = today.getHours();
var mins = today.getMinutes();
var day = today.getDay();

var cutoffDay = 1;
var cutoffHour = 15;
var remainder = 0;
var daysLeft = 0;
var hoursLeft = 0;
var minutesLeft = 0;
var secondsLeft = 0;

futureTime = '2020-12-14 15:00:00:700';
currentTime = '2020-12-12 18:49:52:700';
var remainder = Math.abs(
  new Date(futureTime.replace(/-/g, '/')) -
    new Date(currentTime.replace(/-/g, '/'))
);

// console.log("Diff: ", diff)
// console.log("Seconds: ", diff / 1000)
// console.log("Minutes: ", diff / 60000)
// console.log("Hours: ", diff / 3600000)
// console.log("Days: ", diff / 86400000)

startingSeconds = remainder / 1000;
console.log('----------------');
console.log('----------------');
console.log('Starting Seconds');
console.log(startingSeconds);
console.log('----------------');

// daysLeft = Math.floor(remainder / 86400000)
// console.log("Days Left: ", daysLeft)

// remainder = remainder % 86400000
// console.log("Remainder: ", remainder, " ms")

// hoursLeft = Math.floor(remainder / 3600000)
// console.log("Hours Left: ", hoursLeft)

// remainder = remainder % 3600000
// console.log("Remainder: ", remainder)

// minutesLeft = Math.floor(remainder / 60000)
// console.log("Minutes Left: ", minutesLeft)

// remainder = remainder % 60000
// console.log("Remainder: ", remainder)

// secondsLeft = Math.floor(remainder / 1000)
// console.log("Seconds Left: ", secondsLeft)

// remainder = remainder % 1000
// console.log("Remainder: ", remainder)

// milliseconds / seconds conversions
// ms in 1 sec = 1,000 [ 1 ]
// ms in 1 min / 60 secs = 60,000 [ 60 ]
// ms in 1 hour / 60 mins / 3600 secs = 3,600,000 [ 3,600 ]
// ms in 1 day / 24 hours / 1440 mins / 86,400  = 86,400,000 [ 86,400 ]

// Have an array containing list of dates to avoid
// Also incorporate weekends, so day values 0 and 6

// days, hours, minutes, seconds
var timeRemaining = [0, 0, 0, 0];
// ms conversions for days, hours, minutes, seconds
var conversions = [86400000, 3600000, 60000, 1000];

timeRemaining.forEach(function (t, i) {
  timeRemaining[i] = Math.floor(remainder / conversions[i]);
  remainder = remainder % conversions[i];
});

console.log(timeRemaining);

daysCounter = document.getElementById('remaining-days');
hoursCounter = document.getElementById('remaining-hours');
minutesCounter = document.getElementById('remaining-minutes');
secondsCounter = document.getElementById('remaining-seconds');

setInterval(function () {
  daysCounter.innerText = timeRemaining[0];
  hoursCounter.innerText = timeRemaining[1];
  minutesCounter.innerText = timeRemaining[2];
  secondsCounter.innerText = timeRemaining[3];

  // then put that in a text string, convert to a time, and reduce 1 second each time
  // maybe put in a string first, soon as it's calculated?
  // OR
  // once diff is calculated, convert to days hours mins sec
}, 1000);
