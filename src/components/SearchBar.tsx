import React, { useState, useEffect } from "react";
import { fetchCitySuggestions } from "../api/geoDB";

interface SearchBarProps {
  onSearch: (city: string) => void;
}

interface City {
  id: string;
  name: string;
  region: string;
  country: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState("");
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    if (city.trim() !== "") {
      fetchCitySuggestions(city).then(setSuggestions).catch(console.error);
    } else {
      setSuggestions([]);
    }
  }, [city]);

  const handleSearch = (selectedCity: string) => {
    setCity(selectedCity);
    setShowSuggestions(false);
    onSearch(selectedCity);
  };

  return (
    <div className="mb-4 relative">
      <input
        type="text"
        value={city}
        onChange={(e) => {
          setCity(e.target.value);
          setShowSuggestions(true);
        }}
        placeholder="Enter city name"
        className="px-4 py-2 border rounded w-full"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border rounded w-full mt-1 max-h-40 overflow-y-auto">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              onClick={() =>
                handleSearch(
                  `${suggestion.name}, ${suggestion.region}, ${suggestion.country}`
                )
              }
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            >
              {suggestion.name}, {suggestion.region}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
      <button
        onClick={() => handleSearch(city)}
        className="px-4 py-2 bg-blue-500 text-white rounded mt-2 w-full"
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
