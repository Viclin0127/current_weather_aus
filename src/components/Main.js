import React, {useState, useEffect} from 'react'
import openweather from '../apis/openweather'
import Dropdown from 'react-dropdown';
import CITYLIST from "../statics/cityList"
import 'react-dropdown/style.css';

function Main() {
    const [data, setData] = useState({})

    const onChangeSelected = async e =>{
        try{
            const {data} = await openweather.get("/weather", {params: {q: e.value, units: "metric"}})
            setData({name: data.name, wind: data.wind.speed, temp: data.main.temp, hum: data.main.humidity, weather: data.weather[0].main})
            console.log(data)
        }
        catch(ex){
            console.log(ex.message)
        }
    }

    const options = CITYLIST;
    const defaultOption = options[0];

    return (
        <div className="search-main">
            <div className="search-title">
                Current Weather Search
            </div>
            <Dropdown options={options} onChange={onChangeSelected} placeholder="Select a City"/>
            <div className="display">
                <div className="display-content">
                    <div>{data.name}</div>
                    <div>{data.wind}</div>
                    <div>{data.temp}</div>
                    <div>{data.hum}</div>
                    <div>{data.weather}</div>
                </div>
            </div>
        </div>
    )
}

export default Main
