import React, { useCallback, useContext } from 'react'
import type { DateType } from '@/types'
import { dayjs } from '@/utils/dayjs'
import { previousTime, nextTime, formatDate } from '@/utils/common'
import DatePickerContext from '@/contexts/DatePickerContext'

interface Props {
  data: {
    date: DateType
    days: {
      previous: number[]
      current: number[]
      next: number[]
    }
  }
  onClickDay: (day: number, month?: number, y?: number) => void
  onClickPreviousDays: (day: number) => void
  onClickNextDays: (day: number) => void
}

function Days({
  data,
  onClickDay,
  onClickPreviousDays,
  onClickNextDays,
}: Props) {
  const {
    format,
    primaryColor,
    dateValue,
    disabledDate,
  } = useContext(DatePickerContext)

  const isDateDisabled = useCallback(
    (day: number, type: 'previous' | 'current' | 'next' = 'current') => {
      if (disabledDate == null) {
        return false
      }
      const date = {
        previous: previousTime(data.date, 'month'),
        current: data.date,
        next: nextTime(data.date, 'month'),
      }[type]
      const formattedDate = dayjs(`${date.year()}-${date.month() + 1}-${day >= 10 ? day : `0${day}`}`)
      return disabledDate(formattedDate)
    },
    [data.date, disabledDate],
  )

  const isSameDate = useCallback(
    (day: number, value: DateType | null) => {
      if (value == null) {
        return false
      }
      return formatDate(dayjs(`${data.date.year()}-${data.date.month() + 1}-${day}`), format) === formatDate(value, format)
    },
    [data.date, format],
  )

  const currentDaysClass = useCallback(
    (day: number) => {
      const baseClass = 'year-font font-400 text-size-0.75rem h-36px w-36px rounded-full my-2px'
      if (isSameDate(day, dateValue)) {
        return `${baseClass} text-white bg-${primaryColor}`
      }
      if (isSameDate(day, dayjs())) {
        return `${baseClass} current-day-border b-1 hover:bg-day-hover`
      }
      return `${baseClass} hover:bg-day-hover`
    },
    [dateValue, isSameDate, primaryColor],
  )

  return (
    <div className="grid grid-cols-7 px-20px mb-16px">
      {data.days.previous.map((day) => (
        <button
          type="button"
          key={day}
          disabled={isDateDisabled(day, 'previous')}
          className="year-font font-400 text-size-0.75rem h-36px w-36px rounded-full text-gray-400 my-2px hover:bg-day-hover"
          onClick={() => onClickPreviousDays(day)}
        >
          {day}
        </button>
      ))}

      {data.days.current.map((day) => (
        <button
          type="button"
          key={day}
          disabled={isDateDisabled(day)}
          className={currentDaysClass(day)}
          onClick={() => onClickDay(day)}
        >
          {day}
        </button>
      ))}

      {data.days.next.map((day) => (
        <button
          type="button"
          key={day}
          disabled={isDateDisabled(day, 'next')}
          className="year-font font-400 text-size-0.75rem h-36px w-36px rounded-full text-gray-400 my-2px hover:bg-day-hover"
          onClick={() => onClickNextDays(day)}
        >
          {day}
        </button>
      ))}
    </div>
  )
}

export default Days
