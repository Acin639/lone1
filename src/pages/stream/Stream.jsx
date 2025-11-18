import React, { useEffect, useState } from 'react'

const API_KEY = 'f43ec82a5f24fe6190891894b7436c7a';
const MOVIE_ID = 843527;

const Stream = () => {
  const [movie, setMovie] = useState(null)
  const [cast, setCast] = useState([])
  const [suggestions, setSuggestions] = useState([])

  useEffect(() => {
    async function load() {
      const res = await fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}?api_key=${API_KEY}&append_to_response=credits`)
      const data = await res.json()
      setMovie(data)
      setCast(data.credits?.cast?.slice(0, 8) || [])

      const rec = await fetch(`https://api.themoviedb.org/3/movie/${MOVIE_ID}/recommendations?api_key=${API_KEY}`)
      const recData = await rec.json()
      setSuggestions(recData.results || [])
    }
    load()
  }, [])

  return (
    <div className="page-root">
      <header className="topbar">GOOJARA.to</header>

      <main className="container">
        <nav className="breadcrumb">Movies → {movie?.title}</nav>

        <section className="video-hero">
          <video controls className="video-el">
            <source src="/blackphone2.mp4" type="video/mp4" />
          </video>
        </section>

        <section className="info-card">
          <h1 className="title">{movie?.title}</h1>
          <div className="meta">
            {movie?.runtime}min | {movie?.genres?.map(g=>g.name).join(', ')} | {movie?.release_date}
          </div>
          <p className="overview">{movie?.overview}</p>
          <div><strong>Director:</strong> {movie?.credits?.crew?.find(c=>c.job==='Director')?.name}</div>
          <div><strong>Cast:</strong> {cast.map(c=>c.name).join(', ')}</div>
        </section>

        <h2 className="suggest-title">Suggestions</h2>
        <div className="suggest-grid">
          {suggestions.map(s => (
            <div key={s.id} className="suggest-item">
              <img src={`https://image.tmdb.org/t/p/w300${s.poster_path}`} />
              <div className="s-title">{s.title}</div>
            </div>
          ))}
        </div>

      </main>
    </div>
  )
}
 export default Stream;