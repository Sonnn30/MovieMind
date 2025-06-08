"use client";
import React, { useEffect, useState } from "react";
import SearchResults from "./SearchResults";
import PopUp from "./PopUp";

function Search() {
  const [searchTitle, setSearchTitle] = useState("");
  const [suggestionsTitle, setSuggestionsTitle] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);
  const [selectedTitle, setSelectedTitle] = useState(null);
  const [movies, setMovies] = useState([]); // uncomment ini buat pake data dari backend
  const [selectedMovie, setSelectedMovie] = useState(null);

  const filterSuggestions = (input, list) => {
    const terms = input.toLowerCase().split(" ").filter(Boolean);
    return list
      .filter((word) =>
        terms.every((term) => word.toLowerCase().includes(term))
      )
      .slice(0, 8);
  };

  const handleSearchTitle = (e) => {
    const value = e.target.value;
    setSearchTitle(value);
    if (value.trim() === "") {
      setSuggestionsTitle([]);
    } else {
      setSuggestionsTitle(
        filterSuggestions(
          value,
          movies.map((w) => w.title)
        )
      );
    }
  };

  const getAllRatingsFromLocalStorage = () => {
    let ratings = {};
    const data = localStorage.getItem("ratings") || "";
    if (data) {
      ratings = JSON.parse(data);
    } else {
      ratings["1"] = 0;
    }
    return ratings;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const titleInput = searchTitle.toLowerCase().trim();

    setHasSearched(true);
    setSelectedTitle(null); // reset popup

    const ratings = getAllRatingsFromLocalStorage();
    const requestBody = {
      n_items: 10,
      ratings,
      title: titleInput,
    };
    // fetch backend
    try {
      const res = await fetch("http://127.0.0.1:5000/api/predict", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });
      const data = await res.json();
      setMovies(data.data);
    } catch (err) {
      console.error("Gagal fetch rekomendasi:", err);
    }
  };

  useEffect(() => {
    if (selectedTitle) {
      setSelectedMovie(movies.find((m) => m.title === selectedTitle));
    } else {
      setSelectedMovie(null);
    }
  }, [movies, selectedTitle]);

  return (
    <div>
      <div className="bg-white mx-[12%] lg:mx-[25%] flex flex-col items-center justify-center p-8 shadow-[0_0_10px_rgba(0.4,0.4,0.4,0.4)] mb-10">
        <form
          className="w-full lg:w-[600px] space-y-6 relative"
          onSubmit={handleSubmit}
        >
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
            className="bg-black text-white p-4 mt-3 mb-5 w-full rounded flex items-center justify-center gap-2 cursor-pointer"
          >
            <img src="search.svg" alt="Search" className="w-5 h-5" />
            <span>Find Similar Movie</span>
          </button>
        </form>
      </div>

      <div className="flex flex-col lg:flex-row mx-[12%] lg:mx-[25%] gap-6">
        <div className="flex-1">
          <SearchResults
            results={movies}
            hasSearched={hasSearched}
            setSelectedTitle={setSelectedTitle}
          />
        </div>

        {selectedMovie && (
          <div className="block fixed right-[5%] top-[180px] z-50 w-[280px] lg:right-[5%] lg:top-[180px]">
            <PopUp
              movie={selectedMovie}
              onClose={() => setSelectedTitle(null)}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
