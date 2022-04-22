import React from "react";
import '../styles/Country.css'


export default function Country ({flag,continent,name,population}){
    const countryname = function(name){
        if(name.length >= 25)return name.slice(0,22) + '...' 
        return name
    }
    return(
        <div className="countryCard">
            <h2 className='countryName'>{countryname(name)}</h2>
            <div className="countryBanner">
            <div className="flagZone">
            <img className= 'countryFlag' src={flag} alt="{name}" height='100px' width='180px'/>
            </div>
            <div className="infoZone">
            <h3 className="countryContinent"><i>{continent}</i></h3>
            <span className="countryPop">{population} Hab.</span>
            </div>
            </div>
        </div>
    )

}