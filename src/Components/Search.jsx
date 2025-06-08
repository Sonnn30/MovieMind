'use client';
import React, { useState, useEffect } from 'react';
import SearchResults from './SearchResults';
import PopUp from './PopUp';

import { movies as localMovies } from './data';

function Search() {
  const [searchTitle, setSearchTitle] = useState('');
  const [suggestionsTitle, setSuggestionsTitle] = useState([]);
  const [results, setResults] = useState([]); // hanya satu state
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  // const [movies, setMovies] = useState([]); // uncomment ini buat pake data dari backend

  // Kalau mau pakai fetch backend, uncomment ini dan comment out import
  /*
  useEffect(() => {
    fetch('/api/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error('Failed to fetch movies:', err));
  }, []);
  */

  // comment atau hapus aja pas pake data dari backend
  const movies = localMovies;

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

  const getAllRatingsFromLocalStorage = () => {
    const ratings = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith('rating-')) {
        const title = key.replace('rating-', '');
        const score = parseFloat(localStorage.getItem(key));
        if (!isNaN(score)) {
          ratings.push({ title, rating: score });
        }
      }
    }
    return ratings;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleInput = searchTitle.toLowerCase().trim();

    const filtered = movies.filter(movie =>
      movie.title.toLowerCase().includes(titleInput)
    );

    setResults(filtered);
    setHasSearched(true);
    setSelectedTitle(null); // reset popup

    const ratings = getAllRatingsFromLocalStorage();
    const requestBody = {
      n_items: 3,
      ratings,
    };

    // fetch backend 
    /*
    try {
      const res = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      console.log('Rekomendasi dari backend:', data);
    } catch (err) {
      console.error('Gagal fetch rekomendasi:', err);
    }
    */
  };

  const selectedMovie = results.find(m => m.title === selectedTitle);

  return (
    <div>
      <div className="bg-white mx-[12%] lg:mx-[25%] flex flex-col items-center justify-center p-8 shadow-[0_0_10px_rgba(0.4,0.4,0.4,0.4)] mb-10">
        <form className="w-full lg:w-[600px] space-y-6 relative" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="bg-black text-white p-4 mt-3 mb-5 w-full rounded flex items-center justify-center gap-2"
          >
            <img src="search.svg" alt="Search" className="w-5 h-5" />
            <span>Find Similar Movie</span>
          </button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row mx-[12%] lg:mx-[25%] gap-6">
        <div className="flex-1">
          <SearchResults
            results={results}
            hasSearched={hasSearched}
            onMovieClick={(movie) => {
              setSelectedTitle(movie.title);
            }}
          />
        </div>

        {selectedMovie && (
          <div className="block fixed right-[5%] top-[180px] z-50 w-[280px] lg:right-[5%] lg:top-[180px]">
            <PopUp movie={selectedMovie} onClose={() => setSelectedTitle(null)} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;

