import { MapContainer, TileLayer, ImageOverlay } from "react-leaflet";
import { CRS } from 'leaflet';
import { useContext, useEffect, useState } from "react";
import CalibrationPoints from "./CalibrationPoints";
import CalibrationContext from "../../../store/calibration-context";
import "./Calibration.css";
import useHttp from "../../../hooks/use-http";

const CalibratedOMap = ({ raceId, mapImage, setMapImage }) => {
    const initialPosition = [50.0835494, 14.4341414];
    const [mapImgDimensions, setMapImgDimensions] = useState({});
    const calibCtx = useContext(CalibrationContext);
    const { isLoading, sendRequest } = useHttp();

    useEffect(() => {
        sendRequest({
            url: `${process.env.REACT_APP_BACKEND_URI}/map/image/${raceId}`,
            responseType: 'blob'
        }, (image) => {
            let mapImg = new Image();
            mapImg.src = URL.createObjectURL(image)
            mapImg.onload = () => {
                setMapImage({
                    height: mapImg.height,
                    width: mapImg.width,
                    url: mapImg.src
                });
            };
        }).catch(() => { });
    }, [raceId])

    return (
        <>
            {mapImage && mapImage.width && mapImage.width > 0 &&
                <MapContainer className='calibration-map' crs={CRS.Simple} center={[mapImage.height / 2, mapImage.width / 2]} zoom={-3} minZoom={-5} maxZoom={5} maxBounds={[[-50, -50], [mapImage.height + 50, mapImage.width + 50]]}>
                    {mapImage.url && <ImageOverlay url={mapImage.url} bounds={[[0, 0], [mapImage.height, mapImage.width]]} />}
                    <CalibrationPoints calibrationPoints={calibCtx.pixelPoints} onSetCalibrationPoints={calibCtx.onAddPixelPoint} />
                </MapContainer>}
        </>

    );
};

export default CalibratedOMap;