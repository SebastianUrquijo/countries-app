export default function Activity({name,difficulty,duration,season}){
    return(
        <div className="activityArea">
            <h4>{name}</h4>
                <div className="levelArea">
                <h4>Nivel de dificultad (1-5)</h4>
                <p>{difficulty}</p>
                </div>
            <div className="timesArea">
            <p>{duration} Días</p>
            <h5>Temporada(s)</h5>
            <p>{season} </p>
            </div>
        </div>
    )
}