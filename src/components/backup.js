import React, { Component } from 'react';
import Form from './Form';
//import 'weather-icons/css/weather-icon.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../node_modules/weather-icons/css/weather-icons.css'




const API_KEY = "b5eaa19399377445bfddb5e2edce42e9";



class Weather extends Component {
    state={
        showfiveday:false,
        showhourley:false,
        city:undefined,
        length:undefined,
        dates:undefined,
        day1:undefined,
        temps1:undefined,
        times1:undefined,
        day2:undefined,
        temps2:undefined,
        times2:undefined,
        day3:undefined,
        temps3:undefined,
        times3:undefined,
        day4:undefined,
        temps4:undefined,
        times4:undefined,
        day5:undefined,
        temps5:undefined,
        times5:undefined,
        
    }
    show_hide(){
        this.setState({
            showfiveday:!this.state.showfiveday
        });
    }

    getWeather = async (e) => {
        e.preventDefault();
        const city = e.target.elements.city.value;
        const country = e.target.elements.country.value;
       const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}&units=metric`);
       const api_call1 = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&appid=${API_KEY}&units=metric`);
       // const data = await api_call.json();
        const data1 = await api_call.json();
        const data = await api_call1.json();
        if (city && country) {
          //console.log(data);
          console.log("in weatherjs");
          console.log(data);
          console.log(data1);
          const dt_data = new Date(data1.dt*1000 ) ;
          const dt = data.list[0].dt_txt.split(" ");
         //const date_1 = new Date(data.list[0].dt*1000);
          const apicity = data.city.name;
          const length1 = data.list.length;
          console.log("from data");
          console.log(dt_data);
     
          //console.log(date_1);
          var ct=dt[0].substring(0,10);
          var days=[dt[0]];
          var times=[];
          var temps=[];
          var tailedtimes=new Array(40).fill(0);
          console.log(ct);
          var j=0;
 
          for(var i=0;i<40;i++){
            j=i
            times.push(data.list[i].dt_txt.substring(11));
             temps.push(data.list[i].main.temp);
            if(data.list[i].dt_txt.substring(0,10)!== ct){
                ct =data.list[i].dt_txt.substring(0,10)
                days.push(data.list[i].dt_txt.substring(0,10));
             
            }
            
            tailedtimes[j]=data.list[i].dt_txt.substring(11);
        

            }
          console.log(days);
          console.log(times);
          console.log(temps);
          
          this.setState({
              city: apicity,
              length :length1,
              day1:days[0],
              times1:times.slice(0,8),
              temps1:temps.slice(0,8),
              day2:days[1],
              times2:times.slice(8,16),
              temps2:temps.slice(8,16),
              day3:days[2],
              times3:times.slice(16,24),
              temps3:temps.slice(16,24),
              day4:days[3],
              times4:times.slice(24,32),
              temps4:temps.slice(24,32),
              day5:days[4],
              times5:times.slice(32,40),
              temps5:temps.slice(32,40),
          });
       
        } else {
      
        }
      }
    render() { 
        //console.log(this.props.json1);
       
       // console.log(d.city.name);
        return (  
           
            <div>
            
            <Form getWeather={this.getWeather}/> 
            <div>
             <h1> City:{this.state.city}</h1>
             <div><i onClick = {()=>this.show_hide()} className="wi wi-day-sunny display-1" ></i></div>
            </div>
           {/*<p>Date:{this.props.date}</p>
            <p>Time:{this.props.time}</p>
            <p>temp:{this.props.temp}</p>
        <p>length:{this.state.length}</p>*/}
        
            <p>Day1:{this.state.day1}</p>
            <p>times:{this.state.times1}</p>
            <p>temps:{this.state.temps1}</p>
            <button >Forecast</button>
            {
            this.state.showfiveday && this.state.city ?
            <div>
            <p>Day2:{this.state.day2}</p>
            <p>times:{this.state.times2}</p>
            <p>temps:{this.state.temps2}</p>
            <p>Day3:{this.state.day3}</p>
            <p>times:{this.state.times3}</p>
            <p>temps:{this.state.temps3}</p>
            <p>Day4:{this.state.day4}</p>
            <p>times:{this.state.times4}</p>
            <p>temps:{this.state.temps4}</p>
            <p>Day5:{this.state.day5}</p>
            <p>times{this.state.times5}</p>
            <p>temps:{this.state.temps5}</p>
            </div>
            :null}
            </div> );
    }
}
 
export default Weather;



