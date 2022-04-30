import { Button } from "@mui/material";
import { useCallback, useContext, useEffect, useState } from "react";
import CalibratedOMap from "../../components/dashboard/race/CalibratedOMap";
import MapForCalibration from "../../components/dashboard/race/MapForCalibration";
import CalibrationContext from "../../store/calibration-context";
import "../../components/dashboard/race/Calibration.css";
import { Box } from "@mui/system";
import { Col, Container, Row } from "react-bootstrap";
import useHttp from "../../hooks/use-http";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../../hooks/use-auth";
import { calibrateMap } from "../../services/geo";
import ShowMapDialog from "../../components/dashboard/race/ShowMapDialog";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import useAlertWrapper from "../../hooks/use-alert";

const CalibrateMap = () => {
    let { raceId } = useParams();
    const navigate = useNavigate();
    const auth = useAuth();
    const calibCtx = useContext(CalibrationContext);
    const [raceData, setRaceData] = useState(null);
    const { isLoading, sendRequest } = useHttp();
    const [mapImg, setMapImg] = useState({});
    const [openDialog, setOpenDialog] = useState(false);
    const [mapData, setMapData] = useState(null);
    const alert = useAlertWrapper();

    useEffect(() => {
        updateData();
    }, [raceId]);

    const updateData = useCallback(() => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/Race/edit/${raceId}`,
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` }
        }, (data) => {
            setRaceData(data);
        }).then((status) => {
            if(status === 401 || status === 400)
            {
                alert.warning("Nemáte oprávnění kalibrovat tuto mapu.");
            }
            if(status)
            {                
                navigate(`/ucet/vytvorit-zavod`);
            }
        });
    });

    const handleCalibrateMap = () => {
        setMapData(calibrateMap(mapImg.width, mapImg.height, calibCtx.realPoints, calibCtx.pixelPoints));
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/map/calibration/`,
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${auth.token}` },
            body: { ...mapData, raceKey: raceId },
            responseType: 'empty'
        })
        .then((status)=> {
            if(!status){
                alert.info("Kalibrace byla uložena.");
            }
        })
        .finally(() => {
            navigate(`/ucet/editovat-zavod/${raceId}`);
        });
    }

    const handleShowCalibratedMap = () => {
        setMapData(
            { ...calibrateMap(mapImg.width, mapImg.height, calibCtx.realPoints, calibCtx.pixelPoints), image: mapImg.url });
        setOpenDialog(true);
    }

    return (
        <>
            <Button startIcon={<ArrowLeftIcon />} onClick={() => {navigate(`/ucet/editovat-zavod/${raceId}`)}}>
                Zpět na editaci závodu
            </Button>
            <h1>Kalibrace mapy pro závod: {raceData && raceData.name}</h1>
            <p>Na každé mapě vyberte 3 kalibrační body</p>
            <Container fluid>
                <Row>
                    <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
                        <MapForCalibration />
                        <Button onClick={calibCtx.onRemoveRealPoint} variant="outlined"> Smazat poslední bod na reálné mapě</Button>
                    </Col>
                    <Col xs={12} md={6} className="d-flex flex-column justify-content-center">
                        <CalibratedOMap raceId={raceId} mapImage={mapImg} setMapImage={setMapImg} />
                        <Button onClick={calibCtx.onRemovePixelPoint} variant="outlined"> Smazat poslední bod na O-Mapě</Button>
                    </Col>
                </Row>
            </Container>
            <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 3 }}>
                <Button onClick={handleShowCalibratedMap} variant="outlined" sx={{ mx: 1 }} color="error" disabled={!calibCtx.isReady}> Zobrazit zkalibrovanou mapu</Button>
                <Button onClick={handleCalibrateMap} variant="outlined" sx={{ mx: 1 }} color="success" disabled={!calibCtx.isReady}> Uložit kalibraci</Button>
            </Box>
            <ShowMapDialog open={openDialog} onClose={() => { setOpenDialog(state => !state) }} data={mapData} />
        </>
    );
}

export default CalibrateMap;