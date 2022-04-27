import { GET_COUNTRIES,COUNTRY_DETAIL,SORT_AND_FILTER,ADD_ACTIVITY,GET_COUNTRIES_BY_NAME} from "./cases"
import sortAndFilter from './sortAndFilter'

const initialState = {
    allCountries: [],
    countriesDb: [],
    countriesByName: [],
    countryDetail: {},
    activitie: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state,
                allCountries:action.payload,
                countriesDb: action.payload
            };
        case GET_COUNTRIES_BY_NAME:
            return{
                ...state,
                countriesByName:action.payload
            }
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


