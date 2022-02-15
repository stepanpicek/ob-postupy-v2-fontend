import { latLng, latLngBounds } from "leaflet";
import { useEffect, useState } from "react";
import { useMap } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import "leaflet-imageoverlay-rotated";
import L from "leaflet";
import { raceActions } from "../../../store/race";

const OMap = () => {
    const { isLoading, error, sendRequest } = useHttp();
    const [corners, setCorners] = useState([]);
    const [image, setImage] = useState(null);
    const [imageLayer, setImageLayer] = useState(null);
    const mapLayer = useMap();
    const raceId = useSelector((state) => state.race.raceId);
    const transparency = useSelector((state) => state.race.mapTransparency);    
    const dispatch = useDispatch();    

    useEffect(() => {
        if (!raceId) return;

        sendRequest({ url: `https://localhost:44302/maps/image?raceKey=${raceId}`, responseType: 'blob' }, (data) => {
            let objectURL = URL.createObjectURL(data);
            let image = new Image();
            image.src = objectURL;
            setImage(image);
        });
        sendRequest({ url: `https://localhost:44302/maps/race?raceKey=${raceId}` }, (data) => {
            dispatch(raceActions.addMapScale(data.scale));
            setCorners(data.corners);
        });
    }, [raceId, setCorners]);

    useEffect(() => {
        if (!corners || corners.length === 0) return;

        mapLayer.fitBounds(latLngBounds(latLng(corners[0].lat, corners[0].lon), latLng(corners[3].lat, corners[3].lon)));

    }, [corners]);

    useEffect(() => {
        if (!corners || corners.length === 0 || !image) return;

        if (imageLayer) mapLayer.removeLayer(imageLayer);
        let imgLayer = L.imageOverlay.rotated(
            image,
            latLng(corners[0].lat, corners[0].lon),
            latLng(corners[1].lat, corners[1].lon),
            latLng(corners[2].lat, corners[2].lon),
            { opacity: transparency/100 });

        setImageLayer(imgLayer);
        mapLayer.addLayer(imgLayer);


    }, [corners, image, transparency]);

    return (<></>);
}

export default OMap;