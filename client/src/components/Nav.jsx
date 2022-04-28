import { Link } from "react-router-dom";
import '../styles/Nav.css'

export default function Nav (){
    return(
        <nav className="navBar">
            <div className="navZone">
            <div className="boxPart"> 
            <Link className='linkButton'to='/'>
                Home
            </Link>
            </div>
            <div className="boxPart">
            <Link className='linkButton'to='/countries'>
                Countries
            </Link>
            </div>
            <div className="boxPart">
            <Link className='linkButton'to='/about'>
                About
            </Link>
            </div>
            </div>
            <div className="formDiv">
            <div className="boxPart"> 
            <Link className='linkButton'to='/activity'>
                Add Activity
            </Link>
            </div>
            <div className="boxPart2">
            </div>
            </div>
        </nav>
    )
}