export default function Error({title, mess}){
    return(
        <div className="error">
            <h2>{title}</h2>
            <p>{mess}</p>
        </div>
    )
}