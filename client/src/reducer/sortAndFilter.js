
export default function sortAndFilter({order,activities,continents,data},allCountries){
    if(order ==="ascending"){
        if(activities === 'all'){
            if(continents==='all'){
                if(data ==='name'){return allCountries.sort((a,b)=>a[data].localeCompare(b[data]))}
                else{ return allCountries.sort((a,b)=>a[data] -b[data])}
            }else{
                const res = allCountries.filter((country)=>country.continent.includes(continents))
                    if(data === 'name'){return res.sort((a,b)=>a[data].localeCompare(b[data]))}
                    else{return res.sort((a,b)=>a[data] -b[data])}
            }
        }else{
            const temp = allCountries.filter((country)=>{
                if(country.activities.length){
                  for(let i = 0; i < country.activities.length; i++){ 
                    if(country.activities[i].name === activities) {return country}
                  }
                }return null
              })
            if(continents==='all'){
                if(data ==='name'){return temp.sort((a,b)=>a[data].localeCompare(b[data]))}
                else{return temp.sort((a,b)=>a[data] - b[data])}
            }else{
                const aux = temp.filter((country)=>country.continent.includes(continents))
                    if(data === 'name'){return aux.sort((a,b)=>a[data].localeCompare(b[data]))}
                    else{return aux.sort((a,b)=>a[data] - b[data])}
            }
        }
    }
    if(order ==="descending"){
        if(activities === 'all'){
            if(continents==='all'){
                if(data ==='name'){return allCountries.sort((a,b)=>b[data].localeCompare(a[data]))}
                else{return allCountries.sort((a,b)=>b[data] - a[data])}
            }else{
                const res = allCountries.filter((country)=>country.continent.includes(continents))
                    if(data === 'name'){return res.sort((a,b)=>b[data].localeCompare(a[data]))}
                    else{return res.sort((a,b)=>b[data] - a[data])}
            }
        }else{
            const temp = allCountries.filter((country)=>{
                if(country.activities.length){
                  for(let i = 0; i < country.activities.length; i++){ 
                    if(country.activities[i].name === activities) {return country}
                  }
                }return null
              })
            
            if(continents==='all'){
                if(data ==='name'){return temp.sort((a,b)=>b[data].localeCompare(a[data]))}
                else{return temp.sort((a,b)=>b[data] - a[data])}
            }else{
                const aux = temp.filter((country)=>country.continent.includes(continents))
                    if(data === 'name'){return aux.sort((a,b)=>b[data].localeCompare(a[data]))}
                    else{return aux.sort((a,b)=>b[data] - a[data])}
            }
        }
    }
}