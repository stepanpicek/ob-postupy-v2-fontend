import { useParams } from "react-router-dom";

const RaceDetail = () => {
    let params = useParams();
    
    return (
        <h1>Race detail: {params.raceId}</h1>
    );
};

export default RaceDetail;