import '../styles/Activity.css'
export default function Activity({name,difficulty,duration,season}){
    return(
        <div className="activityArea">
            <h4 className='actTitle'><i>{name}</i></h4>
            <div className='actInfo'>    
                <div className="infoBlok">
                <h4>Nivel de dificultad (1-5)</h4>
                <p>{difficulty}</p>
                </div>
                <div className="infoBlok">
                <h4 >Duración</h4>
                <p>{duration} Días</p>
                </div>
                <div className='infoBlok'>
                <h4 >Temporada(s)</h4>
                {season && season.map((temp)=>{
                    return(
                        <p id='temp' className='dimention'>{temp}</p>
                    )
                })}
                </div>
            </div>
        </div>
    )
}