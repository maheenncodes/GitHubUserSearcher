import React, { useState } from 'react'

const SearchForm = ({Show}) => {

    const [search, setSearch] = useState("");
    const [results , setResult] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange=(e)=>{
        setSearch(e.target.value);
    }

    const handleSearch=async(e)=>{
        e.preventDefault();
        
        setIsLoading(true);

        try {
          const response = await fetch(`https://api.github.com/users/${search}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setResult([data]);
        } catch (error) {
          console.error('There was a problem fetching data:', error);
          setResult([]);
        } finally {
          setIsLoading(false);
        }
           
            setSearch("")
            Show(results);
        }

  return (
    <form className="form">
        <input 
        type='text'
        className="search" 
        placeholder='Serach User'
        onChange={handleChange}
        value={search}/>
        <button disabled={isLoading} onClick={handleSearch} type='submit' className="search-btn"> {isLoading ? 'Searching...' : 'Search'}</button>

    </form>
  )
}

export default SearchForm
