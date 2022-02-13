import { MapContainer, TileLayer, ImageOverlay } from "react-leaflet";
import { CRS } from 'leaflet';
import { useContext, useEffect, useState } from "react";
import CalibrationPoints from "./CalibrationPoints";
import CalibrationContext from "../../../store/calibration-context";

const CalibratedOMap = () => {
    const initialPosition = [50.0835494, 14.4341414];
    const [mapImgDimensions, setMapImgDimensions] = useState({});
    const calibCtx = useContext(CalibrationContext);

    useEffect(() => {
        const mapImg = new Image();
        mapImg.src = "https://obpostupy.orientacnisporty.cz/maps/image?raceKey=3ee33f30c529443eafd557087e8c3c34";
        mapImg.onload = () => {
            setMapImgDimensions({
                height: mapImg.height,
                width: mapImg.width
            });
            console.log(mapImg.height, mapImg.width);
        };
    }, []);

    return (
        <>
            {mapImgDimensions.width && mapImgDimensions.width > 0 &&
                <MapContainer className='calibration-map' crs={CRS.Simple} center={[mapImgDimensions.height/2, mapImgDimensions.width/2]} zoom={-3} minZoom={-5} maxZoom={5} maxBounds={[[-50, -50], [mapImgDimensions.height + 50, mapImgDimensions.width + 50]]}>
                    <ImageOverlay url="https://obpostupy.orientacnisporty.cz/maps/image?raceKey=3ee33f30c529443eafd557087e8c3c34" bounds={[[0, 0], [mapImgDimensions.height, mapImgDimensions.width]]} />
                    <CalibrationPoints  calibrationPoints={calibCtx.pixelPoints} onSetCalibrationPoints={calibCtx.onAddPixelPoint}/>
                </MapContainer>}
        </>

    );
};

export default CalibratedOMap;