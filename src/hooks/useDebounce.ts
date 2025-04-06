import { useRef } from 'react'

type Callback<T> = (args: T) => void

function useDebounce<T>(callback: Callback<T>, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const debouncedFunction = (args: T) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      callback(args)
    }, delay)
  }

  return debouncedFunction
}

export default useDebounce
