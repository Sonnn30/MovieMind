'use client';
import React, { useState } from 'react';
import { words } from './data';
import { genres } from '../genre';

function Search() {
    const [searchTitle, setSearchTitle] = useState('');
    const [searchGenre, setSearchGenre] = useState('');
    const [suggestionsTitle, setSuggestionsTitle] = useState([]);
    const [suggestionsGenre, setSuggestionsGenre] = useState([]);

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
        setSuggestionsTitle(filterSuggestions(value, words));
        }
    };

    const handleSearchGenre = (e) => {
        const value = e.target.value;
        setSearchGenre(value);
        if (value.trim() === '') {
        setSuggestionsGenre([]);
        } else {
        setSuggestionsGenre(filterSuggestions(value, genres));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Search Title:", searchTitle);
        console.log("Search Genre:", searchGenre);
    };

  return (
        <div className="bg-white mx-[12%] lg:mx-[25%] flex items-center justify-center p-8 shadow-[0_0_10px_rgba(0.4,0.4,0.4,0.4)] mb-10">
        <form className="w-full lg:w-[600px] space-y-6 relative" onSubmit={handleSubmit}>

            {/* Input Judul Film */}
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

            {/* Input Genre */}
            <div className="relative">
            <h1 className="text-lg mb-5">Genre</h1>
            <input
                type="search"
                placeholder="Enter movie genre you like..."
                className="w-full p-4 border-2 rounded bg-white outline-none"
                value={searchGenre}
                onChange={handleSearchGenre}
            />
            {suggestionsGenre.length > 0 && (
                <div className="absolute z-10 mt-1 w-full bg-white border shadow-lg rounded-lg max-h-52 overflow-y-auto">
                {suggestionsGenre.map((s, i) => (
                    <div
                    key={i}
                    className="p-2 hover:bg-gray-100 cursor-pointer"
                    onClick={() => {
                        setSearchGenre(s);
                        setSuggestionsGenre([]);
                    }}
                    >
                    {s}
                    </div>
                ))}
                </div>
            )}
            </div>

            {/* Tombol Submit */}
            <div className="bg-black p-4 mt-3 mb-5 pl-[33%] rounded cursor-pointer text-center">
            <button type="submit" className="text-white flex items-center justify-center gap-2">
                <img src="search.svg" alt="Search" className="w-5 h-5" />
                <span>Find Similar Movie</span>
            </button>
            </div>

        </form>
        </div>
  );
}

export default Search;
