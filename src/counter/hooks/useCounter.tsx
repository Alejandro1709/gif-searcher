import { useState } from 'react'

const useCounter = (initialCount: number) => {
  const [counter, setCounter] = useState<number>(initialCount)

  const handleAdd = () => {
    setCounter((prev) => prev + 1)
  }

  const handleDec = () => {
    setCounter((prev) => prev - 1)
  }

  const handleReset = () => {
    setCounter(initialCount)
  }

  return {
    counter,
    handleAdd,
    handleDec,
    handleReset,
  }
}

export default useCounter
