import { Checkbox, Label } from "keep-react"

const InputBox = ({label="Label",value=false,onValueChange=()=>console.log("Changed!")}) => {
  return (
    <fieldset className="flex items-center gap-2">
    <Checkbox onCheckedChange={onValueChange} checked={value} id={label} variant="rounded" />
    <Label className="text-black text-md" htmlFor={label}>{label}</Label>
  </fieldset>
  )
}

export default InputBox