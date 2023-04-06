import './App.css';
import React, {useState} from 'react';


function App() {
  return (
    <>
      <div className="app" >
        <div className='head'>
          <img className='logo'src='logo.png' alt='logo'/>
            GitHub Profile Searcher
        </div>
       
        <div className="card">
          <SearchForm/>
        </div>
      </div>
    </>
    
  );
}


export function User(props){

  return(

    <div className='card2' >
      <div className='card2-left'>
      <img className='image'src={props.src} alt={'$props.name}avatar'}/>
      <p className='name' >{props.name}</p> 
      </div>
      <div className='card2-right'>
        <a className='name' href={props.link}><button  className='btn'>Visit Profile</button></a>
      </div>
      
    </div>
  )

}

export function SearchForm()
{
   
  const [search, setSearch] = useState("");
  const [results , setResult] = useState([]);
 
  
    const handleChange=(e)=>{
        setSearch(e.target.value);
    }

    const handleSearch=async(e)=>{
      e.preventDefault();
      const myDiv = document.getElementById('error');
      if(search==="")
      {
        myDiv.textContent = 'Enter a User!';
      }
      else{
        const response = await fetch(`https://api.github.com/search/users?q=${search}`);
        const data = await response.json();
        setResult(data.items);
        setSearch("")
        myDiv.textContent = '';
      }
      
      
      
            
    }

  return (
    <>
    <div className='card'>

      <form className="form" onSubmit={handleSearch}>
          <input 
          type='text'
          className="search" 
          placeholder='Serach User'
          onChange={handleChange}
          value={search}/>
          <button   type='submit' className="search-btn"> Search</button> 
      </form>
      <ul className='list'>
          <p className='error' id='error'></p>
          {results.map((user)=> <User key={user.id} src={user.avatar_url} name={user.login} link={user.html_url} />)}
      </ul>

      </div>
    </>
    
    
  )

}

export default App;
