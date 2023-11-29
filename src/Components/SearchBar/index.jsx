import React, { useState, useEffect } from 'react';

const API_URL = "http://localhost:5005"

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchTitles = async () => {
      try {
        const response = await fetch(`${API_URL}/api/posts=${searchQuery}`); // Replace with your API endpoint
        const data = await response.json();
        setSearchResults(data.title); // Assuming the API returns an array of titles
      } catch (error) {
        console.error('Error fetching titles:', error);
        setSearchResults([]);
      }
    };

    // Fetch titles when searchQuery changes
    if (searchQuery.trim() !== '') {
      fetchTitles();
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search by title"
      />
      <div>
        {!searchResults &&
        <div> <p>Error</p>
            </div> }

        {searchResults && 
        <div>
        {searchResults.map((title, index) => (
          <div key={index}>{title}</div>
        ))}
</div> }
      </div> 
    </div>
  );
};

export default SearchBar;
