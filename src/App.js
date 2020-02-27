import React from 'react';
//import 'weather-icons/css/weathericons.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import './components/style.css';
//import Weather from './components/Weather';
import Weathertry from './components/weathertry';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/weather-icons/css/weather-icons.css'


//import Template from './components/template';



class App extends React.Component {
  state = {
    //json1:undefined,
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined
  }

  render() {
    return (
      
        <div className="Wrapper">
        <div className="main">
        <div className="container-fluid">
        <Router>
       <Route path="/" component={Weathertry} />
          </Router>
          </div>
        </div>
        </div>
     
    );
  }
}

// <Weather 
//      //json1 = {this.state.json1}
//     // temp ={this.state.temperature}
//     //    city={this.state.city}
//     // date = {this.state.date}
//     // time = {this.state.time}
//     />
export default App;
