import { GET_COUNTRIES,COUNTRY_DETAIL,SORT_AND_FILTER,ADD_ACTIVITY } from "./cases"
import sortAndFilter from './sortAndFilter'

const initialState = {
    allCountries: [],
    countriesDb: [],
    countryDetail: {},
    activities: []
}

export default function rootReducer(state = initialState, action){
    
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries:action.payload,
                countriesDb: action.payload
            };
        case COUNTRY_DETAIL:
            return{
                ...state,
                countryDetail:action.payload,
            };
        case SORT_AND_FILTER:
            return {
                ...state,
                allCountries: sortAndFilter({...action.payload},[...state.countriesDb])
            }
        case ADD_ACTIVITY: 
            return {
                ...state,
                activities:[...state.activities,action.payload],
            }
       default: return state;    
    }
}


