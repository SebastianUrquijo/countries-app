import {applyMiddleware, createStore} from 'redux';
import reduxer from './reduxer';
import thunk from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';



const store = createStore(reduxer,composeWithDevTools(applyMiddleware(thunk)));


export default store