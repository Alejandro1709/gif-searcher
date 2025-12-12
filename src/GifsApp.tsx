import { mockGifs } from './mock-data/gifs.mock'

const GifsApp = () => {
  return (
    <>
      {/* Header */}
      <div className="content-center">
        <h1>Buscador de Gifs</h1>
        <p>Descubre y comparte el gif perfecto</p>
      </div>

      {/* Search */}
      <div className="search-container">
        <input type="text" placeholder="Buscar Gifs" />
        <button>Buscar</button>
      </div>

      {/* Busquedas Previas */}
      <div className="previous-searches">
        <h2>Busquedas Previas</h2>

        <ul className="previous-searches-list">
          <li>Goku</li>
          <li>Saitama</li>
          <li>Elder Ring</li>
        </ul>
      </div>

      {/* Gifs */}
      <div className="gifs-container">
        {mockGifs.map((gif) => (
          <div className="gif-card" key={gif.id}>
            <img src={gif.url} alt={gif.title} />
            <h3>{gif.title}</h3>
            <p>
              {gif.width}x{gif.height} (1.5mb)
            </p>
          </div>
        ))}
      </div>
    </>
  )
}

export default GifsApp
