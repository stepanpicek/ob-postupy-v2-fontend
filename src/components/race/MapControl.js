import { ScaleControl } from "react-leaflet";
import Course from "./map/Course";
import DrawPath from "./map/DrawPath";
import Heatmaps from "./map/Heatmaps";
import MapLayers from "./map/MapLayers";
import OMap from "./map/Omap";
import Paths from "./map/Paths";
import Printer from "./map/Printer";
import SnakeOffset from "./map/SnakeOffset";
import SnakesAnimation from "./map/SnakesAnimation";
import UploadPath from "./map/UploadPath";

const MapControl = () => {
    return (
        <>
            <MapLayers />
            <OMap />
            <Course />
            <SnakesAnimation />
            <DrawPath />
            <SnakeOffset />
            <UploadPath />
            <Paths />
            <Heatmaps />
            <Printer />
            <ScaleControl />
        </>
    );
}

export default MapControl;