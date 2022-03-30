import Path from "./Path";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const Paths = () => {
    const shownPaths = useSelector((state) => state.showPath.paths);
    const weight = useSelector((state) => state.showPath.weight);
    const borderWeight = useSelector((state) => state.showPath.borderWeight);
    const color = useSelector((state) => state.showPath.color);
    const borderColor = useSelector((state) => state.showPath.borderColor);    
    const min = useSelector((state) => state.showPath.min);    
    const max = useSelector((state) => state.showPath.max);
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        if(shownPaths.length == 0){
            setPaths([]);
            return;
        }
        setPaths(shownPaths.map((path) => <Path key={path.id} data={path.locations} options={{
            weight: Number(weight),
            outlineWidth: Number(borderWeight),
            outlineColor:borderColor,
            palette:{ 0.0: color[0], 0.5: color[1], 1.0: color[2] },
            min: Number(min),
            max: Number(max)
        }} label={path.label}/>));
    }, [shownPaths, weight, borderWeight, color, borderColor, min, max])

    return paths;
}

export default Paths;