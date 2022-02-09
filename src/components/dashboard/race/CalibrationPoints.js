import {useMapEvent, Circle } from "react-leaflet";

const CalibrationPoints = ({calibrationPoints, onSetCalibrationPoints}) => {
    const map = useMapEvent('click', (event) => {
        if(calibrationPoints.length < 3){
            onSetCalibrationPoints(event.latlng)
        }
    });

    const getColor = (index) => {
        switch(index){
            case 0:
                return 'blue';
            case 1:
                return 'red';
            case 2:
                return 'green';
        }
        return 'white';
    }

    return (
    <>
        {calibrationPoints.map((item, index) => {
            let color = getColor(index);
            return(<Circle key={index} center={item} pathOptions={{ fillColor: color, color: color }} radius={50} />);            
        })}
    </>
    );
}

export default CalibrationPoints;