import React from 'react';
import './weather.css'
const Weather=(props)=>{

    const dateBuilder=(d)=>{
        let months=["January","February","March","April","May","June","July","August","September",
                        "October","November","December"];
        let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
        let day=days[d.getDay()];
        let date=d.getDate();
        let month= months[d.getMonth()];
        let year= d.getFullYear();

        return `${day} ${date} ${month},${year}`;
    }

    return(
        <div className="container">
            <div className="cards">
                <h1>{props.city}</h1>
                {props.city?<h3>{dateBuilder(new Date())}</h3>:null}
                <h4 className="py-4">
                    <i className={`wi ${props.icon} display-1`}></i>
                </h4>
                {props.celcius?<h2 className="py-2"> Temperature: {props.celcius}&deg;C  &nbsp;|&nbsp; {props.fahrenheit}K</h2>:null}
                {/**show max and min temperatures */}
                
                {minmaxTempCel(props.temp_min_ce,props.temp_max_ce)}<br/>
                {minmaxTempFa(props.temp_min_fa,props.temp_max_fa)}

                {props.description? <h5 className="py-3"> Description:   {props.description} </h5>:null}
                {props.humidity?<h5 className="py-3">Humidity:   {props.humidity}%</h5>:null}
                {props.pressure?<h5 className="py-3">Pressure:   {props.pressure} hpa</h5>:null}
            </div> 
        </div>
    )
}

function minmaxTempCel(min,max){
    if(min&&max){
    return(
        <>
        <h3>Min - Max Temperature:</h3>
        <h4>
            <span className="px-4">{min}&deg;C </span>
            <span className="px-4">{max}&deg;C</span>
        </h4>
        </>
    )
    }
}

function minmaxTempFa(min,max){
    if(min&&max){
    return(
        <h4>
            <span className="px-4">{min}K </span>
            <span className="px-4">{max}K</span>
        </h4>
    )
    }
}

export default Weather