import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { animationActions } from "../../../store/animation";
import { raceActions } from "../../../store/race";
import showPath, { showPathActions } from "../../../store/show-path";

const PathSettingsControl = () => {
    const dispatch = useDispatch();
    const weight = useSelector((state) => state.showPath.weight);
    const borderWeight = useSelector((state) => state.showPath.borderWeight);
    const color = useSelector((state) => state.showPath.color);
    const borderColor = useSelector((state) => state.showPath.borderColor);
    const min = useSelector((state) => state.showPath.min);
    const max = useSelector((state) => state.showPath.max);

    const handleChangeWeight = (event) => {
        dispatch(showPathActions.changeWeight(event.target.value));
    }

    const handleChangeBorderWeight = (event) => {
        dispatch(showPathActions.changeBorderWeight(event.target.value));
    }

    const handleChangeMin = (event) => {
        dispatch(showPathActions.changeMin(event.target.value));
    }

    const handleChangeMax = (event) => {
        dispatch(showPathActions.changeMax(event.target.value));
    }

    return (<>
        <div style={{ display: 'flex' }}>Šířka trasy: <b className="mx-2">{weight}px</b></div>
        <Form.Range value={weight} min={0} max={100} onChange={handleChangeWeight} />

        <div style={{ display: 'flex' }}>Šířka okraje trasy: <b className="mx-2">{borderWeight}px</b></div>
        <Form.Range value={borderWeight} min={0} max={25} onChange={handleChangeBorderWeight} />

        <div style={{ display: 'flex' }}>Minimální rychlost: <b className="mx-2">{min}km/h</b></div>
        <Form.Range value={min} min={0} step={0.5} max={30} onChange={handleChangeMin} />

        <div style={{ display: 'flex' }}>Maximalní rychlost: <b className="mx-2">{max}km/h</b></div>
        <Form.Range value={max} min={0} step={0.5} max={30} onChange={handleChangeMax} />
    </>
    );
}

export default PathSettingsControl;