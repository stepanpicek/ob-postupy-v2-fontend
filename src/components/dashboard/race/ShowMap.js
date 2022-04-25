import { latLng, latLngBounds } from "leaflet";
import { memo, useEffect, useRef, useState } from "react";
import { useMap } from "react-leaflet";
import "leaflet-imageoverlay-rotated";
import L from "leaflet";
import MapLayers from "../../race/map/MapLayers";

const ShowMap = ({ data, transparency }) => {
    const mapLayer = useMap();
    const [image, setImage] = useState(null);

    useEffect(() => {
        if (!data.corners || data.corners.length === 0) return;

        mapLayer.fitBounds(latLngBounds(latLng(data.corners[0].lat, data.corners[0].lon), latLng(data.corners[3].lat, data.corners[3].lon)));

    }, [data.corners]);

    useEffect(() => {
        if (!data.corners || data.corners.length === 0 || !data.image) return;

        if(image) mapLayer.removeControl(image);
        let img = L.imageOverlay.rotated(
            data.image,
            latLng(data.corners[0].lat, data.corners[0].lon),
            latLng(data.corners[1].lat, data.corners[1].lon),
            latLng(data.corners[2].lat, data.corners[2].lon),
            { opacity: transparency / 100 });
            
        setImage(img);
        mapLayer.addLayer(img);

    }, [data, transparency]);

    return (<MapLayers />);
}
export default memo(ShowMap);