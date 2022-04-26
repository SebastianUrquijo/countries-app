import { Link } from "react-router-dom";
import '../styles/Nav.css'


export default function Nav (){
    return(
        <nav className="navBar">
            <div className="navZone">
            <div className="boxPart"> 
            <Link className='linkButton'to='/'>
                <h3>Home</h3>
            </Link>
            </div>
            <div className="boxPart">
            <Link className='linkButton'to='/countries' >
                <h4>Countries</h4>
            </Link>
            </div>
            <div className="boxPart">
            <Link className='linkButton'to='/about'>
                <h4>About</h4>
            </Link>
            </div>
            </div>
            <div className="formDiv">
            <div className="boxPart"> 
            <Link className='linkButton'to='/activity'>
                <h4>Add Activity</h4>
            </Link>
            </div>
            <div className="boxPart2">
            </div>
            </div>
        </nav>
    )
}