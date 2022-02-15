import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { animationActions } from "../../../store/animation";
import { raceActions } from "../../../store/race";

const SettingsControl = () => {
    const dispatch = useDispatch();
    const transparency = useSelector((state) => state.race.mapTransparency);
    const snakeSize = useSelector((state) => state.animation.snakeSize);
    const snakeWidth = useSelector((state) => state.animation.snakeWidth);
    const snakeRadius = useSelector((state) => state.animation.snakeRadius);
    const [tailTime, setTailTime] = useState();
    
    const handleChangeTransparency = (event) => {
        dispatch(raceActions.changeMapTransparency(100 - event.target.value))
    }

    const handleChangeSnakeSize = (event) => {
        dispatch(animationActions.changeSnakeSize(event.target.value));
    }

    const handleChangeSnakeWidth = (event) => {
        dispatch(animationActions.changeSnakeWidth(event.target.value));
    }

    const handleChangeSnakeRadius = (event) => {
        dispatch(animationActions.changeSnakeRadius(event.target.value));
    }

    useEffect(() => {
        let minutes = Math.floor(snakeSize / 60);
        let seconds = snakeSize % 60;
        let secondsString = seconds < 10 ? `0${seconds}` : `${seconds}`; 
        setTailTime(`${minutes}:${secondsString}`);
    }, [snakeSize]);

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: 3
        }} >
            <Typography variant="h6">Nastavení</Typography>
            <div style={{display: 'flex'}}>Průhlednost mapy: <b className="mx-2">{100 - transparency}%</b></div>
            <Form.Range value={typeof transparency == 'number' ? 100 - transparency : 100} max={100} onChange={handleChangeTransparency} />              

            <div style={{display: 'flex'}}>Délka ocasu: <b className="mx-2">{tailTime}</b></div>
            <Form.Range value={snakeSize} min={0} step={10} max={1000} onChange={handleChangeSnakeSize} />            

            <div style={{display: 'flex'}}>Šířka ocasu: <b className="mx-2">{snakeWidth}px</b></div>
            <Form.Range value={snakeWidth} onChange={handleChangeSnakeWidth} />    
            
            <div style={{display: 'flex'}}>Velikost hlavičky: <b className="mx-2">{snakeRadius}px</b></div>
            <Form.Range value={snakeRadius} onChange={handleChangeSnakeRadius} />
        </Box>
    );
}

export default SettingsControl;