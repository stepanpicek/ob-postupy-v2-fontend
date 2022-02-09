import { useContext } from "react";
import { LayersControl, MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import CalibrationPoints from "./CalibrationPoints";
import CalibrationContext from "../../../store/calibration-context";

const MapForCalibration = () => {
    const initialPosition = [50.0835494, 14.4341414];
    const calibCtx = useContext(CalibrationContext);
    return (
        <MapContainer center={initialPosition} zoom={11}>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Mapy.cz turistická">
                    <TileLayer url="https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}" />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Mapy.cz satelitní">
                    <TileLayer url="https://mapserver.mapy.cz/ophoto-m/{z}-{x}-{y}" />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenStreetMap základní">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </LayersControl.BaseLayer>
            </LayersControl>
            <CalibrationPoints  calibrationPoints={calibCtx.realPoints} onSetCalibrationPoints={calibCtx.onAddRealPoint}/>
        </MapContainer>
    );
}

export default MapForCalibration;