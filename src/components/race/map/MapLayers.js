import { LayersControl, TileLayer } from "react-leaflet";
const MapLayers = () => {
    return (
        <>
            <LayersControl position="topright">
                <LayersControl.BaseLayer checked name="Mapy.cz turistická">
                    <TileLayer url="https://mapserver.mapy.cz/turist-m/{z}-{x}-{y}" />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer checked name="Mapy.cz základní">
                    <TileLayer url="https://mapserver.mapy.cz/base-m/{z}-{x}-{y}" />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="Mapy.cz satelitní">
                    <TileLayer url="https://mapserver.mapy.cz/ophoto-m/{z}-{x}-{y}" />
                </LayersControl.BaseLayer>
                <LayersControl.BaseLayer name="OpenStreetMap základní">
                    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                </LayersControl.BaseLayer>
            </LayersControl>
         </>
    );
}

export default MapLayers;