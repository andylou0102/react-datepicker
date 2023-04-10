import React, {
  useRef, useEffect, useContext, useCallback, useMemo, useState,
} from 'react'
import { dayjs } from '@/utils/dayjs'
import DatePickerContext from '../contexts/DatePickerContext'
import CloseIcon from './CloseIcon'

interface InputProps {
  setContextRef?: ((ref: React.RefObject<HTMLInputElement>) => void) | null
}

function Input({
  setContextRef = null,
}: InputProps) {
  const {
    changeInputText,
    changeDateValue,
    changeDatePickerValue,
    hideDatePicker,
    disabled,
    calendarContainerRef,
    inputClassName,
    placeholder,
    format,
    inputText,
    size,
  } = useContext(DatePickerContext)

  const buttonRef = useRef<HTMLButtonElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const [currentInputText, setCurrentInputText] = useState('')
  const displayPlaceholder = useMemo(() => placeholder ?? format, [placeholder, format])

  useEffect(() => {
    if (inputRef.current != null && typeof setContextRef === 'function') {
      setContextRef(inputRef)
    }
  }, [setContextRef, inputRef])

  useEffect(() => {
    setCurrentInputText(inputText)
  }, [inputText])

  const getClassName = useCallback(() => {
    const className = typeof inputClassName === 'string' ? inputClassName : ''
    let padding = 'py-10px px-8px'
    if (size === 'sm') {
      padding = 'py-8px px-6px'
    } else if (size === 'lg') {
      padding = 'py-16px px-14px'
    }
    return `year-font relative transition-all duration-300 ${padding} w-full b-1 border-solid border-gray-400 rounded-md tracking-wide text-base placeholder-gray-400 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:border-gray-600 ${className}`
  }, [inputClassName, size])

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputValue = e.target.value
      setCurrentInputText?.(inputValue)
    },
    [setCurrentInputText],
  )

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      const inputValue = e.currentTarget.value
      if (e.key === 'Enter' && dayjs(inputValue, format, true).isValid()) {
        const inputDate = dayjs(inputValue)
        changeDateValue?.(inputDate)
        changeDatePickerValue?.(inputDate)
        changeInputText?.(inputValue)
        hideDatePicker?.()
      }
    },
    [changeDatePickerValue, changeDateValue, changeInputText, format, hideDatePicker],
  )

  useEffect(() => {
    const div = calendarContainerRef?.current
    const input = inputRef?.current

    function showCalendar() {
      if (div?.classList.contains('hidden')) {
        div.classList.remove('hidden', 'translate-y-4', 'opacity-0')
        div.classList.add('block', 'translate-y-0')
      }
    }

    if (div != null && input != null) {
      input.addEventListener('focus', showCalendar)
    }

    return () => {
      if (input != null) {
        input.removeEventListener('focus', showCalendar)
      }
    }
  }, [calendarContainerRef])

  function handleClearInput() {
    changeInputText?.('')
    setCurrentInputText('')
    changeDatePickerValue?.(null)
    changeDateValue?.(null)
  }

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        className={getClassName()}
        disabled={disabled}
        placeholder={displayPlaceholder}
        value={currentInputText}
        autoComplete="off"
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      {currentInputText.length > 0 && (
        <button
          type="button"
          ref={buttonRef}
          disabled={disabled}
          className="absolute right-0 h-full px-3 text-gray-400 focus:outline-none disabled:opacity-40 disabled:cursor-not-allowed"
          onClick={handleClearInput}
        >
          <CloseIcon />
        </button>
      )}
    </>
  )
}

Input.defaultProps = {
  setContextRef: null,
}

export default Input
