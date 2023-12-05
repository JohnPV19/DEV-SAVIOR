import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; // Import Axios for making API requests
import '/src/Components/SearchBar/index.css'
const API_URL = "http://localhost:5005";


function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);


  const handleSearch = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    onSearch(value); // Pass the search term to the parent component or function
  };


  const handleSaveSearch = () => {
    // Use the 'searchTerm' variable wherever you need it.
    console.log('Saved search term:', searchTerm);
    // Perform other actions with the searchTerm variable as needed.
  };


  // Fetch suggestions based on the user's input
useEffect(() => {
  const fetchSuggestions = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/search?query=${searchTerm}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  // Fetch suggestions only if there's a non-empty search term
  if (searchTerm.trim() !== '') {
    fetchSuggestions();
  } else {
    setSuggestions([]); // Clear suggestions if the search term is empty
  }
}, [searchTerm]);


return (
  <div id="searchContainer">
  <label htmlFor="searchInput">Search:</label>
  <input
    type="text"
    id="searchInput"
    value={searchTerm}
    onChange={handleSearch}
    placeholder="Type your search here"
  />

  {suggestions.length > 0 && (
    <div id="suggestionsContainer">
      {suggestions.map((suggestion, index) => (
        <div className="suggestion" key={index}>
          <Link to={`/api/posts/${suggestion._id}`}>
            <div>
              <h3>{suggestion.title}</h3>
              <p>{suggestion.bodyText}</p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )}

  <button onClick={handleSaveSearch} id="submitButton">
    <span style={{ textDecoration: 'none', color: 'white' }}>
      <Link to={`/searchResult/${searchTerm}`}>Submit</Link>
    </span>
  </button>
</div>
);
}

export default SearchBar;
