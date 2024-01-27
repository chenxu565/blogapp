import { useState } from 'react'

export const useField = (string) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => setValue('')

  return [
    {
      id: string,
      placeholder: string,
      type: string,
      value,
      onChange,
    },
    reset,
  ]
}
