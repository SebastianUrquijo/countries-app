import { GET_COUNTRIES,COUNTRY_DETAIL,COUNTRY_NAME,SORT_AND_FILTER,ADD_ACTIVITY } from "./cases";
const axios = require('axios');

export function getCountriesDb(datalength){
    return function(dispatch){
        if(datalength === 0){
            return fetch('http://localhost:3001/countries')
            .then(response => response.json())
            .then(countries =>{
                dispatch({type: GET_COUNTRIES,payload: countries,datalength})
            })
            .catch(error=>{
                console.log(error)
            })
        }
        dispatch({type: GET_COUNTRIES,payload: datalength})
    }
    
}

export function getCountryDetail(id){
    return function(dispatch){
        return fetch(`http://localhost:3001/countries/${id}`)
        .then(response => response.json())
        .then(country =>{
            dispatch({type:COUNTRY_DETAIL,payload:country})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export function getCountriesByName(name){
    return function(dispatch){
        return fetch(`http://localhost:3001/countries?name=${name}`)
        .then(response => response.json())
        .then(countries =>{
            dispatch({type:COUNTRY_NAME,payload:countries})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export function addActivity(activity){
    return function (dispatch){
        axios.post('http://localhost:3001/activity',activity)
        .then((response)=>{
            dispatch({type: ADD_ACTIVITY,payload: response.data})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export function sortAndFilter(mode){
    return {type:SORT_AND_FILTER,payload:mode}
}