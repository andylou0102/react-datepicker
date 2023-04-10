import type { DateType, WeekDay } from '@/types'
import type { QUnitType } from 'dayjs'
import { dayjs } from './dayjs'

export const formatDate = (date: DateType, format: string) => date.format(format)

export const previousTime = (date: string | DateType, unit: QUnitType) => dayjs(date).subtract(1, unit)

export const nextTime = (date: string | DateType, unit: QUnitType) => dayjs(date).add(1, unit)

export const classNames = (...classes: (string | boolean)[]) => classes.filter(Boolean).join(' ')

export const getLastElementsInArray = <T>(array: T[], size: number) => {
  if (size >= array.length) {
    return array
  }
  return array.slice(array.length - size, array.length)
}

export const getDaysInMonth = (date: string | DateType) => {
  const daysInMonth = dayjs(date).daysInMonth()
  if (!Number.isNaN(daysInMonth)) {
    return Array.from({ length: daysInMonth }, (_, i) => i + 1)
  }
  return []
}

export const getFirstDayInMonth = (date: string | DateType) => {
  const day = dayjs(date).startOf('month')
  return {
    ddd: formatDate(day, 'ddd') as WeekDay,
    object: day,
  }
}

export const getDifferenceInDays = (day: WeekDay, startWeekOn: WeekDay) => {
  const days = {
    Sun: 0,
    Mon: 1,
    Tue: 2,
    Wed: 3,
    Thu: 4,
    Fri: 5,
    Sat: 6,
  }
  return (days[day] - days[startWeekOn] + 7) % 7
}

export const getLastDaysInMonth = (date: string | DateType, size: number) => getLastElementsInArray(getDaysInMonth(date), size)

export const getFirstDaysInMonth = (date: string | DateType, size: number) => getDaysInMonth(date).slice(0, size)
