import { Circle } from "react-leaflet";

const Finish = ({ center, radius }) => {
    return (
        <>
            <Circle center={center} pathOptions={{
                color: '#ff3399',
                weight: 5,
                fillOpacity: 0,
                interactive: false
            }} radius={radius}/>

            <Circle center={center} pathOptions={{
                color: '#ff3399',
                weight: 5,
                fillOpacity: 0,
                interactive: false
            }} radius={radius- Math.ceil((radius/50)*15)}/>

        </>
    );
};

export default Finish;