import React from 'react';



import Languages from './Languages';
import Weather from './Weather';


const Country = ({country}) => {

    

    return (
        <div>
            <h2> {country.name}</h2>
            <p>capital {country.capital}</p>
            <p>population {country.population}</p>
            <h3> Languages</h3>
            <Languages languages={country.languages} />
            <img src={country.flag} alt={country.name} width={300} height={200}/>
            <Weather city={country.capital} />
        </div>
        
    )
}

export default Country;