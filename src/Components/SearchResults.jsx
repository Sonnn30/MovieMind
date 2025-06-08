import React, { useState } from 'react';

function SearchResults({ results, hasSearched, onMovieClick }) {
  if (!hasSearched) return null;

  if (results.length > 0) {
    return (
      <div className="w-full max-w-[700px] mt-8 mx-auto px-4">
        <ul className="space-y-6 flex flex-col items-center">
          {results.map((movie, index) => (
            <MovieItem key={index} movie={movie} onClick={() => onMovieClick(movie)} />
          ))}
        </ul>
      </div>
    );
  }

  return (
    <p className="mt-6 text-gray-500 italic text-center">
      No matching movies found.
    </p>
  );
}

function MovieItem({ movie, onClick }) {
  const [showDetails, setShowDetails] = useState(false);

  const handleClick = () => {
    setShowDetails(!showDetails);
    onClick(); // Kirim movie ke Search
  };

  return (
    <li
      className="w-[600px] lg:w-[780px] p-4 border rounded-2xl shadow bg-gray-50 cursor-pointer transition-all"
      onClick={handleClick}
      aria-expanded={showDetails}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') handleClick();
      }}
    >
      <div className={`transition-all duration-500 ease-in-out ${showDetails ? 'max-h-[1000px]' : 'max-h-[80px] overflow-hidden'}`}>
        {!showDetails ? (
          <>
            <p className="text-[14px] text-center mb-2">{movie.title}</p>
            <p className="text-sm text-gray-700 text-center font-medium">
              {new Date(movie.release_date).getFullYear()} | {movie.genre} | {movie.rating}
            </p>
          </>
        ) : (
          <div className="text-left text-sm text-gray-800 space-y-1 mt-1">
            <p><strong>Title:</strong> {movie.title}</p>
            <p><strong>Genre:</strong> {movie.genre}</p>
            <p><strong>Release date:</strong> {movie.release_date}</p>
            <p><strong>Rating:</strong> {movie.rating}</p>
            <p><strong>Duration:</strong> {movie.duration}</p>
            <p><strong>Overview:</strong> {movie.overview}</p>
            <p><strong>Cast:</strong> {movie.cast}</p>
          </div>
        )}
      </div>
    </li>
  );
}

export default SearchResults;


