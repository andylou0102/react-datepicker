import React, {
  useMemo, useContext, useRef, useEffect,
} from 'react'
import { classNames } from '@/utils/common'
import DatePickerContext from '@/contexts/DatePickerContext'
import { dayjs } from '@/utils/dayjs'

interface Props {
  year: number
  clickYear: (year: number) => void
}

function Years({
  year,
  clickYear,
}: Props) {
  const { primaryColor } = useContext(DatePickerContext)
  const yearList = useMemo(() => Array.from({ length: 100 }, (_, i) => (i < 50 ? year - 50 + i : year + i - 50)), [year])
  const yearContainerRef = useRef<HTMLDivElement>(null)
  useEffect(
    () => {
      const currentYearLevel = Math.ceil((yearList.findIndex((y) => y === year) + 1) / 4)
      const distance = currentYearLevel * 36
      if (yearContainerRef.current != null) {
        yearContainerRef.current.scrollTop = distance
      }
    },
  )
  return (
    <div
      className="block relative overflow-auto"
      ref={yearContainerRef}
    >
      <div className="w-full h-full grid grid-cols-4">
        {yearList.map((y) => (
          <button
            className={
              classNames(...([
                'year-font', 'font-400', 'text-size-base', 'h-36px', 'w-72px', 'b-rd-18px', 'my-8px',
                year !== y && 'hover:calendar-button-hover',
                year !== y && y === dayjs().year() && 'current-day-border b-1',
                year === y && [`bg-${primaryColor}`, 'text-white', `hover:bg-${primaryColor}-600`]].flat()))
            }
            type="button"
            key={y}
            onClick={() => clickYear(y)}
          >
            {y}
          </button>
        ))}
      </div>
    </div>

  )
}

export default Years
