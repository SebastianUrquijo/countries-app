import Nav from './Nav'
import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../styles/Form.css'


export default function Form(){
    const dispatch = useDispatch()
    const countries = useSelector((state)=>state.countriesRestore)
    console.log(countries)
    const [input,setInput] = useState({
        name: "",
        duration:"",
        difficulty:"",
        season:"",
        countriesId: [],
    })
    console.log(input)
    function handleInputChange(i){
        switch(i.target.name){
            case "name":
                return(
                    setInput({
                        ...input,
                        [i.target.name]:i.target.value
                    })
                )
            case "duration":
                return(
                    setInput({
                        ...input,
                        [i.target.name]:i.target.value
                    })
                 )
            case "difficulty":
                return(
                    setInput({
                        ...input,
                        [i.target.name]:i.target.value
                     })
                )
            case "season":
                if(!input.season.includes(i.target.value) && input.season.length < 4){
                    return(
                    setInput({
                        ...input,
                        [i.target.name]:[...input.season,i.target.value]
                    })
                )}
                break;
            case "countriesId":
                if(!input.countriesId.includes(i.target.value) && input.countriesId.length <10){
                    return(
                    setInput({
                        ...input,
                        [i.target.name]:[...input.countriesId,i.target.value]
                    })
                )}
                break;
            default: break;
        }
    }

    function daysLimit (data){
        switch(data.length){
            case 1:
                return(91)
            case 2:
                return(91*2)
            case 3:
                return(91*3)
            case 4:
                    return(365)
            default: return (0);
        }
    }

    function handleRemove(e){
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: input[e.target.name].filter(item => item !== e.target.value)
        })
    }

    return (
        <div>
            <Nav/>
            <div className="formularyPage">
            <h1>Agregar Actividad</h1>

            <form className='addForm'>
                <h3>Nombre de la actividad:</h3>
                <input className='nameInput' type='text' placeholder="Nombre de la actividad..."
                name='name' value={input.name} onChange={handleInputChange}/>
               
                <h4>Dificultad</h4><p id='P2'>1(Facil) - 5(Dificil)</p>
                <input className='diffInput' type='range' min='1' max='5'step='1'
                name='difficulty' value={input.difficulty} onChange={handleInputChange}/>
                <span>{input.difficulty? input.difficulty : 3}</span>
                
                <h4>Temporada</h4><p id='P2'>¿En que temporadas se puede realizar la actividad?</p>
                <select className='seasonInput' name="season" id="seasonsSelector" onChange={handleInputChange}>
                    <option hidden value='Escoge la temporada'>Escoge la temporada...</option>
                    <option value='Verano'>Verano</option>
                    <option value='Otoño'>Otoño</option>
                    <option value='Invierno'>Invierno</option>
                    <option value='Primavera'>Primavera</option>
                </select>

                {input.season && input.season.map((season)=>{
                    return(
                        <button key={season} name="season" value={season} onClick={handleRemove}>{season}</button>
                    )
                })}

                <h4>Duración</h4><p id='P2'>¿Cuantos días dura la actividad?</p>
                <input className='timeInput' type='range' min={input.season.length ? 1 : 0} max={daysLimit(input.season)} step='1' 
                name='duration' value={input.duration} onChange={handleInputChange}/>
                <span>{input.duration? input.duration : 0} días</span>
                           
                <h4>Países</h4><p id='P2'>¿En que países hay esta actividad?</p>
                <select name="countriesId" id="countriesSelector" onChange={handleInputChange} multiple={true} size={10}>
                    <option hidden value='Escoge el país...'>Escoge el país...</option>
                    {countries && countries.map((country)=>{return(
                        <option key={country.id} value={country.name}>{country.name}</option>
                            )})}
                </select>

                {input.countriesId && input.countriesId.map((country)=>{
                    return(
                        <button key={country} name="countriesId" value={country} onClick={handleRemove}>{country}</button>
                    )
                })}        

            </form>
            </div>
        </div>
    )
}