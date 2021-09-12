import React, {useState} from 'react';
import openweather from '../apis/openweather';
import Dropdown, { Option } from 'react-dropdown';
import {BiWind} from "react-icons/bi";
import {WiHumidity} from "react-icons/wi";
import CITYLIST from "../statics/cityList";
import 'react-dropdown/style.css';
import Footer from './Footer';

interface DataNode {
    data:{
        wind?: number,
        temp?: number,
        hum?: number,
        weather?: string
    }
}

const Main: React.FC = () => {
    const [data, setData] = useState<DataNode["data"]>({})
    const [display, setDisplay] = useState<boolean>(false)

    const onChangeSelected = async (event: Option) : Promise<void> =>{
        try{
            const {data} = await openweather.get("/weather", {params: {q: event.value, units: "metric"}})
            setData({wind: data.wind.speed, temp: data.main.temp, hum: data.main.humidity, weather: data.weather[0].main})
            setDisplay(true)
        }
        catch(ex){
            // TODO: Error handling
            alert("Error from connecting to the API...")
        }
    }

    const options: string[] = CITYLIST;

    return (
        <div className="app">
            <div className="search-main">
                <div className="search-title">
                    Current Weather Data
                </div>
                <Dropdown className="my-dropdown" options={options} onChange={onChangeSelected} placeholder="Select a City"/>
                { display ? 
                    <div className="display">
                        <div className="display-content">
                            <React.Fragment>
                                <ul className="content-wrapper">
                                    <li className="content-item">{`${data.temp} ºC`}</li>
                                    <li className="content-item">{data.wind}<BiWind className="content-icon"/></li>
                                    <li className="content-item">{data.hum}<WiHumidity className="content-icon"/></li>
                                    <li className="content-item">{`(${data.weather})`}</li>
                                </ul>
                            </React.Fragment>
                        </div>
                    </div>
                : <div className="display">
                    No City Selected...
                    </div>
                }
                <Footer/>
            </div>
        </div> 
    )
}

export default Main
