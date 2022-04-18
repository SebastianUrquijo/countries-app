import React from 'react';
import {useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getCountriesDb} from '../reducer/actions';
import Country from './Country'
import Nav from './Nav';
import '../styles/Countries.css'

export default function Countries(){
    const dispatch = useDispatch()
    const allCountries = useSelector(state=>state.allCountries)
    //const sortedCountries = useSelector(state=>state.sortedCountries)
    const [countriesXpage,setCountriesXpage] = useState(10)
    const [currentPage,setCurrentPage]=useState(1)
    const lastCountry = currentPage *   countriesXpage
    const fisrtCountry = lastCountry - countriesXpage
    const renderCountries = allCountries.slice(fisrtCountry,lastCountry)


    useEffect(()=>{
        dispatch(getCountriesDb())
    },[dispatch]);
    
    return(
        <div>
            <div className='navBox'>
            <Nav/>
            </div>
        <div className='countriesZone'>
            {allCountries && allCountries.map((country)=>{
                return(
                    <div key= {country.id}>
                           <Link className='countryPlace' to={`/countries/${country.id}`}>
                            <Country
                            id = {country.id}
                            name = {country.name}
                            flag = {country.flag}
                            continent = {country.continent}
                            />
                            </Link>
                    </div>
                )
            })}
        </div>
        </div>
    )

}