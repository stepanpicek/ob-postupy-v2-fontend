import { useEffect} from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet-easyprint";

const Printer = () => {
    const map = useMap();
    useEffect(() => {
        let easyPrinter = L.easyPrint({
            title: 'Exportovat mapu',
            position: 'topleft',
            sizeModes: ['Current', 'A4Portrait', 'A4Landscape'],
            exportOnly: true
        });
        easyPrinter.addTo(map);
        return () => {
          map.removeControl(easyPrinter);
        };
      }, []);
    
    return null;
}

export default Printer;