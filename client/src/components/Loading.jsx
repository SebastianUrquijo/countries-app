import '../styles/Loading.css'

export default function Loading(){
    const gifs = [
        "https://media.giphy.com/media/lrgtlIdeFruy8ZKsiO/giphy.gif",
        "https://media.giphy.com/media/dZdao4tw1yMquKEYYO/giphy.gif",
        "https://media.giphy.com/media/rReKIvEIc1cXx7qJNS/giphy.gif",
        "https://media.giphy.com/media/l3PRSRFZSSEQ0rtshJ/giphy.gif"
        ]
        //train,ship,landscapes,combi
    return(
        <div className="loadBox">
            <div className="loadBanner">
                <img src={gifs[Math.round(Math.random()*gifs.length -1)]}
                alt="loading img"
                className="loadImage"/>
            </div>
            <div>
                <p className='loadText' data-text="Loading...">Loading...</p>
            </div>
        </div>
    )
}