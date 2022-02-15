import { Circle } from "react-leaflet";

const Finish = ({ center, radius, isDrawing, eventHandlers }) => {
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
                        fillOpacity: 0.2,
                        interactive: false,
                    }} radius={radius} eventHandlers={eventHandlers}/>
                </>
            }

        </>
    );
};

export default Finish;