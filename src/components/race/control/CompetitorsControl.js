import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { ThreeDots } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import useAlertWrapper from "../../../hooks/use-alert";
import useHttp from "../../../hooks/use-http";
import { animationActions } from "../../../store/animation";
import { showPathActions } from "../../../store/show-path";
import { showHeatmapActions } from "../../../store/show-heatmap";
import CompetitorControl from "./CompetitorControl";

const CompetitorsControl = () => {
    const categoryId = useSelector((state) => state.race.categoryId);    
    const isAnimationOn = useSelector((state) => state.animation.isAnimationOn);
    const [competitors, setCompetitors] = useState([]);
    const { isLoading, sendRequest } = useHttp();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(animationActions.reset());
        dispatch(showPathActions.removeAll());
        dispatch(showHeatmapActions.removeAll());

        if (!categoryId) return;
        if (categoryId < 0) {
            setCompetitors([]);
            return;
        }
        sendRequest({ url: `${process.env.REACT_APP_BACKEND_URI}/result/category/${categoryId}` }, (data) => {
            setCompetitors(data.people);
        });
    }, [categoryId]);

    const handleRemovePath = (id) => {
        setCompetitors((state) => {
            let competitors = state.filter(s => s.id != id);
            let competitor = state.find(s => s.id == id);
            if(competitor){
                competitor.isPathUploaded = false;
                let newCompetitors = [...competitors, competitor];
                return newCompetitors.sort((a,b) => a.position - b.position);
            }
            return competitors;
        });
    }
    
    if (isLoading) {
        return (
            <ThreeDots color="#2e7d32" height={80} width={80} />
        );
    }

    return (
        <Box sx={{width: '100%'}}>
            {competitors.map((competitor) =>
                <CompetitorControl key={competitor.id} competitor={competitor} onRemovePath={handleRemovePath}/>
            )}
        </Box>
    );
}

export default CompetitorsControl;