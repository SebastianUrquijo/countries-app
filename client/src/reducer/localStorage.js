export const loadState = ()=>{
    try {
        const serializedData = localStorage.getItem("state.allCountries")
        if(serializedData === null){
            return undefined
        }
        return JSON.parse(serializedData)
    } catch (error) {
        return undefined
    }
}

export const saveState = (state)=>{
    try {
        let serializedData = JSON.stringify(state)
        localStorage.setItem("state.allCountries",serializedData)
    } catch (error) {
        console.log(error)
    }
}