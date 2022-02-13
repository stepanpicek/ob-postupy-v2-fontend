import { Circle, useMap, useMapEvent } from "react-leaflet";
import { metersToPixels, position } from "../../../../services/geo";
import L from 'leaflet';
import { useEffect, useState } from "react";
import './Control.css';

const Control = ({ center, radius, label }) => {
    const map = useMap();
    const [labelMarker, setLabelMarker] = useState(null);
    const [zoomLevel, setZoomLevel] = useState(5);
    const mapEvent = useMapEvent('zoomend', () => { setZoomLevel(mapEvent.getZoom()) });

    const addLabel = () => {
        if (!label || !label.angles || !center) null;
        let angles = label.angles;
        let diff = angles[0] > angles[1] ? angles[0] - angles[1] : angles[1] - angles[0];
        let angleOfLabel = 0;
        if (diff > 180) {
            angleOfLabel = angles[0] > angles[1] ? (diff / 2) + angles[1] : (diff / 2) + angles[0];
        }
        else {
            diff = 360 - diff;
            angleOfLabel = angles[0] > angles[1] ? ((diff / 2) + angles[0]) % 360 : ((diff / 2) + angles[1]) % 360;
        }
        let fontSize = metersToPixels(radius*1.5, mapEvent);
        setLabelMarker((state) => {
            if (state) map.removeLayer(state);
            let icon = L.marker(position(center, getOffset(angleOfLabel), angleOfLabel),
                { icon: L.divIcon({ html: `<div style="font-size: ${fontSize}px;">${label.number}</div>`, className:"control-label" }) });
            map.addLayer(icon);
            return icon;
        });
    }

    const getOffset = (angle) => {
        if(angle > 220 && angle< 360){
            if(label.number > 10) return radius * 4;
            if(label.number > 100) return radius * 5;
            return radius * 3;
        }
        else if(angle > 0 && angle < 120){
            return radius * 3;
        }

        return radius * 2;
    }

    useEffect(() => {
        return function cleanup() {
            if (labelMarker) map.removeLayer(labelMarker);
        }
    });

    useEffect(() => {
        addLabel();
    }, [zoomLevel]);

    useEffect(() => {
        setZoomLevel(mapEvent.getZoom());
    }, []);

    return (
        <>
            <Circle center={center} pathOptions={{
                color: '#ff3399',
                weight: 5,
                fillOpacity: 0,
                interactive: false
            }} radius={radius} >
            </Circle>
        </>
    );
};

export default Control;