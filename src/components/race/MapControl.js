import Course from "./map/Course";
import MapLayers from "./map/MapLayers";
import OMap from "./map/Omap";
import SnakesAnimation from "./map/SnakesAnimation";

const MapControl = () => {
    return (
        <>
            <MapLayers />
            <OMap />
            <Course />
            <SnakesAnimation />
        </>
    );
}

export default MapControl;