import React, {
  useCallback, useEffect, useMemo, useRef, useState,
} from 'react'
import type {
  DateType, DatePickerType,
} from '@/types'
import {
  COLORS, DEFAULT_COLOR,
} from '@/constants'
import { dayjs } from '@/utils/dayjs'
import {
  formatDate, previousTime, nextTime,
} from '@/utils/common'
import { useOnClickOutside } from '../composables'
import DatePickerContext from '../contexts/DatePickerContext'
import Input from './Input'
import Calendar from './calendar/Calendar'

function DatePicker({
  primaryColor = DEFAULT_COLOR,
  value = null,
  disabled = false,
  format = 'YYYY-MM-DD',
  placeholder = 'Select date',
  size = 'md',
  inputClassName = '',
  startWeekOn = 'Sun',
  onChange,
  disabledDate = null,
}: DatePickerType) {
  const inputContainerRef = useRef<HTMLDivElement>(null)
  const calendarContainerRef = useRef<HTMLDivElement>(null)
  const [inputText, setInputText] = useState<string>('')
  const [inputRef, setInputRef] = useState(React.createRef<HTMLInputElement>())
  const [date, setDate] = useState<DateType>(dayjs())
  const [dateValue, setDateValue] = useState<DateType | null>(null)

  const hideDatePicker = useCallback(() => {
    const calenderDiv = calendarContainerRef.current
    if (calenderDiv?.classList.contains('block')) {
      calenderDiv.classList.remove('block', 'translate-y-0', 'opacity-1')
      calenderDiv.classList.add('hidden', 'translate-y-4', 'opacity-0')
    }
  }, [])

  useOnClickOutside(inputContainerRef, () => {
    if (inputContainerRef.current != null) {
      if (dateValue != null) {
        setDate(dateValue)
      }
      hideDatePicker()
    }
  })

  const previousMonth = useCallback(() => {
    setDate((prevDate) => previousTime(prevDate, 'month'))
  }, [])

  const nextMonth = useCallback(() => {
    setDate((prevDate) => nextTime(prevDate, 'month'))
  }, [])

  const changeYear = useCallback((year: number) => {
    setDate(dayjs(`${year}-${date.month() + 1}-${date.date()}`))
  }, [date])

  useEffect(() => {
    if (value == null || !value.isValid()) {
      return
    }
    setDateValue(value)
  }, [value])

  useEffect(() => {
    if (dateValue == null) {
      setInputText('')
      return
    }
    setInputText(formatDate(dateValue, format))
  }, [dateValue, format])

  const colorPrimary = useMemo(() => {
    if (COLORS.includes(primaryColor)) {
      return primaryColor
    }
    return DEFAULT_COLOR
  }, [primaryColor])

  const contextValues = useMemo(() => ({
    hideDatePicker,
    changeDatePickerValue: onChange,
    changeInputText: (text: string) => setInputText(text),
    disabledDate,
    changeDateValue: (newDate: DateType | null) => setDateValue(newDate),
    dateValue,
    calendarContainerRef,
    inputClassName,
    format,
    placeholder,
    primaryColor: colorPrimary,
    inputText,
    inputRef,
    disabled,
    size,
    startWeekOn,
    inputContainerRef,
  }), [hideDatePicker, onChange, disabledDate, dateValue, inputClassName, format, placeholder, colorPrimary, inputText, inputRef, disabled, size, startWeekOn])
  return (
    <DatePickerContext.Provider value={contextValues}>
      <div
        className="relative w-300px text-black"
        ref={inputContainerRef}
      >
        <Input setContextRef={setInputRef} />
        <div
          className="transition-all ease-out duration-300 absolute b z-10 mt-1px text-sm lg:text-xs 2xl:text-sm translate-y-4 opacity-0 hidden"
          ref={calendarContainerRef}
        >
          <Calendar
            date={date}
            onClickPrevious={previousMonth}
            onClickNext={nextMonth}
            changeYear={changeYear}
          />
        </div>
      </div>
    </DatePickerContext.Provider>
  )
}

export default DatePicker
