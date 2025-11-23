import React, { useState, useEffect } from 'react';
import SearchBar from '../../components/searcher/SearchBar.jsx';
import Results from '../../components/searcher/Results.jsx';
import './Search.css';

const API = "https://api.themoviedb.org/3/search/movie?api_key=f43ec82a5f24fe6190891894b7436c7a&query=";

const Search = () => {
  const [query, setQuery] = useState("Avatar");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetch(API + query)
      .then(res => res.json())
      .then(data => setMovies(data.results || []));
  }, [query]);

  return (
    <>
      <div className="topbar">
        <div className="left-section">
          <div className="logo"></div>
          <div className="brand">MovieBox</div>
        </div>

        <div className="right-icons">
          <img src="../../assets/arrow_left.png" className="icon" alt="search" />
          <img src="/icons/clock.svg" className="icon" alt="clock" />
        </div>
      </div>

      <SearchBar query={query} setQuery={setQuery} />
      <Results movies={movies} />
    </>
  );
}
export default Search;
