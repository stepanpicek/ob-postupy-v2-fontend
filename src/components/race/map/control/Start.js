import { Polygon, useMap } from "react-leaflet";
import { distance, interpolation, project, rotation, degreesToRadians, unproject } from "../../../../services/geo";

const Start = ({ center, radius, nextControl }) => {
    const map = useMap();
    
    const getStartCorners = () => {
        var dist = distance(center, nextControl);
        var Ap = interpolation(center, nextControl, dist, radius);
        var centroid = project(center[0], center[1], map);
        var A = project(Ap[0], Ap[1], map);
        var B = rotation([A.x, A.y], [centroid.x, centroid.y], degreesToRadians(120));
        var C = rotation([A.x, A.y], [centroid.x, centroid.y], degreesToRadians(240));
        return [unproject(A, map), unproject(B, map), unproject(C, map)];
     
    }
    return (
        <>
            <Polygon positions={getStartCorners()} pathOptions={{
                color: '#ff3399',
                weight: 5,
                fillOpacity: 0,
                interactive: false
            }}/>
        </>
    );
};

export default Start;