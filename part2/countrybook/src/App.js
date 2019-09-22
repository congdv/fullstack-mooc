import React,{useState,useEffect} from 'react';
import axios from 'axios';

import Country from './components/Country';
import Countries from './components/Countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [countriesFilter, setCountriesFilter] = useState([]);
  

  const hook = () => {
    axios.get("https://restcountries.eu/rest/v2/all").then(response => setCountries(response.data));
  }

  
  useEffect(hook,[]);

  const handleLookUpOnChange = (event) => {
    const filterList = countries.filter(country => country.name.toLowerCase().indexOf(event.target.value) !== -1
    && event.target.value !== "");
    setCountriesFilter(filterList);
  }
  
  const rows = () => {
    if(countriesFilter.length > 10){
      return (
        <div>Too many matches, specify another filter</div>
      )
    } else if(countriesFilter.length > 1) {
      return (<Countries countries={countriesFilter} />)
    } else if (countriesFilter.length > 0) {
      return (<Country country={countriesFilter[0]} />)
    } else {
      return (<div>Cannot find this country</div>)
    }
  }
  

  return (
    <div>
      <form>
        find countries 
        <input onChange={handleLookUpOnChange}/>
      </form>
      {rows()}
    </div>
  )
}

export default App;
