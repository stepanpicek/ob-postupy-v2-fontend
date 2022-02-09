import { createContext, useState, useEffect } from 'react';

const CalibrationContext = createContext({
    realPoints: [],
    pixelPoints: [],
    onAddRealPoint: (point) => { },
    onAddPixelPoint: (point) => { },
    onRemoveRealPoint: () => { },
    onRemovePixelPoint: () => { },
    isReady: false
});

export const CalibrationContextProvider = (props) => {
    const [realPoints, setRealPoints] = useState([]);
    const [pixelPoints, setPixelPoints] = useState([]);
    const [isReady, setIsReady] = useState(false);

    useEffect(()=>{
        checkIfIsReady();
    }, [realPoints, pixelPoints]);

    const addRealPointHandler = (point) => {
        if(realPoints.length < 3){
            setRealPoints(state => [...state, point]);
        }
    }

    const addPixelPointHandler = (point) => {
        if(pixelPoints.length < 3){
            setPixelPoints(state => [...state, point]);
        }        
    }

    const removeRealPointHandler = () => {
        setRealPoints(state => {
            state.pop();
            return [...state];
        });        
    }

    const removePixelPointHandler = () => {
        setPixelPoints(state => {
            state.pop();
            return [...state];
        });
    }

    const checkIfIsReady = () => {        
        if(realPoints.length == 3 && pixelPoints.length == 3){
            setIsReady(true);
        }
        else{
            setIsReady(false);
        }
    }

    return (
        <CalibrationContext.Provider
            value={{
                realPoints: realPoints,
                pixelPoints: pixelPoints,
                onAddRealPoint: addRealPointHandler,
                onAddPixelPoint: addPixelPointHandler,
                onRemoveRealPoint: removeRealPointHandler,
                onRemovePixelPoint: removePixelPointHandler,
                isReady: isReady
            }}>
            {props.children}
        </CalibrationContext.Provider>
    );
};

export default CalibrationContext;