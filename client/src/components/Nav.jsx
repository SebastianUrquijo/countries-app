import { Link } from "react-router-dom";
import '../styles/Nav.css'
import SearchBar from './SearchBar'

export default function Nav (){
    return(
        <div className="navBar">
            <div className="homeBox">
            <Link className='linkButton'to='/'>
                <h3>Home</h3>
            </Link>
            </div>
            <div className="countriesBox">
            <Link className='linkButton'to='/countries'>
                <h4>Countries</h4>
            </Link>
            </div>
            <div className="aboutBox">
            <Link className='linkButton'to='/about'>
                <h4>About</h4>
            </Link>
            </div>
            <SearchBar/>

        </div>
    )
}