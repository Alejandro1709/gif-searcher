interface PreviousSearchesProps {
  searches: string[]
}

const PreviousSearches = ({ searches }: PreviousSearchesProps) => {
  return (
    <div className="previous-searches">
      <h2>Busquedas Previas</h2>

      <ul className="previous-searches-list">
        {searches.map((term) => (
          <li key={term}>{term}</li>
        ))}
      </ul>
    </div>
  )
}

export default PreviousSearches
