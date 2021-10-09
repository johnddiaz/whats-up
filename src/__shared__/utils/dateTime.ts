const MILLIS_IN_SEC = 1000
const SECS_IN_MIN = 60
const MINS_IN_HOUR = 60
const MILLIS_IN_HOUR = MILLIS_IN_SEC * SECS_IN_MIN * MINS_IN_HOUR
const MILLIS_IN_MIN = MILLIS_IN_SEC * SECS_IN_MIN
const HOURS_IN_DAY = 24

export function convertToMillis({
    days,
    hours,
    mins,
    secs,
    millis,
}: Partial<
    Record<'days' | 'hours' | 'mins' | 'secs' | 'millis', number>
>): number {
    let runningVal = 0
    if (days) {
        runningVal += days * HOURS_IN_DAY * MILLIS_IN_HOUR
    }
    if (hours) {
        runningVal += hours * MILLIS_IN_HOUR
    }
    if (mins) {
        runningVal += mins * MILLIS_IN_MIN
    }
    if (secs) {
        runningVal += secs * MILLIS_IN_SEC
    }
    if (millis) {
        runningVal += millis
    }
    return runningVal
}

export function convertToSecs({
    millis,
}: Partial<Record<'millis', number>>): number {
    let runningVal = 0
    if (millis) {
        runningVal += millis / MILLIS_IN_SEC
    }
    return runningVal
}
