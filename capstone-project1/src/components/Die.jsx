function Die(props) {
    return (
        <button 
            style={{backgroundColor: props.isHeld ? "#59E391" : "white"}} 
            onClick={() => props.hold(props.id)}
            aria-pressed={props.isHeld}
            aria-label={`Die with value ${props.num}, ${props.isHeld ? "held" : "not held"}`}
        >
            {props.num}
        </button>
    )
}

export default Die