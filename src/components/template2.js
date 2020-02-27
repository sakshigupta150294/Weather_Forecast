import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/weather-icons/css/weather-icons.css'

class Template2 extends Component {
    state = {  }
  
    render() { 
        console.log("template2")
        console.log(this.props.forecast)
        return ( 

            <div className="divtemp2">       
            <p name ="date">Date:{this.props.forecast.date}</p>
            <img className="image2" src={`http://openweathermap.org/img/wn/${this.props.forecast.icon}.png`} alt ='weathericon'/>
           

            {this.props.time && <p>Time:{this.props.time}</p>}
            {false&& <p name ="datetxt" >date text:{this.props.forecast.date_text};</p>}
            <p>Temprature:{this.props.forecast.temp}&deg;</p>
            <p>Max:{this.props.forecast.max_temp}&deg;&nbsp;&nbsp;Min:{this.props.forecast.min_temp}&deg;</p>
            <p></p>
            <p>Description:{this.props.forecast.description}</p>
            
            </div>
      



         );
    }
}
 
export default Template2;