import React,{useState} from 'react';
import Country from './Country';

const Countries = ({countries}) => {
    const showFlags = new Array(countries.length).fill(false);
    const [showCountry, setShowCountry] = useState(showFlags);
    const [flag,setFlag] = useState(false);

    const setToShowCountry = (i) => {
        let showFlagsObj = showCountry;
        console.log("Befor",showFlagsObj[i]);
        showFlagsObj[i] = !showFlagsObj[i];
        console.log("After",showFlagsObj[i]);

        setShowCountry(showFlagsObj);
        console.log("Clicked",i," flag ",showCountry[i]," Flaggggg",showFlags[i]);
        console.log(showCountry);
        setFlag(!flag);
    }
    
    return countries.map((country,i) => {
        return (
            <div key={i}>
                <span> {country.name}</span><button onClick={() => setToShowCountry(i)}>{showCountry[i] ? "Hide":"Show"}</button>
                { showCountry[i]? (<Country country={country} />) : "" }
            </div>
        )
        
    });
}

export default Countries;