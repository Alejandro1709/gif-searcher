import { act, renderHook } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import useGifs from './useGifs'
import * as gifActions from '../actions/get-gifs-by-query.action'

describe('useGifs', () => {
  test('Should return default values and methods', () => {
    const { result } = renderHook(() => useGifs())

    expect(result.current.gifs.length).toBe(0)
    expect(result.current.previousTerms.length).toBe(0)
    expect(result.current.handleSearch).toBeDefined()
    expect(result.current.handleTermClicked).toBeDefined()
  })

  test('Should return a list of gifs', async () => {
    const { result } = renderHook(() => useGifs())

    await act(async () => {
      await result.current.handleSearch('silicon valley')
    })

    expect(result.current.gifs.length).toBe(25)
  })

  test('Should return a list of gifs when handleTermClicked is called', async () => {
    const { result } = renderHook(() => useGifs())

    await act(async () => {
      await result.current.handleTermClicked('silicon valley')
    })

    expect(result.current.gifs.length).toBe(25)
  })

  test('Should return a list of gifs from cache', async () => {
    const { result } = renderHook(() => useGifs())

    await act(async () => {
      await result.current.handleTermClicked('silicon valley')
    })

    expect(result.current.gifs.length).toBe(25)

    vi.spyOn(gifActions, 'getGifsByQuery').mockRejectedValue(
      new Error('This is my custom error')
    )

    await act(async () => {
      await result.current.handleTermClicked('silicon valley')
    })

    expect(result.current.gifs.length).toBe(25) // TO FIX
  })

  test('Should return no more than 8 previous terms', async () => {
    const { result } = renderHook(() => useGifs())

    vi.spyOn(gifActions, 'getGifsByQuery').mockResolvedValue([])

    await act(async () => {
      await result.current.handleSearch('silicon valley 1')
    })

    await act(async () => {
      await result.current.handleSearch('silicon valley 2')
    })

    await act(async () => {
      await result.current.handleSearch('silicon valley 3')
    })

    await act(async () => {
      await result.current.handleSearch('silicon valley 4')
    })

    await act(async () => {
      await result.current.handleSearch('silicon valley 5')
    })

    await act(async () => {
      await result.current.handleSearch('silicon valley 6')
    })

    await act(async () => {
      await result.current.handleSearch('silicon valley 7')
    })

    await act(async () => {
      await result.current.handleSearch('silicon valley 8')
    })

    await act(async () => {
      await result.current.handleSearch('silicon valley 9')
    })

    expect(result.current.previousTerms.length).toBe(8)
    expect(result.current.previousTerms).toStrictEqual([
      'silicon valley 8',
      'silicon valley 7',
      'silicon valley 6',
      'silicon valley 5',
      'silicon valley 4',
      'silicon valley 3',
      'silicon valley 2',
      'silicon valley 1',
    ])
  })
})
