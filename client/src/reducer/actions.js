import { GET_COUNTRIES,COUNTRY_DETAIL,SORT_AND_FILTER,ADD_ACTIVITY, GET_COUNTRIES_BY_NAME } from "./cases";
const axios = require('axios');

export function getCountriesDb(){
    return function(dispatch){
                return fetch("http://localhost:3001/countries")
                .then(response => response.json())
                .then(countries =>{
                dispatch({type: GET_COUNTRIES,payload: countries})
                })
                .catch(error=>{
                    console.log(error)
                })
    }
}

export function getCountriesByName(query){
    return function(dispatch){
        return fetch(`http://localhost:3001/countries?name=${query}`)
            .then(response =>response.json())
            .then(countries=>{
                dispatch({type: GET_COUNTRIES_BY_NAME,payload: countries})
            })
            .catch(error=>{
                console.log(error.name + " El pais que buscas no existe " + error.message)
                alert(`The country "${query}" does not exist`)
            })
    }
}

export function getCountryDetail(id){
    return function(dispatch){
            return fetch(`http://localhost:3001/countries/${id}`)
            .then(response=> response.json())
            .then (country => {dispatch({ type: COUNTRY_DETAIL, payload: country })})
        .catch (error=> {
            console.log(error);
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