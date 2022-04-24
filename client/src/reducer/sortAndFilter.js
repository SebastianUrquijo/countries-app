
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
            /* const temp = allCountries.filter(function (obj){
                if(obj.activities && obj.activities.length > 0){
                  for(let i = 0; i<obj.activities.length; i++){
                    if(obj.activities[i].name === activities)return obj
                  }
                }return null
              }) */
              const temp = allCountries.filter((e)=> e.activities.length)
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
            /* const temp = allCountries.filter((obj)=>{
                if(obj.activities && obj.activities.length > 0){
                  for(let i = 0; i<obj.activities.length; i++){
                    if(obj.activities[i].name === activities)return obj
                  }
                }return "No tiene actividad"
              }) */
              const temp = allCountries.filter((e)=> e.activities.length >0)
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