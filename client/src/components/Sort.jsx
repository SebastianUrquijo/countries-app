import {useSelector, useDispatch} from 'react-redux'
import { useState,useEffect } from 'react'
import {sortAndFilter} from '../reducer/actions'
import SearchBar from './SearchBar'
import '../styles/Sort.css'

export default function Sort({setCountriesXPage,setCurrentPage,dataLength}){
    const activities = useSelector(state=>state.activities)
    const [sort,setSort] =useState({
        order:"ascending",
        activities: "all",
        continents: "all",
        data: "name",
    })
    console.log(activities)
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
            <div className='searchBox'>
            <SearchBar/>
            </div>
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
                    {dataLength >9 ?<div className='paginationBox'>
                        <select className='paginationOptions' name='boxes' id='boxes' onChange={handleCountryXPage}>
                            <option value="9">9</option>
                            <option value="18">18</option>
                            <option value="27">27</option>
                            <option value="36">36</option>
                        </select>
                    </div>:<></>}
                    
                </div>
            </form>
        </div>
    )

}