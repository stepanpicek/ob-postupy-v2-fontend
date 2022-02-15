import { useEffect, useState } from "react";
import { Polyline, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { manualPathActions } from "../../../store/manual-path";

const DrawPath = () => {
    const dispatch = useDispatch();
    const points = useSelector((state) => state.manualPath.points);
    const lastPoint = useSelector((state) => state.manualPath.lastPoint);
    const isOpened = useSelector((state) => state.manualPath.isOpened);
    const course = useSelector((state) => state.race.course);
    const mapScale = useSelector((state) => state.race.mapScale);
    const [initData, setInitData] = useState([]);
    const [controls, setControls] = useState([]);
    const [movePoint, setMovePoint] = useState([0,0]);

    const handleMapMouseMove = (event) => {
        if (isOpened) {
            setMovePoint(event.latlng);
        }
    }

    const handleMapMouseClick = (event) => {
        if (isOpened) {
            dispatch(manualPathActions.addPoint(event.latlng));
        }        
    }

    const map = useMapEvents({
        click: handleMapMouseClick,
        mousemove: handleMapMouseMove
    });

    const initEvent = {
        click: () => {
            console.log("click");
        },
        mouseover: (event) => {
            console.log(event);
            event.sourceTarget.options.pathOptions.opacity = 1;
            event.target.options.pathOptions.opacity = 1;
            event.target.options.opacity = 1;
        }
    }

    useEffect(() => {
        if (!isOpened) return;
        let controls = course.courseControl.slice();
        let center = [controls[0].control.coordinates.item1, controls[0].control.coordinates.item2];
        dispatch(manualPathActions.addPoint(center));

    }, [isOpened]);

    return (
        <>
        {isOpened && points.length > 0 &&
        <>
            {points.map((point, index) => {
                if(index + 1 < points.length){
                    return <Polyline key={index} positions={[point, points[index+1]]} pathOptions={{
                        color: '#0345fc',
                        weight: 3,
                        opacity: 1.0,
                        interactive: false
                    }} />
                }
                return null;
            })}
            <Polyline positions={[lastPoint, movePoint]} pathOptions={{
                color: '#0345fc',
                weight: 3,
                opacity: 1.0,
                interactive: false
            }} />
        </>}</>
    );
}

export default DrawPath;