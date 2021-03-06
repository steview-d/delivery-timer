# Delivery Timer
Simple JS script to calculate delivery cut off times
<br><br>

## Usage Instructions
<small>(work in progress)</small>

Call the script from any page to add an element that displays how much time remains to place an order, and on what day it can be expected to arrive.
<br><br>

## The following data should be provided

`cutoffTimeHours` - A value between 0 and 23 for the cut off hour

`cutoffTimeMinutes` - A value between 0 and 59 for the cut off minutes

`nonDespatchDays` - A list of dates that orders will not be despatched on. Weekends are automatically excluded and do not need adding to this list. Format like the example below.

```
['2021-01-04', '2021-01-05', '2021-01-06', '2021-01-07']
```

`saturdayDespatch` - Set to false (default) if the warehouse does not despatch orders on a Saturday.

`sundayDespatch` - Set to false (default) if the warehouse does not despatch orders on a Sunday.
<br><br>

## The following data will be returned

`despatchDate` - The earliest date an order will be despatched from the warehouse.

`deliveryDate` - The date the despatched order can be expected to arrive. Currently set to the day after despatch, accounting for weekends.

These are returned as `Date` objects and can be used for countdowns and whatnot.
<br><br>

## Countdown Timer
`initializeClock(id, cutoffTime)` populates the element referenced by `id` with a countdown to show how long left to order, based on the 'cutoffTime' value and also shows an expected delivery date, based on a 1 day lead time with no weekend deliveries.

