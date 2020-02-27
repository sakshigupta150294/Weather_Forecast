import React from 'react';
import  './style.css';
import 'bootstrap/dist/css/bootstrap.min.css';



const Form = props =>(
   <div className="container-fluid">
   <h1>Weather Forecast</h1>  
   

   
    <form className="form-group" onSubmit={props.getWeather1}>
    <input type ="text" name="city" placeholder="City..."/>
    <input type ="text" name="country" placeholder="Country..."/>
 
    <button className="btn-warning">Get Weather</button>

    </form>
    </div>

);
 
export default Form;