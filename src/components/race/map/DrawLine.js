import { useEffect, useRef, useState } from "react";
import { Polyline, useMap, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { manualPathActions } from "../../../store/manual-path";
import classes from "./DrawPath.module.css";
import L from 'leaflet';

const DrawLine = ({ actualControl }) => {
    const dispatch = useDispatch();
    const map = useMap();
    const [movePoint, setMovePoint] = useState([0, 0]);
    const lastPoint = useSelector((state) => state.manualPath.lastPoint);
    const polyline = useRef();

    const handleMapMouseMove = (event) => {
        setMovePoint(event.latlng);
    }

    const handleMapMouseClick = (event) => {
        let distance = map.distance(actualControl, event.latlng);
        console.log(distance);
        if (distance >= 8) {
            dispatch(manualPathActions.addPoint({ center: event.latlng, isControl: false }));
        }
    }

    useMapEvents({
        mousemove: handleMapMouseMove,
        click: handleMapMouseClick
    });

    useEffect(() => {
        console.log(polyline.current);
        if(polyline){
            //L.DomUtil.addClass(polyline.current, classes.drawCursor);
        }
    }, []);

    return (
        <Polyline positions={[lastPoint.center, movePoint]} ref={polyline} pathOptions={{
            color: '#0345fc',
            weight: 3,
            opacity: 1.0,
            interactive: false
        }} className={classes.drawCursor} />
    );
}

export default DrawLine;