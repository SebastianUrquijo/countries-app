import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams} from "react-router-dom";
import { getCountryDetail } from "../reducer/actions";
import Nav from "./Nav";
import Activity from './Activity';
import '../styles/CountryDetail.css'
import Loading from "./Loading";

export default function CountryDetail (){
    const {id}=useParams()
    const dispatch=useDispatch()
    const country = useSelector(state=>state.countryDetail)
    useEffect(()=>{
        dispatch(getCountryDetail(id))
    },[dispatch,id]);
    const activities = country.activities
    
    const numberformat = function(number){
        const exp = /(\d)(?=(\d{3})+(?!\d))/g;
        const rep = '$1,';
        let arr = number.toString().split('.');
        arr[0] = arr[0].replace(exp,rep);
        return arr[1] ? arr.join('.'): arr[0];
    }

    return(
        <div className="alphaZone">
            {country?( 
            <div className="navPage">
            <div className="navSector">   
            <Nav/>
            </div>
            <div className="detailBox">
                <h1 className="mainTitle">{country.name}</h1>
                <div className="flagBrick">
                <img className= 'countryBox' src={country.flag} alt="{name}" height='200px' width='300px'/>
                <div className="mainBox">
                <p id="P1">Capital: {country.capital}</p>
                <p id="P1">Continente: {country.continent}</p>
                <p id="P1">Región: {country.subregion}</p>
                </div>
                </div>
                <div className="secondData">
                <p id="P1">Area: {country.area && numberformat(country.area)} Km<sup>2</sup></p>
                <p id="P1">Población: {country.population && numberformat(country.population)} Habitantes</p>
                </div>
                <h2 className="secondTitle"><i>Actividades</i></h2>
                <div>  
                {activities?.length>0 ? activities.map((activity)=>{
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
                }): <h3 className="bannerAdd">Aun no hay actividades</h3>}
                </div>
            </div>
            </div>):<Loading/>}
           
        </div>
    )
}