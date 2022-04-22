import Nav from './Nav'
import React,{useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../styles/Form.css'
import validations from '../reducer/validations'
import { addActivity } from '../reducer/actions'

export default function Form(){
    const dispatch = useDispatch()
    const countries = useSelector((state)=>state.countriesRestore)
    const [errors,setErrors]=useState({})
    const [input,setInput] = useState({
        name: "",
        duration:"",
        difficulty:"",
        season:[],
        countriesId: [],
    })
    console.log(input)
    console.log(errors)
    function handleInputChange(i){
        switch(i.target.name){
            case "name":
                return(
                    setInput({
                        ...input,
                        [i.target.name]:i.target.value
                    }),
                    setErrors(validations({
                        ...input,
                        [i.target.name]:i.target.value
                    })
                    )
                )
            case "duration":
                return(
                    setInput({
                        ...input,
                        [i.target.name]:parseInt(i.target.value)
                    }),
                    setErrors(validations({
                        ...input,
                        [i.target.name]:parseInt(i.target.value)
                    }))
                 )
            case "difficulty":
                return(
                    setInput({
                        ...input,
                        [i.target.name]:i.target.value
                     }),
                     setErrors(validations({
                         ...input,
                         [i.target.name]:i.target.value
                     }))
                )
            case "season":
                if(!input.season.includes(i.target.value) && input.season.length < 4){
                    return(
                    setInput({
                        ...input,
                        [i.target.name]:[...input.season,i.target.value]
                    }),
                    setErrors(validations({
                        ...input,
                        [i.target.name]:[i.target.value]
                    }))
                )}
                break;
            case "countriesId":
                if(!input.countriesId.includes(i.target.value) && input.countriesId.length <10){
                    return(
                    setInput({
                        ...input,
                        [i.target.name]:[...input.countriesId,i.target.value]
                    }),
                    setErrors(validations({
                        ...input,
                        [i.target.name]:[i.target.value]
                    },countries))
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
        switch(e.target.name){
            case 'season':
                if(input.season.length === 1){
                    return(
                        setInput({
                        ...input,
                        [e.target.name]: input[e.target.name].filter(item => item !== e.target.value),
                        duration: 0
                    })
                    )
                }
                return(
                    setInput({
                    ...input,
                    [e.target.name]: input[e.target.name].filter(item => item !== e.target.value)
                }))
            case 'countriesId':
                return(
                    setInput({
                    ...input,
                    [e.target.name]: input[e.target.name].filter(item => item !== e.target.value)
                }))
            default: break
        }
    }

    async function handleSubmit(event){
        event.preventDefault()
        await dispatch(addActivity(input))
        setInput({
            name: "",
        duration:"",
        difficulty:"",
        season:[],
        countriesId: [],
        })
    }

    return (
        <div>
            <Nav/>
            <div className="formularyPage">
            <h1>Agregar Actividad</h1>

            <form className='addForm' onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <h3>Nombre de la actividad:</h3>
                <input className={errors.name && "danger"} type='text' placeholder="Nombre de la actividad..."
                name='name' value={input.name} onChange={handleInputChange}/>
                {errors.name && (<p className='danger'>{errors.name}</p>)}
            </div>
            <div>
                <h4>Dificultad</h4><p id='P2'>1(Facil) - 5(Dificil)</p>
                <input className={errors.difficulty && "danger"} type='range' min='1' max='5'step='1'
                name='difficulty' value={input.difficulty} onChange={handleInputChange}/>
                <span>{input.difficulty? input.difficulty : 0}</span>
                {errors.difficulty && (<p className='danger'>{errors.difficulty}</p>)}
            </div>
            <div> 
                <h4>Temporada</h4><p id='P2'>¿En que temporadas se puede realizar la actividad?</p>
                <select className={errors.season && "danger"} name="season" id="seasonsSelector" onChange={handleInputChange}>
                    <option hidden value='Escoge la temporada'>Escoge la temporada...</option>
                    <option value='Verano'>Verano</option>
                    <option value='Otoño'>Otoño</option>
                    <option value='Invierno'>Invierno</option>
                    <option value='Primavera'>Primavera</option>
                </select>
                {errors.season && (<p className='danger'>{errors.season}</p>)}
            </div>
            <div>
                {input.season && input.season.map((season)=>{
                    return(
                        <button key={season} name="season" value={season} onClick={handleRemove}>{season}</button>
                    )
                })}
            </div>
            <div>
                <h4>Duración</h4><p id='P2'>¿Cuantos días dura la actividad?</p>
                <input className={errors.duration && "danger"} type='range' min={input.season.length ? 1 : 0} max={daysLimit(input.season)} step='1' 
                name='duration' value={input.duration} onChange={handleInputChange}/>
                <span>{input.season.length ? input.duration ? input.duration: 0 : 0} días</span>
                {errors.duration && (<p className='danger'>{errors.duration}</p>)}
            </div>   
            <div>           
                <h4>Países</h4><p id='P2'>¿En que países hay esta actividad?</p>
                <select className={errors.countriesId && "danger"} name="countriesId" id="countriesSelector" onChange={handleInputChange} multiple={true} size={10}>
                    {countries && countries.map((country)=>{return(
                        <option key={country.id} value={country.id}>{country.name}</option>
                            )})}
                </select>
                {errors.countriesId && (<p className='danger'>{errors.countriesId}</p>)}
            </div>
            <div>
                {input.countriesId && input.countriesId.map((country)=>{
                    return(
                        <button key={country} name="countriesId" value={country} onClick={handleRemove}>{country}</button>
                    )
                })}        
            </div>
            <div>
                {Object.keys(errors).length === 0 ?
                <button type='submit' className='finalButton'>Agregar Actividad</button>   
            :null}
            </div>
            </form>
            </div>
        </div>
    )
}