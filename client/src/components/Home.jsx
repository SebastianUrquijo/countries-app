import React, { useEffect } from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { getCountriesDb } from "../reducer/actions";
import "../styles/Home.css"

export default function Home (){
    const dispatch = useDispatch()
    
    useEffect(()=>{
        dispatch(getCountriesDb())
    },[dispatch])
    return(
        <div className="homeBackground">
         <div className="wrap">
         <Link className='homeLink' to='/countries'>
             <button className="homeButton">Ingresar</button>
             </Link>
         </div>
        </div>
    )
}