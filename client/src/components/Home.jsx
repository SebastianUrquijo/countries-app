import React from "react";
import { Link } from "react-router-dom";

export default function Home (){
    return(
        <div className="homeBackground">
            <Link to='/countries'>
            <p>Ingresar</p>
            </Link>
        </div>
    )
}