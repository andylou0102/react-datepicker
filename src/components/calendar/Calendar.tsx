import React, {
  useCallback, useEffect, useMemo, useState, useContext,
} from 'react'
import type { DateType } from '@/types'
import { dayjs } from '@/utils/dayjs'
import { CALENDAR_SIZE } from '@/constants'
import { useOnClickOutside } from '@/composables'
import {
  classNames,
  formatDate,
  getDaysInMonth,
  getLastDaysInMonth,
  previousTime,
  nextTime,
  getFirstDayInMonth,
  getDifferenceInDays,
  getFirstDaysInMonth,
} from '@/utils/common'
import DatePickerContext from '@/contexts/DatePickerContext'
import Years from './Years'
import ChevronIcon from './ChevronIcon'
import Week from './Week'
import Days from './Days'

interface Props {
  date: DateType
  onClickPrevious: () => void
  onClickNext: () => void
  changeYear: (year: number) => void
}

function Calendar({
  date,
  onClickPrevious,
  onClickNext,
  changeYear,
}: Props) {
  const {
    format,
    startWeekOn,
    inputContainerRef,
    changeDatePickerValue,
    hideDatePicker,
    changeDateValue,
  } = useContext(DatePickerContext)

  const [showYears, setShowYears] = useState(false)
  const [year, setYear] = useState(date.year())

  useEffect(() => {
    setYear(date.year())
  }, [date])

  useOnClickOutside(inputContainerRef, () => {
    inputContainerRef?.current != null && setShowYears(false)
  })

  const clickYear = useCallback(
    (yearNum: number) => {
      changeYear(yearNum)
      setShowYears(false)
    },
    [changeYear],
  )

  const previous = useCallback(() => getLastDaysInMonth(
    previousTime(date, 'month'),
    getDifferenceInDays(getFirstDayInMonth(date).ddd, startWeekOn),
  ), [date, startWeekOn])

  const current = useCallback(() => getDaysInMonth(formatDate(date, format)), [date, format])

  const next = useCallback(() => getFirstDaysInMonth(
    dayjs(date),
    CALENDAR_SIZE - (previous().length + current().length),
  ), [current, date, previous])

  const clickDay = useCallback(
    (day: number, month = date.month() + 1, y = date.year()) => {
      const fullDate = dayjs(`${y}-${month}-${day}`)
      changeDateValue?.(fullDate)
      changeDatePickerValue?.(fullDate)
      hideDatePicker?.()
    },
    [changeDatePickerValue, changeDateValue, date, hideDatePicker],
  )

  const clickPreviousDays = useCallback(
    (day: number) => {
      const newDate = previousTime(date, 'month')
      clickDay(day, newDate.month() + 1, newDate.year())
      onClickPrevious()
    },
    [clickDay, date, onClickPrevious],
  )

  const clickNextDays = useCallback(
    (day: number) => {
      const newDate = nextTime(date, 'month')
      clickDay(day, newDate.month() + 1, newDate.year())
      onClickNext()
    },
    [clickDay, date, onClickNext],
  )

  const calendar = useMemo(() => ({
    date,
    days: {
      previous: previous(),
      current: current(),
      next: next(),
    },
  }), [current, date, next, previous])

  return (
    <div className="flex flex-col w-320px max-h-358px date-container-shadow bg-white b-rd-4px calendar-text-color">
      <div className="mt-16px mb-8px pl-24px pr-12px flex items-center max-h-30px min-h-30px">
        <div
          className="flex gap-5px items-center mr-auto cursor-pointer"
          aria-hidden="true"
          onClick={() => {
            setShowYears(!showYears)
          }}
        >
          <div className="font-500 text-size-1rem year-font">
            {calendar.date.format('MMM YYYY')}
          </div>
          <button
            type="button"
            className="p-5px calendar-button  hover:calendar-button-hover w-24px h-24px rounded-full"
          >
            <div className={classNames('triangle-down', 'transition-all', showYears && 'transform-rotate-180deg')} />
          </button>
        </div>
        {!showYears && (
          <div className="flex items-center">
            <button
              type="button"
              className="rounded-full hover:bg-day-hover"
              onClick={onClickPrevious}
            >
              <ChevronIcon />
            </button>
            <div className="w-24px" />
            <button
              type="button"
              className="rounded-full hover:bg-day-hover"
              onClick={onClickNext}
            >
              <ChevronIcon className="w-5 h-5 transform-rotate-180deg" />
            </button>
          </div>
        )}
      </div>
      {showYears && <Years year={year} clickYear={clickYear} />}
      {!showYears && (
        <div className="block relative">
          <Week />
          <Days
            data={calendar}
            onClickPreviousDays={clickPreviousDays}
            onClickDay={clickDay}
            onClickNextDays={clickNextDays}
          />
        </div>
      )}
    </div>
  )
}

export default Calendar
