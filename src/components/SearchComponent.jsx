import React, { useState } from 'react';
import MovieSelectionModal from './MovieSelectionModal';

const VITE_API_KEY = import.meta.env.VITE_APP_OMDB_API_KEY;

const url = `http://www.omdbapi.com/?apikey=${VITE_API_KEY}&`;

// Добавить общий поиск
// Поиск с помехой
// Модульное окно с предложениями
// сделать отзывчивое для разных устройств


function MovieForm() {
    const [searchTerm, setSearchTerm] = useState('');
    const [movie, setMovies] = useState([]);
    const [searchType, setSearchType] = useState('search');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState('');


    const searchMovies = async () => {
        try {
            const query = searchTerm.trim();
            if (!query) {
                console.log("Введите название фильма");
                return;
            } else {
                console.log(searchType)
                const response = await fetch(`${url}t=${encodeURIComponent(query)}`);

                console.log(response)
                if (!response.ok) {
                    alert('Фильмы не найдены. Попробуйте другой запрос.');
                    throw new Error('Network response was not ok')
                }
                const data = await response.json();
                console.log('Data:', data);
                setMovies(data);
                setSearchTerm(''); // Запоминаем запрос
            }
        }
        catch (error) {
            console.error('Error:', error);
            return { Response: 'False', Error: error.message }
        }

    };

    const handleFuzzySearch = async (query) => {
        if (!query.trim()) return;

        try {
            const response = await fetch(
                `${url}s=${encodeURIComponent(query)}`
            );
            const data = await response.json();
            console.log(data)

            if (data.Response === 'True') {
                setMovies(data.Search);
                console.log(data)// Сохраняем список фильмов
                setSearchTerm(query); // Запоминаем запрос
                setIsModalOpen(true); // Открываем модальное окно
            } else {
                alert('Фильмы не найдены. Попробуйте другой запрос.');
            }
        } catch (error) {
            console.error('Ошибка поиска:', error);
            alert('Ошибка сети или API.');
        }
    };


    return (
        <div>
            <header className="app-header">
                <h1>🎬 OMDB Movie Search</h1>
                <p className="subtitle">Поиск фильмов на английском языке</p>

                <div className="search-container">
                    <div className="search-box">
                        <input
                            type="text"
                            value={searchTerm}
                            onKeyUp={(e) => {
                                if (e.key === 'Enter') searchMovies(searchTerm); // Enter = точный поиск
                            }}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Введите название на английском (например: Titanic)"
                            className="search-input"
                        />
                        <button
                            onClick={searchMovies}
                            className="search-btn"
                        >
                            🔍 Найти
                        </button>
                        {movie?.imdbID && (
                            <div className='movie-card'>
                                <div className='movie-column'>
                                    <h2>{movie.Title} ({movie.Year})</h2>
                                </div>
                                <div className='movie-column'>
                                    <img id="movie-poster" src={movie.Poster} alt="" />
                                    <div className="movie-block">
                                        <img id="movie-poster-mbl" src={movie.Poster} alt="" />
                                        <p id='plot'>{movie.Plot}</p>
                                        <div>
                                            <p id="rate" className='movie-box-p'>⭐ <span>{movie.imdbRating}</span></p>
                                            <div className='movie-box'>
                                                <p className='movie-box-p'><span>Actors:</span> {movie.Actors}</p>
                                                <p className='movie-box-p'><span>Time:</span> {movie.Runtime}</p>
                                                <p className='movie-box-p'><span>Awards:</span> {movie.Awards}</p>
                                            </div>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        )}
                        {searchTerm && (<button className="button-cd" onClick={() => handleFuzzySearch(searchTerm)}>
                            Найти все варианты
                        </button>)}
                        <MovieSelectionModal
                            isOpen={isModalOpen}
                            onClose={() => setIsModalOpen(false)}
                            movies={movie}
                            query={searchTerm}
                        // onSelectMovie={}
                        />
                    </div>
                </div>
            </header >
        </div >
    )
}


export default MovieForm;