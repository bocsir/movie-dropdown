import { useState, useEffect } from 'react';

export const useMovieFilter = (movies, initialInput = '') => {
  const [inputValue, setInputValue] = useState(initialInput);
  const [filteredMovies, setFilteredMovies] = useState(movies);

  useEffect(() => {
    if (inputValue === "") {
      setFilteredMovies(movies);
      return;
    }

    // Check if inputValue matches any value in the array exactly
    const exactMatch = movies.some(
      (movie) => movie.toLowerCase() === inputValue.toLowerCase()
    );

    if (!exactMatch) {
      // Filter the results based on inputValue
      const newMovies = movies.filter((movie) =>
        movie.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredMovies(newMovies);
    }
  }, [inputValue, movies]);

  return {
    inputValue,
    setInputValue,
    filteredMovies,
  };
};
