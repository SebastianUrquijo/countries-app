import Nav from './Nav'
import Banner from './Banner'
import React,{/* useEffect, */ useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import '../styles/Form.css'
import validations from '../reducer/validations'
import { addActivityCheck, getCountriesDb} from '../reducer/actions'
import { useNavigate } from 'react-router-dom'

export default function Form(){
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const countriesData = useSelector((state)=>state.countriesRestore)
    const countries = countriesData && countriesData.sort((a,b)=>a.name.localeCompare(b.name))
    const activities = useSelector((state)=>state.activities)
    
    const [keyword,setKeyword] = useState("")
    const [isOpen,setIsOpen] =useState(false)
    
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
        setErrors(validations({...input,[i.target.name]:i.target.value},activities))
        setInput({...input,[i.target.name]:i.target.value})            
    }
    
    function handleArrayChange(i){
        switch(i.target.name){
        case "season":
                if(!input.season.includes(i.target.value) && input.season.length < 4){
                    return(
                    setErrors(validations({
                        ...input,
                        [i.target.name]:[i.target.value]
                    })),
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
                    }),
                    setErrors(validations({
                        ...input,
                        [i.target.name]:[i.target.value]
                    }))
                )}
                break;
            default: break;
    }}

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
        const data = {
        name: input.name || "",
        duration: input.duration || "",
        difficulty: input.difficulty || "",
        season: input.season || "",
        countriesId: input.countriesId || "",
        }
        console.log(data)
        setErrors(validations(data,activities))
        if(Object.keys(errors).length === 0
        && input.name !== ""
        && input.difficulty !== ""
        && input.season.length >0
        && input.duration !== ""
        && input.countriesId.length > 0
        ){
        let response = null

        response = await fetch('http://localhost:3001/activity',
                {method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
            body: JSON.stringify(data)
            })
        const result = await response.json()
        console.log(result)
        setKeyword(result.msg)
        if(!isOpen && result){
            setIsOpen(state => !state);
        if(result.msg === "Activity added successfully"){
            dispatch(addActivityCheck(result.name))
            dispatch(getCountriesDb())
            setInput({
                name:"",
                difficulty: "",
                season: [],
                duration: "",
                countriesId: []
            })
            }
        }
        }
    }

    /* useEffect(() =>{
        dispatch(getCountriesDb())
        },[dispatch]); */
    return (
        <div className='formPage'>
            <div className="navSector">
            <Nav/>
            </div>
            <div className="formularyPage">
            <h1>Agregar Actividad</h1>

            <form className='addForm' onSubmit={handleSubmit}>
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
                <select className={errors.season && "danger"} name="season" id="seasonsSelector" onChange={handleArrayChange}>
                    <option hidden value='Escoge la temporada'>Escoge la temporada...</option>
                    <option value='Verano'>Verano</option>
                    <option value='Otoño'>Otoño</option>
                    <option value='Invierno'>Invierno</option>
                    <option value='Primavera'>Primavera</option>
                </select>
                {errors.season && (<p className='danger'>{errors.season}</p>)}
            </div>
            <div>
                {input.season?.length && input.season.map((season)=>{
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
                <select className={errors.countriesId && "danger"} name="countriesId" id="countriesSelector" onChange={handleArrayChange} multiple={true} size={10}>
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
                {Object.keys(errors).length === 0 && Object.keys(input).length > 0 && 
                <input type='submit' value= "Create Activity" className='finalButton'onClick={handleSubmit}/>   
            }
            </div>
            </form>
            <Banner isOpen={isOpen} setIsOpen={setIsOpen}>
                {keyword.length ? (
                    <>
                    <h2>{keyword}</h2>
                    {keyword === "Activity added successfully" ? (
                        <button onClick={()=> navigate("/countries",{replace:true})}className='bannerUpdate'> 
                            Go to Countries
                        </button>
                    ): (
                        <button onClick={()=> setIsOpen(state=>!state)}>Ok</button>
                    )}
                    </>
                ):(
                    <h2>Invalid Data</h2>
                )}
            </Banner>
            </div>
        </div>
    )
}