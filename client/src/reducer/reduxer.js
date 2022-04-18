import { GET_COUNTRIES,COUNTRY_DETAIL,COUNTRY_NAME,SORT_AND_FILTER,ADD_ACTIVITY } from "./cases"
import sortAndFilter from './sortAndFilter'

const initialState = {
    allCountries: [],
    countryDetail: {},
    countriesFilter:[],
    countriesRestore:[],
    activities: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state,
                countriesRestore:action.payload,
                allCountries:[...action.payload,...state.countriesRestore],
            };
        case COUNTRY_DETAIL:
            return{
                ...state,
                countryDetail:action.payload,
            };
        case COUNTRY_NAME:
            return{
                ...state,
                countriesFilter:action.payload,
            }
        case SORT_AND_FILTER:
            return {
                ...state,
                allCountries: sortAndFilter({...action.payload},...state.allCountries)
            }
        case ADD_ACTIVITY: 
            return {
                ...state,
                activities:[...state.activities,action.payload],
            }
       default: return state;    
    }
}


