'use client';
import React, { useEffect, useState } from 'react';

function PopUp({ movie, onClose }) {
  const [rating, setRating] = useState('');

  useEffect(() => {
    const savedRating = localStorage.getItem(`rating-${movie.title}`);
    if (savedRating) {
      setRating(savedRating);
    }
  }, [movie]);

  useEffect(() => {
    if (rating === '') return;

    try {
      const savedRatings = localStorage.getItem('ratings');
      const ratingsObj = savedRatings ? JSON.parse(savedRatings) : {};
      ratingsObj[`rating-${movie.title}`] = Number(rating);
      localStorage.setItem('ratings', JSON.stringify(ratingsObj));
    } catch (error) {
      console.error('Failed to save ratings to localStorage:', error);
    }
  }, [rating, movie.title]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      const numeric = parseInt(value, 10);
      if (value === '' || (numeric >= 0 && numeric <= 10)) {
        setRating(value);
      }
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-3xl shadow-2xl text-center">
      <button
        onClick={onClose}
        className="absolute top-3 right-4 text-gray-400 hover:text-black text-lg font-bold"
        aria-label="Close popup"
      >
        ×
      </button>

      <h2 className="text-lg font-semibold mb-4">
        Already watch <br /><span className="font-bold">{movie.title}</span>?<br />Rate it now!
      </h2>

      <input
        type="text"
        placeholder="Value"
        value={rating}
        onChange={handleChange}
        className="w-full px-4 py-2 rounded-2xl border bg-white text-gray-600 text-center"
      />
    </div>
  );
}

export default PopUp;
