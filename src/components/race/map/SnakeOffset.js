import { useMapEvents } from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { animationActions } from "../../../store/animation";

const SnakeOffset = () => {
    const dispatch = useDispatch();
    const isAnimationOn = useSelector((state) => state.animation.isAnimationOn);
    const handleChangeOffset = (event) => {
        if(isAnimationOn){
            dispatch(animationActions.startFrom([event.latlng.lat, event.latlng.lng]));
        }
    }
    const map = useMapEvents({
        click:handleChangeOffset
    });
    
    return (<></>);
}

export default SnakeOffset;