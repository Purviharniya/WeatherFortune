import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'weather-icons-master/css/weather-icons.css'
import 'weather-icons-master/css/weather-icons-wind.min.css'
import Weather from './components/weather.component'
import Form from './components/form.component'


const API='599d8588360adac905abe4e838faa214';


class  App extends React.Component{
  constructor(){
    super();
    this.state={
      city:undefined,
      country:undefined,
      icon:undefined,
      main:undefined,
      fahrenheit:undefined,
      celcius:undefined,
      temp_max_fa:undefined,
      temp_min_fa:undefined,
      temp_max_ce:undefined,
      temp_min_ce:undefined,
      humidity:undefined,
      pressure:undefined,
      description:"",
      error:false
    };

    this.weatherIcon={
      Thunderstorm: "wi-thunderstorm",
      Drizzle:"wi-sleet",
      Rain:"wi-storm-showers",
      Snow:"wi-snow",
      Atmosphere:"wi-fog",
      Clear:"wi-day-sunny",
      Clouds:"wi-day-fog",
    }
  }

  calcCelsius(temp){
    let cell=Math.floor(temp-273.15);
    return(cell);
  }


  get_Weathericons(icon,rangeID){
    switch(true){
      case rangeID>=200 && rangeID<=232:
        this.setState({icon:this.weatherIcon.Thunderstorm})
      break;

      case rangeID>=300 && rangeID<=321:
        this.setState({icon:this.weatherIcon.Drizzle})
      break;

      case rangeID>=500 && rangeID<=531:
        this.setState({icon:this.weatherIcon.Rain})
      break;

      case rangeID>=600 && rangeID<=622:
        this.setState({icon:this.weatherIcon.Snow})
      break;

      case rangeID>=701 && rangeID<=781:
        this.setState({icon:this.weatherIcon.Atmosphere})
      break;

      case rangeID===800:
        this.setState({icon:this.weatherIcon.Clear})
      break;

      case rangeID>=801 && rangeID<=804:
        this.setState({icon:this.weatherIcon.Clouds})
      break;

      default:
        this.setState({icon:this.weatherIcon.Clouds})
    }
  }


  getWeather=async (e) =>{

    e.preventDefault();

    const city=e.target.elements.city.value;
   

    if(city){
      const api_call= await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`);

      // OTHER METHOD: await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API}`);

    const response= await api_call.json();

    console.log(response);

    this.setState({
      city:`${response.name},${response.sys.country}`,
      fahrenheit:Math.round(response.main.temp),
      celcius:this.calcCelsius(response.main.temp),
      temp_max_fa:Math.round(response.main.temp_max),
      temp_min_fa:Math.round(response.main.temp_min),
      temp_max_ce:this.calcCelsius(response.main.temp_max),
      temp_min_ce:this.calcCelsius(response.main.temp_min),
      humidity:response.main.humidity,
      pressure:response.main.pressure,
      description:response.weather[0].description,
    })

    this.get_Weathericons(this.icon,response.weather[0].id)
    }
    else{
      this.setState({error:true});
    }
  }

  render(){
    return(
      <div className={
        (typeof this.state.celcius != "undefined")
          ?((this.state.celcius>16 && this.state.celcius<30)
            ?"App b1": ((this.state.celcius>30)
              ? "App b2":"App b3")):"App b3"}>
        <Form loadweather={this.getWeather} error={this.state.error}/>
        <Weather 
            city={this.state.city} 
            country={this.state.country}
            fahrenheit={this.state.fahrenheit} 
            celcius={this.state.celcius}
            temp_max_ce={this.state.temp_max_ce}
            temp_min_ce={this.state.temp_min_ce}  
            temp_max_fa={this.state.temp_max_fa}
            temp_min_fa={this.state.temp_min_fa}
            description={this.state.description}
            pressure={this.state.pressure}
            humidity={this.state.humidity}
            icon={this.state.icon}
        />
      </div>
    );
  }
}

export default App;
