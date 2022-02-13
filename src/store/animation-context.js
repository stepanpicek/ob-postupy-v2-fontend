import { createContext, useState, useEffect } from 'react';

const AnimationContext = createContext({
    isPlayed: false,
    competitors: [],
    snakeSize: 60,
    speed: 10,
    maxIndex: 0,
    addCompetitor: (competitor) => { },
    removeCompetitor: (id) => { },
    changeSnakeColor: (id, color) => { },
    changeSnakeSize: (size) => { },
    changeIsPlayed: (isPlayed) => { },
    changeSpeed: (speed) => { },
    startFrom: (position) => { },
    startFromStart: () => { },
    updatePosition: (index) => { }
});

export const AnimationContextProvider = (props) => {
    const [isPlayed, setIsPlayed] = useState(false);
    const [competitors, setCompetitors] = useState([]);
    const [snakeSize, setSnakeSize] = useState(60);
    const [speed, setSpeed] = useState(10);
    const [maxIndex, setMaxIndex] = useState([]);

    const addCompetitor = (competitor) => {
        console.log(competitors.length);
        setCompetitors((state) => [...state, competitor]);
    }

    const removeCompetitor = (id) => {
        setCompetitors((state) => state.filter(s => s.id != id));
    }

    const changeSnakeColor = (id, color) => {

    }

    const changeSnakeSize = (size) => {

    }

    const changeIsPlayed = (isPlayed) => {

    }

    const changeSpeed = (speed) => {

    }

    const startFrom = (position) => {

    }

    const startFromStart = () => {

    }

    const updatePosition = (index) => {
        setCompetitors((state) => state.map((item) => {
            if (index >= 0 && index < item.locations.length) {
                item.actualIndex = index;
            }
            return item;
        })
        );
    }

    return(
        <AnimationContext.Provider value={{
            isPlayed: isPlayed,
            competitors: competitors,
            snakeSize: snakeSize,
            speed: speed,
            maxIndex: maxIndex,
            addCompetitor: addCompetitor,
            removeCompetitor: removeCompetitor,
            changeSnakeColor: changeSnakeColor,
            changeSnakeSize: changeSnakeSize,
            changeIsPlayed: changeIsPlayed,
            changeSpeed: changeSpeed,
            startFrom: startFrom,
            startFromStart: startFromStart,
            updatePosition: updatePosition
        }}>
            {props.children}
        </AnimationContext.Provider>
    );
}

export default AnimationContext;