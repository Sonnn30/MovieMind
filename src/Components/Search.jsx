'use client';
import React, { useState, useEffect } from 'react';
// import { movies as moviesData } from './data'; // data.js untuk debug, comment aja kalau pakai backend
import SearchResults from './SearchResults';
import PopUp from './PopUp';

function Search() {
  const [searchTitle, setSearchTitle] = useState('');
  const [searchGenre, setSearchGenre] = useState('');
  const [suggestionsTitle, setSuggestionsTitle] = useState([]);
  const [suggestionsGenre, setSuggestionsGenre] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [movies, setMovies] = useState([]); // pakai backend jadi state ini diisi hasil fetch

  useEffect(() => {
    // Fetch data dari backend saat komponen mount
    fetch('/api/movies')  // ganti URL ini sesuai API-mu
      .then(res => res.json())
      .then(data => {
        setMovies(data);
      })
      .catch(err => {
        console.error('Failed to fetch movies from backend:', err);
        // Kalau mau debug pakai data.js uncomment ini:
        // setMovies(moviesData);
      });
  }, []);

  const filterSuggestions = (input, list) => {
    const terms = input.toLowerCase().split(' ').filter(Boolean);
    return list.filter(word =>
      terms.every(term => word.toLowerCase().includes(term))
    ).slice(0, 8);
  };

  const handleSearchTitle = (e) => {
    const value = e.target.value;
    setSearchTitle(value);
    if (value.trim() === '') {
      setSuggestionsTitle([]);
    } else {
      setSuggestionsTitle(filterSuggestions(value, movies.map(w => w.title)));
    }
  };

  const handleSearchGenre = (e) => {
    const value = e.target.value;
    setSearchGenre(value);
    if (value.trim() === '') {
      setSuggestionsGenre([]);
    } else {
      // Asumsikan kamu punya list genre statis
      const genres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Romance']; 
      setSuggestionsGenre(filterSuggestions(value, genres));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const titleInput = searchTitle.toLowerCase().trim();
    const genreInput = searchGenre.toLowerCase().trim();

    const filtered = movies.filter(movie => {
      const titleMatch = movie.title.toLowerCase().includes(titleInput);
      const genreMatch = movie.genre.toLowerCase().includes(genreInput);
      return titleMatch && genreMatch;
    });

    setFilteredResults(filtered);
    setHasSearched(true);
    setSelectedMovie(null); // reset pop up saat pencarian baru
  };

  return (
    <div>
      <div className="bg-white mx-[12%] lg:mx-[25%] flex flex-col items-center justify-center p-8 shadow-[0_0_10px_rgba(0.4,0.4,0.4,0.4)] mb-10">
        <form className="w-full lg:w-[600px] space-y-6 relative" onSubmit={handleSubmit}>
          {/* Input Judul */}
          <div className="relative">
            <h1 className="text-lg mb-5 mt-7">Movie Title</h1>
            <input
              type="search"
              placeholder="Enter a movie name you like..."
              className="w-full p-4 border-2 rounded bg-white outline-none"
              value={searchTitle}
              onChange={handleSearchTitle}
            />
            {suggestionsTitle.length > 0 && (
              <div className="absolute z-10 mt-1 w-full bg-white border shadow-lg rounded-lg max-h-52 overflow-y-auto">
                {suggestionsTitle.map((s, i) => (
                  <div
                    key={i}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                      setSearchTitle(s);
                      setSuggestionsTitle([]);
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Tombol Submit */}
          <button
            type="submit"
            className="bg-black text-white p-4 mt-3 mb-5 w-full rounded flex items-center justify-center gap-2 hover: cursor-pointer"
          >
            <img src="search.svg" alt="Search" className="w-5 h-5" />
            <span>Find Similar Movie</span>
          </button>
        </form>
      </div>

      {/* Hasil dan Popup dibungkus flex */}
      <div className="flex flex-col lg:flex-row mx-[12%] lg:mx-[25%] gap-6">
        <div className="flex-1">
          <SearchResults
            results={filteredResults}
            hasSearched={hasSearched}
            onMovieClick={(movie) => {
              if (selectedMovie?.title === movie.title) {
                return; // kalau klik movie yg sama, gak perlu buka popup baru
              }
              setSelectedMovie(null);
              setTimeout(() => {
                setSelectedMovie(movie);
              }, 0);
            }}
          />
        </div>
        {selectedMovie && (
          <div className="block fixed right-[5%] top-[180px] z-50 w-[280px] lg:right-[5%] lg:top-[180px]">
            <PopUp movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
