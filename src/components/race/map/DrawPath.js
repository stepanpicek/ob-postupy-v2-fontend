import { useEffect, useRef, useState } from "react";
import { Polyline, useMap, useMapEvent, useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { manualPathActions } from "../../../store/manual-path";
import Finish from "./control/Finish";
import Start from "./control/Start";
import Control from "./control/Control";
import DrawLine from "./DrawLine";
import classes from "./DrawPath.module.css";
import L from 'leaflet';

const DrawPath = () => {
    const dispatch = useDispatch();
    const map = useMap();
    const points = useSelector((state) => state.manualPath.points);
    const isOpened = useSelector((state) => state.manualPath.isOpened);
    const isEnd = useSelector((state) => state.manualPath.isEnd);
    const course = useSelector((state) => state.race.course);
    const [initData, setInitData] = useState([]);
    const [controls, setControls] = useState([]);
    const [controlOpacity, setControlOpacity] = useState(0.2);
    const nextControl = useSelector((state) => state.manualPath.nextControl);    

    const nearToControlEvent = (event) => {
        if(nextControl == 0 || isEnd) return;
        let distance = map.distance(course[nextControl].center, event.latlng);
        if (distance < 8) {
            setControlOpacity(0.6);
        }
        else {            
            setControlOpacity(0.2);
        }
    }  

    useMapEvent('mousemove', nearToControlEvent);

    const controlsEvents = {
        click: (event) => {
            let distance = map.distance(course[nextControl].center, event.latlng);
            if (distance < 8) {
                dispatch(manualPathActions.addPoint({ center: course[nextControl].center, isControl: true }));
                setControlOpacity(0.2);
            }
        }
    }

    const initEvents = {
        click: () => {
            map.removeEventListener('click');
            dispatch(manualPathActions.addPoint({ center: course[nextControl].center, isControl: true }));
        },
        mouseover: () => {
            setControlOpacity(0.6);
        },
        mouseout: () => {
            setControlOpacity(0.2);
        }
    }    

    useEffect(() => {
        if (!course) return;
        dispatch(manualPathActions.setControls(course.length));
    }, [course])

    useEffect(() => {
        if (!isOpened) return;
        if (course.length > 0 && nextControl == 0) {
            setInitData(getControl(initEvents));
        }

    }, [isOpened, nextControl, controlOpacity]);

    useEffect(() => {
        if (!isOpened || nextControl == 0) return;
        if (isEnd) {
            setInitData(null);
            return;
        }
        setInitData(getControl(controlsEvents));

    }, [nextControl, controlOpacity]);

    useEffect(() => {
        if(isOpened){
            L.DomUtil.addClass(map.getContainer(), classes.drawCursor);
        }
        else{
            L.DomUtil.removeClass(map.getContainer(), classes.drawCursor);
        }

    }, [isOpened])

    const getControl = (events) => {
        let control = course[nextControl];
        let props = {
            radius: control.radius,
            center: control.center,
            isDrawing: true,
            opacity: controlOpacity,
            eventHandlers: events
        }
        switch (control.type) {
            case 'Finish':
                return <Finish {...props} />;
            case 'Start':
                return <Start {...props} nextControl={control.nextControl} />;
            case 'Control':
                return <Control {...props} ang />;
        }
    }

    return (
        <>
            {isOpened && points.length > 0 &&
                <>
                    {points.map((point, index) => {
                        if (index + 1 < points.length) {
                            return <Polyline key={index} positions={[point.center, points[index + 1].center]} pathOptions={{
                                color: '#0345fc',
                                weight: 3,
                                opacity: 1.0,
                                interactive: false
                            }} />
                        }
                        return null;
                    })}
                    {!isEnd && <DrawLine actualControl={course[nextControl-1].center} />}

                </>}
            {isOpened && initData}
        </>
    );
}

export default DrawPath;