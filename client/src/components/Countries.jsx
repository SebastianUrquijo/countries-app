import React from 'react';
import {useEffect } from 'react';
import { Link } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getCountriesDb} from '../reducer/actions';
import Country from './Country'

export default function Countries(){
    const dispatch = useDispatch()
    const allCountries = useSelector(state=>state.allCountries)
    
    useEffect(()=>{
        dispatch(getCountriesDb())
    },[dispatch]);
    
    return(
        <div>
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
    )

}