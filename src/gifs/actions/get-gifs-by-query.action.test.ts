import { describe, expect, test } from 'vitest'
import { getGifsByQuery } from './get-gifs-by-query.action'

describe('getGifsByQuery', () => {
  test('Should return a list of gifs', async () => {
    const gifs = await getGifsByQuery('goku')
    const [gif1] = gifs

    expect(gifs.length).toBe(25)

    expect(gif1).toStrictEqual({
      id: expect.any(String),
      height: expect.any(Number),
      width: expect.any(Number),
      title: expect.any(String),
      url: expect.any(String),
    })
  })
})
