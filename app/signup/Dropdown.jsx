import { Select, SelectAction, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectValue } from 'keep-react'
import { FaRegUser } from "react-icons/fa";

export default function SelectComponent() {
  return (
    <div className='w-full flex items-center justify-center mb-2'>

    <Select className="w-full" required={true}>
      <SelectAction className="w-[20rem]">
        <div className="flex items-center gap-1">
          <span>
            <FaRegUser className="h-4 w-4" />
          </span>
          <SelectValue placeholder="Select your role" />
        </div>
      </SelectAction>
      <SelectContent className='w-full'>
        <SelectGroup>
          <SelectItem value="Host">Host</SelectItem>
          <SelectItem value="Guest">Guest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
  )
}
