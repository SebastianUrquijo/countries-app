import {useSelector, useDispatch} from 'react-redux'
import { useState,useEffect } from 'react'
import {sortAndFilter} from '../reducer/actions'
import '../styles/Sort.css'

export default function Sort({setCountriesXPage,setCurrentPage}){
    const activities = useSelector(state=>state.activities)
    console.log(activities)
    const [sort,setSort] =useState({
        order:"ascending",
        activities: "all",
        continents: "all",
        data: "name",

    })
    const dispatch = useDispatch()
    const handleChange = (event)=>{
        setSort({
            ...sort,
            [event.target.name]: event.target.value,
        })
        setCurrentPage(1)
    }
    
    const handleCountryXPage = (event)=>{setCountriesXPage(event.target.value);
    setCurrentPage(1)};
    
    useEffect(()=>{
        dispatch(sortAndFilter(sort))
    },[dispatch,sort]);

    return(
        <div>
            <form className='sortForm'>
                <div>
                    <select className='orderOption' name='order' id='orderSelection' onChange={handleChange}>
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
                <div className='formBox'>
                    <div className='formOptions'>
                        <select className='activitiesOption' name='activities' id='activitiesFilter' onChange={handleChange}>
                            <option value='all'>All</option>
                            {activities && activities.map((a)=>{return(
                                <option key={a.id} value={a.name}>{a.name}</option>
                            )})}
                        </select>
                        <select className='continentsOption' name='continents' id='continentsFilter' onChange={handleChange}>
                            <option value='all'>All</option>
                            <option value='Europe'>Europa</option>
                            <option value='Asia'>Asia</option>
                            <option value='Africa'>Africa</option>
                            <option value='Oceania'>Oceania</option>
                            <option value='America'>America</option>
                            <option value='Antarctica'>Antartica</option>
                        </select>
                        <select className='dataOption' name='data' id='dataOrder' onChange={handleChange}>
                            <option value='name'>Name</option>
                            <option value='population'>Population</option>
                        </select>
                    </div>
                    <div className='paginationBox'>
                        <select className='paginationOptions' name='boxes' id='boxes' onChange={handleCountryXPage}>
                            <option value="10">10</option>
                            <option value="20">20</option>
                            <option value="30">30</option>
                            <option value="40">40</option>
                        </select>
                    </div>
                </div>
            </form>
        </div>
    )

}