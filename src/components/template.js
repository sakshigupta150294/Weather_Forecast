import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Template2 from './template2';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/weather-icons/css/weather-icons.css'



const API_KEY = "b5eaa19399377445bfddb5e2edce42e9";
class Template extends Component {
  state = {
    jsonhourcast: [],
    show: false,
    count: 0,
    icon: undefined,
    url: undefined
  }


  show_hide = async (e) => {
    e.preventDefault();
    const api_forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${this.props.city},${this.props.country}&appid=${API_KEY}&units=metric`);
    var forecast_stats = await api_forecast.json();
    //var sel_date=document.getElementsByName("date")[0].innerHTML;
    //console.log(document.getElementsByName("datetxt")[0].innerHTML);
    //console.log("inside func");
    var sel_date = this.props.forecast.date_text;
    //console.log(this.props.forecast.date_text);
    var readings = [];
    for (var i = 0; i < 40; i++) {
      // console.log("inside for loop");
      //console.log(forecast_stats.list[i].dt_txt);
      //console.log(sel_date);

      if (sel_date.substring(0, 10) === forecast_stats.list[i].dt_txt.substring(0, 10)) {
        this.setState({
          count: this.state.count + 1
        })
        var reading = {
          "slno": this.state.count,
          "date": forecast_stats.list[i].dt_txt,
          "temp": forecast_stats.list[i].main.temp,
          "max_temp": forecast_stats.list[i].main.temp_max,
          "min_temp": forecast_stats.list[i].main.temp_min,
          "description": forecast_stats.list[i].weather[0].description,
          "id": forecast_stats.list[i].weather[0].id,
          "icon": forecast_stats.list[i].weather[0].icon
        }
        readings.push(reading);

      }
    }

    // console.log("this girl");
    //console.log(readings);

    this.setState({
      show: !this.state.show,
      jsonhourcast: readings,
    })
  }

  render() {
    //  {console.log("in temp component")}
    // { console.log(this.props.forecast)}

    //console.log(this.props.forecast)
    return (<div className="divtemp">

  
      <div onClick={(e) => this.show_hide(e)}>

        <p name="date">Date:{this.props.forecast.date}</p>
        <img className="image1" src={`http://openweathermap.org/img/wn/${this.props.forecast.icon}.png`} alt='weathericon' />


        {this.props.time && <p>Time:{this.props.time}</p>}
        {false && <p name="datetxt">date text:{this.props.forecast.date_text}</p>}
        <p>Temprature:{this.props.forecast.temp}&deg;</p>
        <p>Max:{this.props.forecast.max_temp}&deg;&nbsp;&nbsp;Min:{this.props.forecast.min_temp}&deg;</p>
        <p>Description:{this.props.forecast.description}</p>

      </div>

      {this.state.show && this.state.jsonhourcast.map(entry => (

        <Link to={`/forecast/${this.props.city}&${this.props.country}/${entry.date}/random`}><Template2 forecast={entry} /></Link>
      ))
      }
    </div>);
  }
}

export default Template;