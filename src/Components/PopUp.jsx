'use client';
import React, { useEffect, useState } from 'react';

function PopUp({ movie, onClose }) {
  const [rating, setRating] = useState('');
  const [recommendations, setRecommendations] = useState([]);

  // Ambil rating sebelumnya (jika ada)
useEffect(() => {
  const savedRating = localStorage.getItem(`rating-${movie.title}`);
  console.log(`Dari localStorage: rating-${movie.title} =`, savedRating);
  if (savedRating) {
    setRating(savedRating);
  }
}, [movie]);


  // Simpan rating setiap kali berubah
  useEffect(() => {
    if (rating !== '') {
      localStorage.setItem(`rating-${movie.title}`, rating);
      fetchRecommendations(); // Panggil prediksi langsung setelah simpan
    }
  }, [rating, movie]);

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d{0,2}$/.test(value)) {
      const numeric = parseInt(value, 10);
      if (value === '' || (numeric >= 0 && numeric <= 10)) {
        setRating(value);
      }
    }
  };

  // Ambil semua rating dari localStorage
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

  // Kirim ke backend
  const fetchRecommendations = async () => {
    const ratings = getAllRatingsFromLocalStorage();
    const requestBody = {
      n_items: 3,
      ratings: ratings,
    };

    try {
      const res = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      setRecommendations(data);
    } catch (err) {
      console.error('Gagal kirim ke backend:', err);
    }
  };

  return (
    <div className="relative bg-white p-6 rounded-3xl shadow-2xl text-center">
      {/* Tombol X */}
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

      {recommendations.length > 0 && (
        <div className="mt-4">
          <h3 className="text-md font-semibold mb-2">Recommendations for you:</h3>
          <ul className="text-sm text-gray-700 space-y-1">
            {recommendations.map((item, index) => (
              <li key={index}>• {item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default PopUp;
