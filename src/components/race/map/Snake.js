import { Circle } from "react-leaflet";

const Snake = ({color, position}) => {
    return(
        <Circle center={position} pathOptions={{
            color: color ?? 'red',
            weight: 5,
            fillOpacity: 1,
            fillColor: color            
        }} radius={8}/>
    );
}

export default Snake;