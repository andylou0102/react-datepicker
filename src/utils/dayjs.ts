import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import weekYear from 'dayjs/plugin/weekYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isBetween from 'dayjs/plugin/isBetween'
import quarterOfYear from 'dayjs/plugin/quarterOfYear'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(weekYear)
dayjs.extend(weekOfYear)
dayjs.extend(advancedFormat)
dayjs.extend(isBetween)
dayjs.extend(quarterOfYear)

export { dayjs }
