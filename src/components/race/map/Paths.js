import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { Polyline, Tooltip } from "react-leaflet";
import './SnakeLabel.css';

const Paths = () => {
    const shownPaths = useSelector((state) => state.showPath.paths);
    const weight = useSelector((state) => state.showPath.weight);
    const transparency = useSelector((state) => state.showPath.transparency);
    const [paths, setPaths] = useState([]);

    const handleHighlight = (e) => {
        e.target.setStyle({weight: Number(weight) + Math.max(Number(weight)/3, 2)});
    }

    const handleHighlightOut = (e) => {
        e.target.setStyle({weight: Number(weight)});
    }

    useEffect(() => {
        if(shownPaths.length == 0){
            setPaths([]);
            return;
        }
        setPaths(shownPaths.map((path) => 
        <Polyline key={path.id} positions={path.locations} eventHandlers={{mouseover:handleHighlight, mouseout: handleHighlightOut}} 
        pathOptions={{
            weight: Number(weight),
            color: path.color,
            opacity: transparency/100
        }}><Tooltip sticky className="snake-label"><div style={{ color: path.color ?? 'red' }}>{path.label}</div></Tooltip></Polyline> ));
    }, [shownPaths, weight, transparency]);
    return paths;
}

export default Paths;