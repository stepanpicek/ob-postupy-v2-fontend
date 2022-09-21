import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Heatmap from "./Heatmap";

const Heatmaps = () => {
    const shownHeatmaps = useSelector((state) => state.showHeatmap.paths);
    const weight = useSelector((state) => state.showHeatmap.weight);
    const borderWeight = useSelector((state) => state.showHeatmap.borderWeight);
    const color = useSelector((state) => state.showHeatmap.color);
    const borderColor = useSelector((state) => state.showHeatmap.borderColor);    
    const min = useSelector((state) => state.showHeatmap.min);    
    const max = useSelector((state) => state.showHeatmap.max);
    const [heatmaps, setHeatmaps] = useState([]);

    useEffect(() => {
        if(shownHeatmaps.length == 0){
            setHeatmaps([]);
            return;
        }
        setHeatmaps(shownHeatmaps.map((path) => <Heatmap key={path.id} data={path.locations} options={{
            weight: Number(weight),
            outlineWidth: Number(borderWeight),
            outlineColor:borderColor,
            palette:{ 0.0: color[0], 0.5: color[1], 1.0: color[2] },
            min: Number(min),
            max: Number(max)
        }} label={path.label}/>));
    }, [shownHeatmaps, weight, borderWeight, color, borderColor, min, max])

    return heatmaps;
}

export default Heatmaps;