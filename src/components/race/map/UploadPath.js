import { useEffect, useState } from "react";
import { Polyline } from "react-leaflet";
import { useSelector } from "react-redux";

const UploadPath = () => {
    const isUploadPath = useSelector((state) => state.uploadPath.isUploadPathOpened);
    const path = useSelector((state) => state.uploadPath.path);
    const startOffset = useSelector((state) => state.uploadPath.startOffset);
    const endOffset = useSelector((state) => state.uploadPath.endOffset);
    const [polyline, setPolyline] = useState(null);

    useEffect(() => {
        if (!isUploadPath) {
            setPolyline(null);
            return;
        }
        let newPath = path.slice(startOffset, path.length - endOffset);
        let positions = newPath.map(position => position.slice(0, 2));
        setPolyline(<Polyline positions={positions} pathOptions={{
            weight: 3,
            color: 'red'
        }} />);

    }, [isUploadPath, path, startOffset, endOffset]);

    return (<>
        {isUploadPath && polyline}
    </>);
}

export default UploadPath;