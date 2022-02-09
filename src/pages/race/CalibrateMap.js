import { Button, Grid } from "@mui/material";
import { useContext } from "react";
import CalibratedOMap from "../../components/dashboard/race/CalibratedOMap";
import MapForCalibration from "../../components/dashboard/race/MapForCalibration";
import CalibrationContext from "../../store/calibration-context";
import "../../components/dashboard/race/Calibration.css";
import { Box } from "@mui/system";

const CalibrateMap = () => {
    const calibCtx = useContext(CalibrationContext);
    
    return (
        <>
            <h1>Kalibrace mapy pro závod: Název</h1>
            <p>Na každé mapě vyberte 3 kalibrační body</p>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <Grid container>
                    <Grid item xs={12} md={6} sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                        <MapForCalibration />
                        <Button onClick={calibCtx.onRemoveRealPoint} variant="outlined"> Smazat poslední bod na reálné mapě</Button>
                    </Grid>
                    <Grid item xs={12} md={6} sx={{ p: 1, display: 'flex', flexDirection: 'column' }}>
                        <CalibratedOMap />
                        <Button onClick={calibCtx.onRemovePixelPoint} variant="outlined"> Smazat poslední bod na O-Mapě</Button>
                    </Grid>
                </Grid>
                <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center'}}>
                    <Button onClick={calibCtx.onRemoveRealPoint} variant="outlined" sx={{mx:1}} color="error" disabled={!calibCtx.isReady}> Zobrazit zkalibrovanou mapu</Button>
                    <Button onClick={calibCtx.onRemoveRealPoint} variant="outlined" sx={{mx:1}} color="success" disabled={!calibCtx.isReady}> Uložit kalibraci</Button>
                </Box>
            </Box>

        </>
    );
}

export default CalibrateMap;