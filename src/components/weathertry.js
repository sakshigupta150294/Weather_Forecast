import React, { Component } from 'react';
import Form from './Form';
import Template from './template';

//import 'weather-icons/css/weather-icon.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/weather-icons/css/weather-icons.css'

import {Link} from 'react-router-dom';


const API_KEY = "b5eaa19399377445bfddb5e2edce42e9";
class Weathertry extends Component {
    
    state = {  
        jsonforecast :[],
        jsontoday:[],
        slno:0,
        city:undefined,
        country:undefined,
        date:undefined,
        time:undefined,
        temp:undefined,
        max_temp:undefined,
        min_temp:undefined,
        description:undefined
    }
    getWeather1 = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
       const api_current = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
       const api_forecast = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
       
       
       const current_stats = await api_current.json();
       const forecast_stats =await api_forecast.json();
       this.setState({
           city:city,
           country:country
       })
  
       console.log(current_stats);
       console.log(forecast_stats);
       

   
       if(country && city){
           var readings = [];
           var first_reading={
            "slno":this.state.slno,
            "date":new Date(forecast_stats.list[0].dt*1000).toLocaleDateString(),
            "date_text":forecast_stats.list[0].dt_txt,
            "temp":current_stats.main.temp,
            "max_temp":current_stats.main.temp_max,
            "min_temp":current_stats.main.temp_min,
            "description":current_stats.weather[0].description,
            "icon":forecast_stats.list[0].weather[0].icon

         
           }
           readings.push(first_reading);
           var ct = new Date(forecast_stats.list[0].dt*1000).toLocaleDateString();
           console.log(ct);
           for(var i=0;i<40;i++){
            if(new Date(forecast_stats.list[i].dt*1000).toLocaleDateString()!== ct){
                ct=new Date(forecast_stats.list[i].dt*1000).toLocaleDateString();
               this.setState({
                   slno:this.state.slno+1
               })
               var fivereading={
                "slno":this.state.slno,
                "date":new Date(forecast_stats.list[i].dt*1000).toLocaleDateString(),
                "date_text":forecast_stats.list[i].dt_txt,
                "temp":forecast_stats.list[i].main.temp,
                "max_temp":forecast_stats.list[i].main.temp_max,
                "min_temp":forecast_stats.list[i].main.temp_min,
                "description":forecast_stats.list[i].weather[0].description,
               "id":forecast_stats.list[i].weather[0].id,
               "icon":forecast_stats.list[i].weather[0].icon
               }
               readings.push(fivereading);
            }

           }
           console.log(readings);
        //    var jsondate = new Date(current_stats.dt*1000).toLocaleDateString();
        //    var jsontime = undefined;
        //    var jsontemp= current_stats.main.temp;
        //    var jsonmax = current_stats.main.temp_max;
        //    var jsonmin =current_stats.main.temp_min;
        //    var jsondesc = current_stats.weather[0].description;


        //    for (var i =0;i<40;i++){
        //        this.setState({
        //            slno:this.state.slno+1
        //        })
        //     var reading ={
        //         "slno":this.state.slno,
        //         "date":forecast_stats.list[i].dt_txt,
        //         "temp":forecast_stats.list[i].main.temp,
        //         "max_temp":forecast_stats.list[i].main.temp_max,
        //         "min_temp":forecast_stats.list[i].main.temp_min,
        //         "description":forecast_stats.list[i].weather[0].description,
        //         "id":forecast_stats.list[i].weather[0].id,
        //         "show":false
        //        }
        //        readings.push(reading);

        //    }
        //    var reading ={
        //     "date":jsondate,
        //     "temp":jsontemp,
        //     "max_temp":jsonmax,
        //     "min_temp":jsonmin,
        //     "description":jsondesc
        //    }
        //    readings.push(reading);
          // console.log(jsondata);
           this.setState({
               jsonforecast:readings,
                
               date:[new Date(current_stats.dt*1000).toLocaleDateString()],
               temp:current_stats.main.temp,
               max_temp:current_stats.main.temp_max,
               min_temp:current_stats.main.temp_min,
               description:current_stats.weather[0].description

           });

        // var current_date = new Date(current_stats.dt*1000).toLocaleDateString() ;
        // var current_temp = current_stats.main.temp;
        // var min_temp = current_stats.main.temp_min;
        // var max_temp =current_stats.main.temp_max;
        // var desc = current_stats.weather[0].description;

        
        //console.log(current_date);

       }

    }



    render() { 
      
        return (  <div className="container-fluid">
            <Form getWeather1={this.getWeather1}/> 
        
            
            {
                this.state.jsonforecast.map(entry=>(
                 
                  
                    <Link to={`/forecast/${this.state.city}&${this.state.country}/${entry.date}` }>
                    <Template city={this.state.city} country={this.state.country} forecast={entry}/>
                    </Link>
                  
                ))
            }
            
        
            </div>);
    }
}

// <Template date={this.state.date}
// temp = {this.state.temp}
// time={this.state.time}
// min_temp={this.state.min_temp}
// max_temp={this.state.max_temp}
// description={this.state.description}/>
 
export default Weathertry;