import { Link } from "react-router-dom";
import "../styles/Home.css"

export default function Home (){
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