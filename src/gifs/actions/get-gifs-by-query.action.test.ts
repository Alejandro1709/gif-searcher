import { describe, expect, test } from 'vitest'
import { getGifsByQuery } from './get-gifs-by-query.action'
import { giphySearchResponseMock } from '../../../tests/mock/giphy.response.data'
import AxiosMockAdapter from 'axios-mock-adapter'
import { giphyApi } from '../api/giphy.api'

describe('getGifsByQuery', () => {
  const mock = new AxiosMockAdapter(giphyApi)
  // test('Should return a list of gifs', async () => {
  //   const gifs = await getGifsByQuery('goku')
  //   const [gif1] = gifs

  //   expect(gifs.length).toBe(25)

  //   expect(gif1).toStrictEqual({
  //     id: expect.any(String),
  //     height: expect.any(Number),
  //     width: expect.any(Number),
  //     title: expect.any(String),
  //     url: expect.any(String),
  //   })
  // })

  test('Should return a list of gifs', async () => {
    mock.onGet('/search').reply(200, giphySearchResponseMock)

    const gifs = await getGifsByQuery('sillicon valley')

    expect(gifs.length).toBe(25)

    gifs.forEach((gif) => {
      expect(typeof gif.id).toBe('string')
      expect(typeof gif.title).toBe('string')
      expect(typeof gif.url).toBe('string')
      expect(typeof gif.width).toBe('number')
      expect(typeof gif.height).toBe('number')
    })
  })
})
