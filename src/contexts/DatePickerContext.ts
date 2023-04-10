import React, { createContext } from 'react'
import type {
  DateType, BaseColors, WeekDay,
} from '@/types'

interface ContextStore {
  hideDatePicker: (() => void) | null
  changeDatePickerValue: ((value: DateType | null) => void) | null
  changeInputText: ((text: string) => void) | null
  disabledDate: ((current: DateType) => boolean) | null
  changeDateValue: ((value: DateType | null) => void) | null
  dateValue: DateType | null
  calendarContainerRef: React.RefObject<HTMLDivElement> | null
  inputClassName: string
  format: string
  placeholder: string
  primaryColor: BaseColors
  inputText: string
  inputRef: React.RefObject<HTMLInputElement> | null
  disabled: boolean
  size: 'sm' | 'md' | 'lg'
  startWeekOn: WeekDay
  inputContainerRef: React.RefObject<HTMLDivElement> | null
}

const DatePickerContext = createContext<ContextStore>({
  disabledDate: () => false,
  changeDateValue: null,
  dateValue: null,
  calendarContainerRef: null,
  changeInputText: null,
  hideDatePicker: null,
  changeDatePickerValue: null,
  inputClassName: '',
  format: 'YYYY-MM-DD',
  placeholder: 'Select date',
  primaryColor: 'indigo',
  inputText: '',
  inputRef: null,
  disabled: false,
  size: 'md',
  startWeekOn: 'Sun',
  inputContainerRef: null,
})

export default DatePickerContext
