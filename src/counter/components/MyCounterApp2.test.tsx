import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import MyCounterApp from './MyCounterApp'
// import useCounter from '../hooks/useCounter'

vi.mock('../hooks/useCounter', () => ({
  useCounter: () => ({
    counter: 5,
    handleAdd: vi.fn(),
    handleDec: vi.fn(),
    handleReset: vi.fn(),
  }),
}))

describe('MyCounterApp', () => {
  test('Should render the component', () => {
    render(<MyCounterApp />)

    expect(screen.getByRole('heading', { level: 1 }).innerHTML).toContain(
      `Counter: 5`
    )

    expect(screen.getByRole('button', { name: '+1' })).toBeDefined()
    expect(screen.getByRole('button', { name: '-1' })).toBeDefined()
    expect(screen.getByRole('button', { name: 'Reset' })).toBeDefined()
  })
})
