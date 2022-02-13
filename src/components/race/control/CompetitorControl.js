import { Box, Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import { animationActions } from "../../../store/animation";


const CompetitorControl = ({ competitor }) => {
    const dispatch = useDispatch();
    //const playedCompetitors = useSelector((state) => state.animation.competitors);
    const { isLoading, error, sendRequest } = useHttp();

    const handleUserPlay = () => {
            sendRequest({ url: `https://localhost:44302/paths/result?id=${competitor.id}` }, (data) => {
                
                dispatch(animationActions.addCompetitor(
                    {
                        id: competitor.id,
                        actualIndex: 0,
                        locations: data.locations.map((location) => [location.position.item1, location.position.item2])
                    }));
            });
    }
    return (
        <Box sx={{ display: 'flex', flexDirection: 'row' }}>
            {competitor.position}. {competitor.person.firstName} {competitor.person.lastName}
            <Button onClick={handleUserPlay} color="success"> Play</Button>
        </Box>
    );
}

export default CompetitorControl;