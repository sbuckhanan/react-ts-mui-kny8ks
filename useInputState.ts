import { useState, useEffect, RefObject } from 'react';

export type Value = string

export const useInputState = (ref: RefObject<HTMLInputElement>) => (initialValue: string) => {
  const [value, setValue] = useState(initialValue)

  useEffect(() => {
    ref.current.value = value
  })

  return [value, setValue] as [Value, React.Dispatch<Value>]
}
