import { useEffect, useState } from "react";
import { useMapEvents } from "react-leaflet";
import { useSelector } from "react-redux";
import Snake from "./Snake";

const SnakesAnimation = () => {
    const competitors = useSelector((state) => state.animation.competitors);
    const actualIndex = useSelector((state) => state.animation.actualIndex);
    const snakeSize = useSelector((state) => state.animation.snakeSize);
    const [snakes, setSnakes] = useState(null);

    useEffect(() => {
        let snakeItems = competitors.map((item) => {
            let index =  Number(actualIndex) + Number(item.offset);
            let snakeOffset =  Number(index) - Number(snakeSize);
            if (index < 0) {
                index = 0;
            }
            else if (index >= item.locations.length) {
                index = item.locations.length - 1;
            }

            if(snakeOffset < 0){
                snakeOffset = 0;
            }
            else if(snakeOffset >= item.locations.length){
                snakeOffset = item.locations.length - 1;
            }

            return (
            <Snake 
                key={item.id} 
                position={[item.locations[index][0], item.locations[index][1]]} 
                name={item.name} 
                color={item.color}
                tail={item.locations.slice(snakeOffset, index)}/>);
        });
        setSnakes(snakeItems);
    }, [competitors, actualIndex, snakeSize]);

    return (
        <>
            {snakes}
        </>
    );
}

export default SnakesAnimation;