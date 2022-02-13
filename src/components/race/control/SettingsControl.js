import { Box, Divider, Slider, Typography } from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { raceActions } from "../../../store/race";

const SettingsControl = () => {
    const dispatch = useDispatch();
    const transparency = useSelector((state) => state.race.mapTransparency);
    const handleChangeTransparency = (event) => {
        dispatch(raceActions.changeMapTransparency(event.target.value))
    }

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            px: 3
        }} >
            <Typography variant="h6">Nastavení</Typography>
            Průhlednost mapy:
            <Slider
                color="secondary"
                valueLabelDisplay="auto"
                value={typeof transparency === 'number' ? transparency : 0}
                onChange={handleChangeTransparency}
            />
            Šířka ocasu:
            <Slider
                color="secondary"
                valueLabelDisplay="auto"
                value={0}
                onChange={() => {}}
            />
            Délka ocasu:
            <Slider
                color="secondary"
                valueLabelDisplay="auto"
                value={0}
                onChange={() => {}}
            />
            Velikost hlavičky:
            <Slider
                color="secondary"
                valueLabelDisplay="auto"
                value={0}
                onChange={() => {}}
            />
        </Box>
    );
}

export default SettingsControl;