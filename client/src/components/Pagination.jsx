import '../styles/Pagination.css'

export default function Pagination({currentPage,countriesXPage,totalCountries,setCurrentPage}){
    const totalPages = Math.ceil(totalCountries/countriesXPage)
    const pages = []
    for (let i = 1; i <= totalPages; i++) {
        pages.push(i)}
        
        return(
            <div className="paginationBox">
                {pages.length? pages.map((page)=>(
                    <button
                        key={page}
                        className={page === currentPage ? "pageActive" : "page"}
                        onClick={()=>setCurrentPage(page)}
                        >
                            {page}
                    </button>
                )):<></>}
            </div>
        )
}