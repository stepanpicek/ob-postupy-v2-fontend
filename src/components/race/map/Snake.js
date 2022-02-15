import { Circle, LayerGroup, Polyline, Tooltip } from "react-leaflet";
import { useSelector } from "react-redux";
import './SnakeLabel.css';

const Snake = ({ color, position, name, tail }) => {
    const snakeWidth = useSelector((state) => state.animation.snakeWidth);
    const snakeRadius = useSelector((state) => state.animation.snakeRadius);
    return (
        <>
            <LayerGroup>
                <Circle center={position} pathOptions={{
                    color: color ?? 'red',
                    weight: 8,
                    fillOpacity: 1,
                    fillColor: color
                }} radius={snakeRadius} pane="markerPane" >
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