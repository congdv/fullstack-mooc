import React,{useEffect,useState} from 'react';
import axios from 'axios';


const Weather = ({city}) => {
    const [weather, setWeather] = useState({});
    const api = "b6d13afbe91c46d794a134326190809";

    const hook = () => {
        axios.get(`http://api.apixu.com/v1/current.json?key=${api}&q=${city}`).then(response => setWeather(response.data));
      }
    
      
    useEffect(hook,[]);

    const wind = () => {
        if(Object.keys(weather).length >0 ){
            const obj = weather.current;
            const windSpeed = obj.wind_kph;
            const windDirection = obj.wind_dir;
            return (
                <p><b>Wind: </b>{windSpeed} direction {windDirection} </p>
            )
            
        } else {
            return "";
        }
    }

    const condition = () => {
        if(Object.keys(weather).length >0 ){
            const obj = weather.current;
            let icon = "http:" +obj.condition.icon;
            let desc = obj.condition.text;
            return (<img src={icon} alt={desc}/>)
            
        } else {
            return "";
        }
    }
    
    const temperature = () => {
        

        if(Object.keys(weather).length >0 ){
            const obj = weather.current;
            return obj.temp_c;
            
        } else {
            return "";
        }
    }

   
    

    return (
         <div>
            <h2>Weather in {city}</h2>
            <p><b>Temperature: </b>{temperature() === ""? "Loading" : temperature() +" Celcius" } </p>
            {condition()}
            {wind()}
        </div>
    );
}

export default Weather;