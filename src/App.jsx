import { useState, useEffect } from "react";
import MovieSearch from "./components/MovieSearch";
import { STAR_WARS_MOVIES, DEFAULT_MOVIE } from "./constants/movies";
import { useMovieFilter } from "./hooks/useMovieFilter";
import { useKeyboardNavigation } from "./hooks/useKeyboardNavigation";

function App() {
  const [selectedValue, setSelectedValue] = useState(DEFAULT_MOVIE);
  
  const { 
    inputValue, 
    setInputValue, 
    filteredMovies 
  } = useMovieFilter(STAR_WARS_MOVIES, DEFAULT_MOVIE);

  // Update inputValue when selectedValue changes
  useEffect(() => {
    setInputValue(selectedValue);
  }, [selectedValue, setInputValue]);

  // Use keyboard navigation hook
  useKeyboardNavigation(
    filteredMovies, 
    selectedValue, 
    setSelectedValue
  );

  return (
    <>
      <h1 className="text-3xl ml-3 mb-3 text-amber-300">movie search</h1>
      <MovieSearch
        value={inputValue}
        defaultValue={DEFAULT_MOVIE}
        onChange={setInputValue}
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
        currentMovieResults={filteredMovies}
      />
    </>
  );
}

export default App;