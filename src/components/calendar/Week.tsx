import React, { useContext, useMemo } from 'react'
import type { WeekDay } from '@/types'
import { WEEK_DAYS } from '@/constants'
import DatePickerContext from '@/contexts/DatePickerContext'

function Week() {
  const { startWeekOn } = useContext(DatePickerContext)

  const weekDays = useMemo(() => {
    const startIndex = WEEK_DAYS.findIndex((day) => day === startWeekOn)
    const res: WeekDay[] = []
    for (let i = 0; i < WEEK_DAYS.length; i++) {
      if (i < startIndex) {
        res.unshift(WEEK_DAYS[i])
      } else {
        res.push(WEEK_DAYS[i])
      }
    }
    return res
  }, [startWeekOn])

  return (
    <div className="flex items-center justify-center">
      {weekDays.map((day) => (
        <div
          key={day}
          className="year-font font-400 text-size-0.75rem h-40px w-36px mx-2px flex items-center calendar-week-color justify-center"
        >
          {day}
        </div>
      ))}
    </div>
  )
}

export default Week
