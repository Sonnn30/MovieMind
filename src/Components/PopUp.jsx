"use client";
import React, { useEffect, useState } from "react";

function PopUp({ movie, onClose }) {
  const [rating, setRating] = useState("");

  // Load rating dari localStorage saat movie berubah
  useEffect(() => {
    const savedRatings = localStorage.getItem("ratings");
    if (savedRatings) {
      const ratingsObj = JSON.parse(savedRatings);
      const savedRating = ratingsObj[`${movie.id}`];
      if (savedRating) {
        setRating(String(savedRating));
      } else {
        setRating("");
      }
    } else {
      setRating("");
    }
  }, [movie]);

  const closePopup = () => {
    if (rating) {
      let savedRating = localStorage.getItem("ratings");
      if (!savedRating) {
        savedRating = {};
      } else {
        savedRating = JSON.parse(savedRating);
      }

      savedRating[`${movie.id}`] = Number(rating);
      localStorage.setItem("ratings", JSON.stringify(savedRating));
    }
    onClose();
  };

  // Handle perubahan input, validasi angka 0-5
    const handleChange = (e) => {
      const value = e.target.value;

      if (value === '') {
        setRating('');
        return;
      }

      const numeric = Number(value);
      if (!isNaN(numeric) && numeric >= 0 && numeric <= 5) {
        const rounded = Math.round(numeric * 10) / 10;
        setRating(String(rounded));
      }
    };

  return (
    <div className="relative bg-white p-6 rounded-3xl shadow-2xl text-center">
      <button
        onClick={closePopup}
        className="absolute top-3 right-4 text-gray-400 hover:text-black text-lg font-bold"
        aria-label="Close popup"
      >
        ×
      </button>

      <h2 className="text-lg font-semibold mb-4">
        Already watch <br />
        <span className="font-bold">{movie.title}</span>?<br />
        Rate it now!
      </h2>

      <input
        type="number"
        min="0"
        max="5"
        step="0.1" 
        placeholder="Value"
        value={rating}
        onChange={handleChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && rating !== '') {
            alert(`Rating untuk ${movie.title} berhasil disimpan!`);
            onClose();
          }
        }}
        className="w-full px-4 py-2 rounded-2xl border bg-white text-gray-600 text-center"
      />
    </div>
  );
}

export default PopUp;
