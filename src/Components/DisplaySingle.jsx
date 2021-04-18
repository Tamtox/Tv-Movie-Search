import '../Styles/DisplaySingle.scss';
import DisplayMulti from './DisplayMulti';
function DisplaySingle(props) {
    console.log(props.profile)
    const genres = {"12": "Adventure","14": "Fantasy","16": "Animation","18": "Drama","27": "Horror","28": "Action","35": "Comedy","36": "History","37": "Western","53": "Thriller","80": "Crime","99": "Documentary","878": "Science Fiction","9648": "Mystery","10402": "Music","10749": "Romance","10751": "Family","10752": "War","10770": "TV Movie"}
    let detailed = null;
    // Display person
    if(props.profile.media_type === 'person') {
        detailed =(
            <div id="person">
                <img id="image" src={props.profile.profile_path===null?'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg':`https://image.tmdb.org/t/p/original${props.profile.profile_path}`} alt="" />
                <button id="goBack" onClick={props.toggleMulti}>Back</button>
                <div id="name">{props.profile.name}</div>
                <div id="gender">{`Gender: ${props.profile.gender===1?'Female':"Male"}`}</div>
                <div id="department">{`Department: ${props.profile.known_for_department}`}</div>
                <div id="knownForContainer">
                    <div id="knownForTitle">Known For:</div>
                    <div id="knownFor">{
                        props.profile.known_for.map((item,index)=>{
                            if(item.media_type === 'person') {
                                return <DisplayMulti key={index} title={item.name} image={item.profile_path} toggleDetailed={()=>this.toggleDetailed(index)}/>
                            }
                            else {
                                if(item.title === undefined) {
                                    return <DisplayMulti key={index} title={item.name} image={item.poster_path} toggleDetailed={()=>this.toggleDetailed(index)}/>
                                }
                                else {
                                    return <DisplayMulti key={index} title={item.title} image={item.poster_path} toggleDetailed={()=>this.toggleDetailed(index)}/>
                                }
                            }
                        })
                    }</div>
                </div>
            </div>
        )
    }
    // Display title
    else {
        const genresArr = []
        for(let id of props.profile.genre_ids) {
            genresArr.push(genres[id])
        }
        detailed =(
            <div id="title">
                <img id="image" src={props.profile.poster_path===null?'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg':`https://image.tmdb.org/t/p/original${props.profile.poster_path}`} alt="" />
                <button id="goBack" onClick={props.toggleMulti}>Back</button>
                <div id="name">{props.profile.title === undefined?props.profile.name:props.profile.title}</div>
                <div id="description">{props.profile.overview}</div>
                <div id="release-date">{props.profile.release_date===undefined?`Air Date: ${props.profile.first_air_date}`:`Release Date: ${props.profile.release_date}`}</div>
                <div id="genres">{`${genresArr.length===1?'Genre':'Genres'}: ${genresArr.join(",")}`}</div>
                <div id="score">{`Score: ${props.profile.vote_average}`}</div>
            </div>
        )
    }
    return (
        <div id="displaySingle">
            {detailed}
        </div>
    )
}
export default DisplaySingle
