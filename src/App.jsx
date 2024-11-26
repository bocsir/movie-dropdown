import { useEffect, useState } from "react";
import MovieSearch from "./components/MovieSearch";
import PropTypes from "prop-types";

const starWarsMovies = [
  // Original Trilogy
  "Star Wars: Episode IV - A New Hope (1977)",
  "Star Wars: Episode V - The Empire Strikes Back (1980)",
  "Star Wars: Episode VI - Return of the Jedi (1983)",

  // Prequel Trilogy
  "Star Wars: Episode I - The Phantom Menace (1999)",
  "Star Wars: Episode II - Attack of the Clones (2002)",
  "Star Wars: Episode III - Revenge of the Sith (2005)",

  // Sequel Trilogy
  "Star Wars: Episode VII - The Force Awakens (2015)",
  "Star Wars: Episode VIII - The Last Jedi (2017)",
  "Star Wars: Episode IX - The Rise of Skywalker (2019)",

  // Standalone Films
  "Rogue One: A Star Wars Story (2016)",
  "Solo: A Star Wars Story (2018)",
];

const defaultValue = "Star Wars: Episode IV - A New Hope (1977)";

function App() {
  const [selectedValue, setSelectedValue] = useState(defaultValue);
  const [inputValue, setInputValue] = useState("");
  const [currentMovieResults, setCurrentMovieResults] =
    useState(starWarsMovies);

  const handleChange = (newInput) => {
    setInputValue(newInput);
    if (newInput === "") {
      setCurrentMovieResults(starWarsMovies);
    }
  };

  useEffect(() => {
    setInputValue(selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    // Check if inputValue matches any value in the array
    const exactMatch = starWarsMovies.some(
      (movie) => movie.toLowerCase() === inputValue.toLowerCase()
    );

    if (exactMatch) {
      // If inputValue matches a movie, reset the filtered results
      setCurrentMovieResults(starWarsMovies);
    } else {
      // Otherwise, filter the results based on inputValue
      const newMovies = starWarsMovies.filter((movie) =>
        movie.toLowerCase().includes(inputValue.toLowerCase())
      );
      setCurrentMovieResults(newMovies);
    }
  }, [inputValue]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const currentIndex = currentMovieResults.indexOf(selectedValue);
      let nextIndex = currentIndex;

      switch (event.key) {
        case "ArrowUp":
          if (currentIndex === 0) break;
          nextIndex--;
          setSelectedValue(currentMovieResults[nextIndex]);

          break;
        case "ArrowDown":
          if (currentIndex < currentMovieResults.length - 1) nextIndex++;
          setSelectedValue(currentMovieResults[nextIndex]);
          break;
        default:
          break;
      }
    };

    // Attach the event listener
    window.addEventListener("keydown", handleKeyDown);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentMovieResults, selectedValue]); // Empty dependency array ensures this runs only once

  return (
    <>
      <h1 className="text-3xl ml-3 mb-3 text-amber-300">movie search</h1>
      <MovieSearch
        value={inputValue}
        defaultValue={defaultValue}
        onChange={handleChange}
        setSelectedValue={setSelectedValue}
        selectedValue={selectedValue}
        currentMovieResults={currentMovieResults}
      />
    </>
  );
}

MovieSearch.propTypes = {
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  setSelectedValue: PropTypes.func.isRequired,
  currentMovieResults: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default App;
