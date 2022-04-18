import {useSelector, useDispatch} from 'react-redux'
import { useState,useEffect } from 'react'
import {sortAndFilter} from '../reducer/actions'

export default function Sort({setCountriesXPage,setCurrentPage}){
    const activities = useSelector(state=>state.activities)
    const [sort,setSort] =useState({
        order:"ascending",
        activities: "all",
        continents: "all",
        data: "name",

    })
    const dispatch = useDispatch()
    const handleChange = (e)=> {setSort((prev)=>({...prev,[e.target.name]:e.target.value}))
    setCurrentPage(1)};
    const handleCountryXPage = (e)=>{setCountriesXPage(e.target.value);
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
                            <option value='all'>all</option>
                            {activities && activities.map((a)=>{return(
                                <option key={a.id} value={a.name}>{a.name}</option>
                            )})}
                        </select>
                        <select className='dataOption' name='data' id='dataOrder' onChange={handleChange}>
                            <option value='name'>name</option>
                            <option value='population'>population</option>
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