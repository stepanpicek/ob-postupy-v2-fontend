import { Circle } from "react-leaflet";
import classes from '../DrawPath.module.css';

const Finish = ({ center, radius, isDrawing, opacity, eventHandlers }) => {
    return (
        <>
            {!isDrawing &&
                <>
                    <Circle center={center} pathOptions={{
                        color: '#ff3399',
                        weight: 5,
                        fillOpacity: 0,
                        interactive: false
                    }} radius={radius} />

                    <Circle center={center} pathOptions={{
                        color: '#ff3399',
                        weight: 5,
                        fillOpacity: 0,
                        interactive: false
                    }} radius={radius - Math.ceil((radius / 50) * 15)} />
                </>
            }
            {isDrawing &&
                <>
                    <Circle center={center} pathOptions={{
                        color: '#0388fc',
                        weight: 15,
                        opacity: 0.8,
                        fillOpacity: opacity,
                        interactive: false,
                    }} radius={radius} eventHandlers={eventHandlers} className={classes.drawCursor} />
                </>
            }

        </>
    );
};

export default Finish;