import PropTypes from "prop-types";
import { useState, useEffect, useRef } from "react";

const MovieSearch = ({
  value,
  defaultValue,
  onChange,
  selectedValue,
  setSelectedValue,
  currentMovieResults,
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleBlur = (e) => {
    // Check if the blur event is related to the dropdown
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Enter") {
        setIsFocused(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  useEffect(() => {
    if (isFocused) {
      inputRef.current.focus();
    } else {
      inputRef.current.blur();
    }
  }, [isFocused]);

  return (
    <div className="ml-3" onBlur={handleBlur}>
      <div className="flex flex-col gap-2">
        <label htmlFor="movie-search" className="text-lg">
          select a movie:
        </label>
        <input
          ref={inputRef}
          name="movie-search"
          className="text-black pl-2 text-xl font-bold h-10"
          type="text"
          value={isFocused || value.length > 0 ? value : defaultValue}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          style={{
            width: `${Math.max(value.length, defaultValue.length) + 1}ch`,
          }}
        />
      </div>
      {isFocused && (
        <ul className="">
          {currentMovieResults.map((movie, idx) => (
            <li
              key={idx}
              className={`${
                idx !== currentMovieResults.length - 1 ? "" : "border-b"
              } border-t border-r border-l w-96 text-left hover:text-amber-400 transition-colors duration-100`}
            >
              <button
                onClick={() => setSelectedValue(movie)}
                className={`${
                  movie === selectedValue ? "text-amber-400" : ""
                } pl-2 pr-2 text-left`}
              >
                {movie}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

MovieSearch.propTypes = {
  value: PropTypes.string.isRequired,
  defaultValue: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  selectedValue: PropTypes.string.isRequired,
  setSelectedValue: PropTypes.func.isRequired,
  currentMovieResults: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default MovieSearch;
