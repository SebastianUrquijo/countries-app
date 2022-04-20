import React from 'react';
import {useEffect,useState } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getCountriesDb} from '../reducer/actions';
import Country from './Country'
import Sort from './Sort'
import Pagination from './Pagination';
import Nav from './Nav';
import '../styles/Countries.css'

export default function Countries(){
    const dispatch = useDispatch()
    const allCountries = useSelector(state=>state.allCountries)
    console.log(allCountries.length)
    const [countriesXpage,setCountriesXPage] = useState(10)
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
            <Sort
            setCountriesXPage={setCountriesXPage}
            setCurrentPage={setCurrentPage}    
            />
            </div>
        <div className='countriesZone'>
            {renderCountries && renderCountries.map((country)=>{
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
        <Pagination
        currentPage={currentPage}
        countriesXPage={countriesXpage}
        totalCountries={allCountries.length}
        setCurrentPage={setCurrentPage}
        />
        </div>
    )

}