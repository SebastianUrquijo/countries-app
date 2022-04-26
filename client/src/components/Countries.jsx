import React, {useEffect,useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getCountriesByName} from '../reducer/actions';
import Country from './Country'
import Sort from './Sort'
import Pagination from './Pagination';
import Nav from './Nav';
import '../styles/Countries.css'
import Loading from './Loading';

export default function Countries(){
    const dispatch = useDispatch()
    
    const [params] = useSearchParams()
    const queryname = params.get("name") ?? "";
    
    const allCountries = useSelector(state=>state.allCountries)
    const queryCountries = useSelector(state=>state.countriesByName)
    const [countriesXpage,setCountriesXPage] = useState(9)
    const [currentPage,setCurrentPage]=useState(1)
    const lastCountry = currentPage *   countriesXpage
    const fisrtCountry = lastCountry - countriesXpage
    const allDb= queryname? queryCountries : allCountries
    const renderCountries = allDb.slice(fisrtCountry,lastCountry)
   
    console.log(allDb)

    useEffect(()=>{
        if(queryname)
        dispatch(getCountriesByName(queryname))
    },[dispatch,queryname]);
    
    return(
        <div>
            {allDb.length ? (
            <div>
            <div className='navBox'>
            <Nav/>
            <Sort
            setCountriesXPage={setCountriesXPage}
            setCurrentPage={setCurrentPage}    
            />
            </div>
            <div className='countriesZone'>
            {renderCountries ? renderCountries.map((country)=>{
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
        <Pagination
        currentPage={currentPage}
        countriesXPage={countriesXpage}
        totalCountries={allCountries.length}
        setCurrentPage={setCurrentPage}
        />
            </div>
            ) : <Loading/>}
        </div>
    )

}