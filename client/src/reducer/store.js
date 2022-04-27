import {applyMiddleware, createStore} from 'redux';
import { saveState, loadState } from './localStorage';
import reduxer from './reduxer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
//localStorage.clear();
const initialData = loadState()

const store = createStore(reduxer,initialData,composeWithDevTools(applyMiddleware(thunk)));

store.subscribe(function(){
    saveState(store.getState())
})

export default store