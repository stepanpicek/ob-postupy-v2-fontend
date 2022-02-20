import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import { animationActions } from "../../../store/animation";
import CompetitorControl from "./CompetitorControl";

const CompetitorsControl = () => {
    const categoryId = useSelector((state) => state.race.categoryId);
    const isAnimationOn = useSelector((state) => state.animation.isAnimationOn);
    const [competitors, setCompetitors] = useState([]);
    const { isLoading, error, sendRequest } = useHttp();
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(animationActions.reset());

        if (!categoryId) return;
        if (categoryId < 0) {
            setCompetitors([]);
            return;
        }
        sendRequest({ url: `https://localhost:44302/results/category?id=${categoryId}` }, (data) => {
            setCompetitors(data);
        });
    }, [categoryId]);

    return (
        <Box sx={{width: '100%'}}>
            {competitors.map((competitor) =>
                <CompetitorControl key={competitor.id} competitor={competitor} />
            )}
        </Box>
    );
}

export default CompetitorsControl;