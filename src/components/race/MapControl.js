import Course from "./map/Course";
import DrawPath from "./map/DrawPath";
import MapLayers from "./map/MapLayers";
import OMap from "./map/Omap";
import Paths from "./map/Paths";
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
        </>
    );
}

export default MapControl;