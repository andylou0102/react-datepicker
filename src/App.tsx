import React from 'react'
import { DatePicker } from '.'
import { dayjs } from './utils/dayjs'

function App() {
  return (
    <div className="w-300px">
      <DatePicker
        value={dayjs()}
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}

export default App
