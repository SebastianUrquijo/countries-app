import React from "react";


export default function Country ({flag,continent,name}){
    return(
        <div className="countryCard">
            <h3>{name}</h3>
            <img src={flag} alt="{name}"/>
            <span>{continent}</span>
        </div>
    )

}