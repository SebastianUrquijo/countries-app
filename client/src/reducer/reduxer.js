import { GET_COUNTRIES,COUNTRY_DETAIL,SORT_AND_FILTER,ADD_ACTIVITY,GET_COUNTRIES_BY_NAME, GET_ACTIVITIES} from "./cases"
import sortAndFilter from './sortAndFilter'

const initialState = {
    renderCountries: [],
    countriesRestore: [],
    countriesByName: [],
    countryDetail: {},
    activities: []
}

export default function rootReducer(state = initialState, action){
    switch(action.type){
        case GET_COUNTRIES:
            return {
                ...state,
                renderCountries:action.payload,
                countriesRestore:action.payload
            };
        case GET_COUNTRIES_BY_NAME:
            return{
                ...state,
                countriesByName:action.payload,
            }
        case COUNTRY_DETAIL:
            return{
                ...state,
                countryDetail:action.payload,
            };
        case SORT_AND_FILTER:
            return {
                ...state,
                renderCountries: sortAndFilter({...action.payload},[...state.countriesRestore]),
            }   
        case ADD_ACTIVITY: 
            return {
                ...state,
                activities: [...state.activities,action.payload]
            };
        case GET_ACTIVITIES:
            return {
                ...state,
                activities:action.payload
            }
       default: return state;    
    }
}


