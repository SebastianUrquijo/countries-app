import React,{Fragment} from 'react';
import './App.css';
import Home from './components/Home';
import Countries from './components/Countries';
import CountryDetail from './components/CountryDetail'
import Form from './components/Form'
import {Routes,Route} from 'react-router-dom'


function App() {
  return (
    <Fragment>
      <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/countries' element={<Countries/>}/>
      <Route path='/countries/:id' element={<CountryDetail/>}/>
      <Route path='/activity' element={<Form/>}/>
      </Routes>
    </Fragment>
  );
}

export default App;
