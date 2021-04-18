import '../Styles/DisplayMulti.scss';

function DisplayMulti(props) {
    return (
        <div className="card" >
            <img className="cardImage" onClick={props.toggleDetailed} src={props.image===null?'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg':`https://image.tmdb.org/t/p/original${props.image}`} alt="" />
            <p className="cardTitle">{props.title}</p>
        </div>
    )
}
export default DisplayMulti