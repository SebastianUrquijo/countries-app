import React from "react";
import '../styles/Country.css'


export default function Country ({flag,continent,name}){
    const countryname = function(name){
        if(name.length >= 18)return name.slice(0,17) + '...' 
        return name
    }
    return(
        <div className="countryCard">
            <div className="flagZone">
            <img className= 'countryFlag' src={flag} alt="{name}" height='38px' width='55px'/>
            </div>
            <div className="infoZone">
            <h4 className='countryName'>{countryname(name)}</h4>
            <span className="countryContinent">- {continent}</span>
            </div>
        </div>
    )

}