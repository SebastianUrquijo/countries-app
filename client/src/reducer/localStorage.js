export const loadState = ()=>{
    try {
        const serializedData = sessionStorage.getItem("state.allCountries")
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
        sessionStorage.setItem("state.allCountries",serializedData)
    } catch (error) {
        console.log(error)
    }
}