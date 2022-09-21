import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showHeatmapActions } from "../../../store/show-heatmap";
import ColorPicker from "../animation/ColorPicker";

const HeatmapSettingsControl = () => {
    const dispatch = useDispatch();
    const weight = useSelector((state) => state.showHeatmap.weight);
    const borderWeight = useSelector((state) => state.showHeatmap.borderWeight);
    const color = useSelector((state) => state.showHeatmap.color);
    const borderColor = useSelector((state) => state.showHeatmap.borderColor);
    const min = useSelector((state) => state.showHeatmap.min);
    const max = useSelector((state) => state.showHeatmap.max);

    const handleChangeWeight = (event) => {
        dispatch(showHeatmapActions.changeWeight(event.target.value));
    }

    const handleChangeBorderWeight = (event) => {
        dispatch(showHeatmapActions.changeBorderWeight(event.target.value));
    }

    const handleChangeMin = (event) => {
        dispatch(showHeatmapActions.changeMin(event.target.value));
    }

    const handleChangeMax = (event) => {
        dispatch(showHeatmapActions.changeMax(event.target.value));
    }

    const handlePalleteColor = (number, newColor) => {
        let newColors = color.slice();
        newColors[number] = newColor.hex;
        dispatch(showHeatmapActions.changeColor(newColors));
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

        <div>Paleta barev:</div>
        <div className="d-flex justify-content-center">
            <ColorPicker color={color[0]} onChangeColor={(newColor) => {handlePalleteColor(0, newColor)}} style={{p: 3}}/>            
            <ColorPicker color={color[1]} onChangeColor={(newColor) => {handlePalleteColor(1, newColor)}} style={{p: 3}}/>
            <ColorPicker color={color[2]} onChangeColor={(newColor) => {handlePalleteColor(2, newColor)}} style={{p: 3}}/>
        </div>
    </>
    );
}

export default HeatmapSettingsControl;