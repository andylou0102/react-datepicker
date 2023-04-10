// https://davidpiesse.github.io/tailwind-md-colours/
import type { BaseColors, WeekDay } from '@/types'

export const COLORS: BaseColors[] = [
  'red',
  'pink',
  'purple',
  'deep-purple',
  'indigo',
  'blue',
  'light-blue',
  'cyan',
  'teal',
  'green',
  'light-green',
  'lime',
  'yellow',
  'amber',
  'orange',
  'deep-orange',
  'brown',
  'grey',
  'blue-grey',
]

export const DEFAULT_COLOR: BaseColors = 'indigo'

export const BORDER_COLOR: {
  focus: Record<BaseColors, string>
} = {
  focus: {
    red: 'focus:border-red-500',
    pink: 'focus:border-pink-500',
    purple: 'focus:border-purple-500',
    'deep-purple': 'focus:border-deep-purple-500',
    indigo: 'focus-visible:border-indigo-500',
    blue: 'focus:border-blue-500',
    'light-blue': 'focus:border-light-blue-500',
    cyan: 'focus:border-cyan-500',
    teal: 'focus:border-teal-500',
    green: 'focus:border-green-500',
    'light-green': 'focus:border-light-green-500',
    lime: 'focus:border-lime-500',
    yellow: 'focus:border-yellow-500',
    amber: 'focus:border-amber-500',
    orange: 'focus:border-orange-500',
    'deep-orange': 'focus:border-deep-orange-500',
    brown: 'focus:border-brown-500',
    grey: 'focus:border-grey-500',
    'blue-grey': 'focus:border-red-500',
  },
}

export const CALENDAR_SIZE = 42

export const WEEK_DAYS: WeekDay[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
