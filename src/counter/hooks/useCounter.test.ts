import { act, renderHook } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import useCounter from './useCounter'

describe('useCounter', () => {
  test('Should initialize with default value of 5', () => {
    const { result } = renderHook(() => useCounter())

    expect(result.current.counter).toBe(5)
  })

  test('Should initialize with value of 20', () => {
    const initialValue = 20

    const { result } = renderHook(() => useCounter(initialValue))

    expect(result.current.counter).toBe(initialValue)
  })

  test('Should increment counter when handleAdd is called', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.handleAdd()
    })

    expect(result.current.counter).toBe(6)
  })

  test('Should decrement counter when handleDec is called', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.handleDec()
    })

    expect(result.current.counter).toBe(4)
  })

  test('Should reset counter when handleReset is called', () => {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.handleDec()
    })

    act(() => {
      result.current.handleDec()
    })

    act(() => {
      result.current.handleReset()
    })

    expect(result.current.counter).toBe(5)
  })
})
