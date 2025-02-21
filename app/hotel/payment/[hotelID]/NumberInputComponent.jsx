'use client'
import { useState } from 'react'
import { Label, NumberInput, NumberInputBox, NumberInputButton } from 'keep-react'
import { FaMinus, FaPlus } from 'react-icons/fa'

export const NumberInputComponent = ({value,changeTo,maxGuests}) => {

  return (
    <fieldset className="space-y-1 flex flex-col">
      {/* <Label>Choose Number</Label> */}
      <h3 className="font-medium">Guests</h3>
      <NumberInput className='w-full max-w-full'>
        <NumberInputButton disabled={value === 0} onClick={() => changeTo(value-1)}>
          <FaMinus size={16} />
        </NumberInputButton>
        <NumberInputBox min={0} max={maxGuests} value={value} onChange={(e) => changeTo(e.target.value)} />
        <NumberInputButton disabled={value === maxGuests} onClick={() => changeTo(value+1)}>
          <FaPlus size={16} />
        </NumberInputButton>
      </NumberInput>
      <p className="text-body-4 font-normal text-metal-600 dark:text-metal-300">Only {maxGuests} guests available</p>
    </fieldset>
  )
}

