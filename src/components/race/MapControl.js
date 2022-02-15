import Course from "./map/Course";
import DrawPath from "./map/DrawPath";
import MapLayers from "./map/MapLayers";
import OMap from "./map/Omap";
import SnakeOffset from "./map/SnakeOffset";
import SnakesAnimation from "./map/SnakesAnimation";

const MapControl = () => {
    return (
        <>
            <MapLayers />
            <OMap />
            <Course />
            <SnakesAnimation />
            <DrawPath />
            <SnakeOffset />
        </>
    );
}

export default MapControl;