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
            let index = Number(actualIndex) + Number(item.offset);
            let snakeOffset = Number(index) - Number(snakeSize);
            let length = item.locations.length - 1;
            if (index < 0) {
                index = 0;
            }
            else if (index >= length) {
                index = length - 1;
            }

            if (snakeOffset < 0) {
                snakeOffset = 0;
            }
            else if (snakeOffset >= length) {
                snakeOffset = length - 1;
            }

            return (
                <Snake
                    key={item.id}
                    position={[item.locations[index][0], item.locations[index][1]]}
                    name={item.name}
                    color={item.color}
                    tail={item.locations.slice(snakeOffset, index)}
                    nextPosition={index + 1 < length ? [item.locations[index + 1][0], item.locations[index + 1][1]] : [item.locations[index][0], item.locations[index][1]]} />);
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