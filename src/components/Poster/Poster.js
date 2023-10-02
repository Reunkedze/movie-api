const Poster = ({ poster }) => {
    return (
        <div className="img_container">
            <img className="img" src={poster} alt="poster" />
        </div>
    )
}

export default Poster