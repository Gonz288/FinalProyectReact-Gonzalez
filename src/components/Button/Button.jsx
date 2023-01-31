import React from "react";
import './button.css';

export default function Button(props){
    
    let [colorState, setColorState] = React.useState("orange");

    let styleButton = {
        padding: props.padding,
        backgroundColor: colorState,
    };
    
    function handleClick(evt){
        setColorState("red");
    }

    return (
        <button onClick={handleClick} className='btn-2' style={styleButton}>
            {props.children}
        </button>
    );
}