import React, { useState } from 'react';
import '../css/MovieSelectionModal.css'
import '../App.css'

function MovieSelectionModal({
  isOpen,
  onClose,
  movies,
  query,
  onSelectMovie
}) {

  if (!isOpen) return null;


  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Выберите фильм для "{query}"</h2>
        <p>Найдено: {movies.length} фильмов</p>

        <div className="movies-list">
          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              onClick={() => onSelectMovie(movie.imdbID)
              }
              className="movie-card"
            >
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : '/my-app/public/CameraMovie.svg'}
                alt={movie.Title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3>{movie.Title} ({movie.Year})</h3>
              </div>
            </div>
          ))}
          {/* <div onClick={() => onSelectMovie(selectedMovie)}>{movieDetailsJSX}</div> */}
        </div>
        <button className="modal-cancel-btn" onClick={onClose}>
          Отмена
        </button>

      </div>
    </div >
  );
}

export default MovieSelectionModal;