import { useEffect, useRef } from "react";
import { Circle, LayerGroup, Polyline, Tooltip } from "react-leaflet";
import { useSelector } from "react-redux";
import './SnakeLabel.css';
import 'leaflet.marker.slideto';

const Snake = ({ color, position, name, tail, nextPosition }) => {
    const snakeWidth = useSelector((state) => state.animation.snakeWidth);
    const snakeRadius = useSelector((state) => state.animation.snakeRadius);
    const isSliding = useSelector((state) => state.animation.isSliding);
    const isPlayed = useSelector((state) => state.animation.isPlayed);
    const speed = useSelector((state) => state.animation.speed);
    const head = useRef();

    useEffect(() => {
        if(isSliding || !nextPosition || !isPlayed) return;
        head.current.slideTo(nextPosition, {
            duration: 1000/speed
        });
    }, [nextPosition, isSliding, isPlayed]);
    return (
        <>
            <LayerGroup>
                <Circle center={position} pathOptions={{
                    color: color ?? 'red',
                    weight: 8,
                    fillOpacity: 1,
                    fillColor: color
                }} radius={snakeRadius} pane="markerPane" ref={head} >
                    <Tooltip opacity={1} className="snake-label"><div style={{ color: color ?? 'red' }}>{name}</div></Tooltip>
                </Circle>
                {tail.length > 1 &&
                    <Polyline positions={tail} pathOptions={{
                        color: color ?? 'red',
                        weight: snakeWidth,
                    }} pane="overlayPane" />
                }
            </LayerGroup>
        </>
    );
}

export default Snake;