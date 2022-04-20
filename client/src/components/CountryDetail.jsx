import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { getCountryDetail } from "../reducer/actions";
import Nav from "./Nav";
import Activity from './Activity';
import '../styles/CountryDetail.css'

export default function CountryDetail (){
    const {id}=useParams()
    const dispatch=useDispatch()
    const country = useSelector(state=>state.countryDetail)
    console.log(country)
    console.log(country.activities)
    useEffect(()=>{
        dispatch(getCountryDetail(id))
    },[dispatch,id]);
    
    return(
        <div className="alphaZone">
            <div className="navSector">
            <Nav/>
            </div>
            <div className="detailBox">
                <h1 className="mainTitle">{country.name}</h1>
                <div className="flagBrick">
                <img className= 'countryBox' src={country.flag} alt="{name}" height='200px' width='300px'/>
                <div className="mainBox">
                <p>Capital: {country.capital}</p>
                <p>Continente: {country.continent}</p>
                <p>Región: {country.subregion}</p>
                </div>
                </div>
                <div className="secondData">
                <p>Area: {country.area} Km<sup>2</sup></p>
                <p>Población: {country.population} Habitantes</p>
                </div>
                <h2 className="secondTitle">Actividades</h2>
                {country ? country.activities ? country.activities.map((activity)=>{
                    return(
                        <div key = {activity.id}>
                            <Activity
                            id = {activity.id}
                            name = {activity.name}
                            difficulty={activity.difficulty}
                            duration={activity.duration}
                            season={activity.season}
                            />
                        </div>
                    )
                }): <span>Aun no hay actividades</span> : <></> }
            </div>
        </div>
    )
}