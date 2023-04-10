import { dayjs } from '@/utils/dayjs'

export type DateType = ReturnType<typeof dayjs>

export type WeekDay = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat'

export type BaseColors = 'red' | 'pink' | 'purple' | 'deep-purple' | 'indigo' | 'blue' | 'light-blue' | 'cyan' | 'teal' | 'green' | 'light-green' | 'lime' | 'yellow' | 'amber' | 'orange' | 'deep-orange' | 'brown' | 'grey' | 'blue-grey'

export interface DatePickerType {
  primaryColor?: BaseColors
  value: DateType| null
  disabled?: boolean
  format?: string
  placeholder?: string
  size?: 'lg' | 'md' | 'sm'
  inputClassName?: string
  startWeekOn?: WeekDay
  onChange: (value: DateType | null) => void
  disabledDate?: ((current: DateType) => boolean) | null
}

export interface IconProps {
  className?: string
}
