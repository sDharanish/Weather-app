import React, { useState } from 'react'
import './Weatherapp.css';
import search_icons from '../Asserts/search.png'
import clear_icons from '../Asserts/clear.png'
import cloud_icons from '../Asserts/cloud.png'
import drizzle_icons from '../Asserts/drizzle.png'
import humidity_icons from '../Asserts/humidity.png'
import rain_icons from '../Asserts/rain.png'
import snow_icons from '../Asserts/snow.png'
import wind_icons from '../Asserts/wind.png'

export const Weatherapp = () => {

    let api_key = "3c440121c2ea1cf73745d78135eade0d";
    const [icons , seticons ] = useState(cloud_icons);

    const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()}/${current.getFullYear()}`;

    const search = async() =>{
        const element = document.getElementsByClassName('cityinput');
        if(element[0].value === ""){
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`;
        let response = await fetch(url);
        let data = await response.json();
        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const tempature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        humidity[0].innerHTML = data.main.humidity + "%";
        wind[0].innerHTML = Math.floor(data.wind.speed) + "Km/hr";
        tempature[0].innerHTML = Math.floor (data.main.temp) + "°C" ;
        location[0].innerHTML = data.name;

        if(data.weather[0].icon === "01d" || data.weather[0].icon  === "01n"){
                seticons(clear_icons);
        }else if(data.weather[0].icon === "02d" || data.weather[0].icon  === "02n"){
            seticons(cloud_icons);
        }else if(data.weather[0].icon === "03d" || data.weather[0].icon  === "03n"){
            seticons(drizzle_icons);
        }else if(data.weather[0].icon === "04d" || data.weather[0].icon  === "04n"){
            seticons(drizzle_icons);
        }else if(data.weather[0].icon === "09d" || data.weather[0].icon  === "09n"){
            seticons(rain_icons);
        }else if(data.weather[0].icon === "10d" || data.weather[0].icon  === "10n"){
            seticons(rain_icons);
        }else if(data.weather[0].icon === "13d" || data.weather[0].icon  === "13n"){
            seticons(snow_icons);
        }else{
            seticons(clear_icons);
        }


    

    };
  return (
    <div className='container'>
        <div className='top-bar'>
            <input type="text" className='cityinput' placeholder='Search...' />
            <div className='search_icon' onClick={search}>
                <img src={search_icons} alt="search-bar" />

            </div>

        </div>
        
        
        <div className='weather-image'>
        
            <img src={icons} alt="" />
        </div>
        <p>{date}</p>
        <div className='weather-temp'>24 &#8451;</div>
        <div className='weather-location'>London</div>
        <div className='data-cointainer'>
            <div className='element'>
                <img src={humidity_icons} alt="" className='icon' />
                <div className='data'>
                    <div className='humidity-percent'>64 %</div>
                    <div className='text'>Humidity</div>
                </div>
            </div>

            <div className='element'>
                <img src={wind_icons} alt="" className='icon' />
                <div className='data'>
                    <div className='wind-rate'>18 km/hr</div>
                    <div className='text'>Wind speed</div>
                </div>
            </div>
        </div>

    </div>
  )
}
