import React from 'react';
import './form.css'

const Form=(props)=>{
    return(
        <div className="container">
            <div>{props.error?error():null}</div>
            <form onSubmit={props.loadweather}>
                <div className="cityinput">
                    <input type="text" className="formcontrol" name="city" autoComplete="off" placeholder="Enter City..."/>
                    <button className="btn btn-success px-3 py-2 mx-3">Search Weather</button>
                </div>
            </form>
        </div>
    )
}

function error(){
    return(
        <div className="alert alert-danger mx-5" role="alert">
            Please enter city
        </div>

    )
}

export default Form;