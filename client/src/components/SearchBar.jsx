import '../styles/SearchBar.css'

export default function SearchBar(){
    return(
        <div>
        <form>
            <input className='inputSearch' type='search' placeholder='Search any Country' />

            <input className='inputSearch' type='submit' value='Search'/>
        </form>
        </div>
    )
}