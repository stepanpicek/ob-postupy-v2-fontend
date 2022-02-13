import { Slider } from "@mui/material";
import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { animationActions } from "../../store/animation";

const AnimationSlider = () => {
    const [index, setIndex] = useState(0);
    const dispatch = useDispatch();
    
    const handleChangeSlider = (event) => {
        setIndex(event.target.value);
        dispatch(animationActions.updatePosition(event.target.value));
    }
    return(       
        <Form.Range value={index} max={5000} onChange={handleChangeSlider} /> 
    );
}

export default AnimationSlider;