import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Snake from "./Snake";

const SnakesAnimation = () => {
    const competitors = useSelector((state) => state.animation.competitors);

    return (
        <>
            {competitors.map((item) => <Snake key={item.id} position={[item.locations[item.actualIndex][0], item.locations[item.actualIndex][1]]} />)}
        </>
    );
}

export default SnakesAnimation;