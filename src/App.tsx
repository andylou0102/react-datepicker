import React from 'react'
import { DatePicker } from '.'
import { dayjs } from './utils/dayjs'

function App() {
  return (
    <div className="w-300px mt-30px m-auto">
      <DatePicker
        value={dayjs()}
        onChange={(date) => console.log(date)}
      />
    </div>
  )
}

export default App
