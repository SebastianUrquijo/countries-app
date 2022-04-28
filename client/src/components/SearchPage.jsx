import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams,Link } from "react-router-dom"
import Nav from "./Nav"
import Country from "./Country"
import Loading from "./Loading"
import SearchBar from "./SearchBar"
import { getCountriesByName } from "../reducer/actions"

export default function SearchPage(){
    const{name}=useParams()
    const dispatch= useDispatch()
    const queryCountries= useSelector(state=>state.countriesByName)
    
    useEffect(()=>{
        dispatch(getCountriesByName(name))
    },[dispatch,name]);
    
    return(
        <div>
            {queryCountries.length ? (
            <div>
            <div className='navBox'>
            <Nav/>
            </div>
            <div className='searchBox'>
            <SearchBar/>
            </div>
            <div className='countriesZone'>
            {queryCountries ? queryCountries.map((country)=>{
                return(
                    <div key= {country.id}>
                           <Link className='countryPlace' to={`/countries/${country.id}`}>
                            <Country
                            id = {country.id}
                            name = {country.name}
                            flag = {country.flag}
                            continent = {country.continent}
                            population = {country.population}
                            />
                            </Link>
                    </div>
                )
            }): <></>}
        </div>
            </div>
            ) : <Loading/>}
        </div>
    )
}