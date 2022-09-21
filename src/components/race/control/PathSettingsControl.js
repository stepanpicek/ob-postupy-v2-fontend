import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { showPathActions } from "../../../store/show-path";
import ColorPicker from "../animation/ColorPicker";

const PathSettingsControl = () => {
    const dispatch = useDispatch();
    const weight = useSelector((state) => state.showPath.weight);
    const transparency = useSelector((state) => state.showPath.transparency);

    const handleChangeWeight = (event) => {
        dispatch(showPathActions.changeWeight(event.target.value));
    }

    const handleChangeTransparency = (event) => {
        dispatch(showPathActions.changeTransparency(100-event.target.value));
    }

    return (<>
        <div style={{ display: 'flex' }}>Šířka trasy: <b className="mx-2">{weight}px</b></div>
        <Form.Range value={weight} min={0} max={100} onChange={handleChangeWeight} />

        <div style={{ display: 'flex' }}>Průhlednost trasy: <b className="mx-2">{100 - transparency}%</b></div>
        <Form.Range value={typeof transparency == 'number' ? 100 - transparency : 100} max={100} onChange={handleChangeTransparency} />
       </>
    );
}

export default PathSettingsControl;