import { GET_COUNTRIES,COUNTRY_DETAIL,SORT_AND_FILTER,ADD_ACTIVITY, GET_COUNTRIES_BY_NAME, GET_ACTIVITIES } from "./cases";

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
    return async function(dispatch){
        try {
            const response = await fetch(`http://localhost:3001/countries?name=${query}`);
            const countries = await response.json();
            console.log(countries)
            dispatch({ type: GET_COUNTRIES_BY_NAME, payload: countries });
        } catch (error) {
            console.log(error.name + " El pais que buscas no existe " + error.message);
            alert(`The country "${query}" does not exist`);
        }
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

export function addActivityCheck(name){
    return function (dispatch){
        return fetch(`http://localhost:3001/activity/${name}`)
        .then(response =>response.json())
        .then((activity)=>{dispatch({type: ADD_ACTIVITY,payload: activity})
        })
        .catch(error=>{
            console.log(error)
        })
    }
}

export function getActivities(){
    return function(dispatch){
        return fetch("http://localhost:3001/activities")
        .then(response => response.json())
        .then (activity =>{dispatch({ type: GET_ACTIVITIES, payload: activity })
        })
        .catch(error=>{console.log(error)
        })
    }
}


export function sortAndFilter(mode){
    return {type:SORT_AND_FILTER,payload:mode}
}

