import { Polyline } from "react-leaflet";
import { interpolation, distance } from "../../../../services/geo";

const Line = ({ firstCenter, secondCenter, firstRadius, secondRadius }) => {
    const getLine = () => {
        var dist = distance(firstCenter, secondCenter);
        if (dist < firstRadius + secondRadius)
            return null;
        var firstInterpolated = interpolation(firstCenter, secondCenter, dist, firstRadius);
        var secondInterpolated = interpolation(secondCenter, firstCenter, dist, secondRadius);        
        return <Polyline positions={[firstInterpolated, secondInterpolated]} pathOptions={{ color: '#ff3399', weight: 5 }} />;
    }

    return (
        <>
            {getLine()}
        </>
    );
};

export default Line;