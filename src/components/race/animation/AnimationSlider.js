import { useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { animationActions } from "../../../store/animation";

const AnimationSlider = () => {
    const dispatch = useDispatch();
    const index = useSelector((state) => state.animation.actualIndex);
    const min = useSelector((state) => state.animation.minIndex);
    const max = useSelector((state) => state.animation.maxIndex);
    
    const handleChangeSlider = (event) => {
        dispatch(animationActions.updatePosition({id: event.target.value, isSliding: true}));
    }
    return(       
        <Form.Range value={index} min={min} max={max} onChange={handleChangeSlider} /> 
    );
}

export default AnimationSlider;