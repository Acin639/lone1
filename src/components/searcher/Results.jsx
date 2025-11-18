
import React from 'react';

export default function Results({movies}) {
  return (
    <div className="results-box">
      {movies.map(movie => (
        <div key={movie.id} className="result-item">
          <img src="/icons/search.svg" className="result-icon" alt="" />
          {movie.title}
        </div>
      ))}
    </div>
  );
}
