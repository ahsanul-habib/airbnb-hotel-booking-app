
'use client'
import { format } from 'date-fns'
import { SlCalender } from "react-icons/sl";
import { Button, DatePicker, Popover, PopoverContent, PopoverAction } from 'keep-react'

const DatePickerComponent = ({label="Select Your Date",date,setDate}) => {
  return (
    <Popover>
      <PopoverAction asChild>
        <Button color="secondary" size="md" className="w-full justify-start text-md gap-1 h-full border border-metal-100" variant="outline">
          <SlCalender size={15} className="text-metal-400 dark:text-white" />
          {date ? format(date ?? new Date(), 'PP') : <span>{label}</span>}
        </Button>
      </PopoverAction>
      <PopoverContent align="start" className="max-w-min border-0">
        <DatePicker dayShape="circle" mode="single" selected={date} onSelect={setDate} showOutsideDays={true} />
      </PopoverContent>
    </Popover>
  )
}


export default DatePickerComponent;