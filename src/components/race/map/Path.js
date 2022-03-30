import { useEffect} from "react";
import { useMap } from "react-leaflet";
import L from 'leaflet';
import 'leaflet-hotline';

const Path = (props) => {
    const map = useMap();
    useEffect(() => {
        let hotline = L.hotline(props.data, props.options);
        hotline.addTo(map);
        return () => {
          map.removeControl(hotline);
        };
      }, [props]);
    
    return null;
}

export default Path;