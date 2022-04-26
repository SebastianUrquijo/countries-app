import React from 'react';
import { useState } from 'react';
import '../styles/SearchBar.css'

export default function SearchBar(){
    const validate = (value) => {
        let error={};
        let testSpace = /^\S+/;
        if(!testSpace.test(value.name)){
            error.name = 'No se permiten espacios en blanco al inicio para realizar la búsqueda';
        }
        if(value.name.length <3){
            error.name = 'Minimo 3 caracteres'
        }
        return error;
    
    }

   const[data, setData] = useState("")
   const[errors, setErrors] = useState("")
   
    function handleSubmit(e){
        if(!data.name){
        alert("No se ha puesto un nombre")
        e.preventDefault()
        }
        if(errors.name){
        alert(errors.name)
        e.preventDefault()
        }

   }
   function handleSearch(i){
    setData(
        {...data,
        [i.target.name]: i.target.value});
    setErrors(validate({
        ...data,
        [i.target.name]:i.target.value
    }))
}
    
    return(
        <div>
        <form className ='searchSpan' onSubmit={(e)=> handleSubmit(e)}>
            <input className='inputSearch' type='search' placeholder='Search any Country' name ="name" value={data.datanet} onChange={handleSearch} />
            <button className='inputSearch' type='submit' value='Search'>Buscar</button>
        </form>
        </div>
    )
}