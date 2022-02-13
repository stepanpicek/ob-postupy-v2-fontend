import { Box, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import CompetitorControl from "./CompetitorControl";

const CompetitorsControl = () => {
    const categoryId = useSelector((state) => state.race.categoryId);
    const [competitors, setCompetitors] = useState([]);
    const { isLoading, error, sendRequest } = useHttp();

    useEffect(() => {
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
        <Box>
            {competitors.map((competitor) =>
                <CompetitorControl key={competitor.id} competitor={competitor} />
            )}
        </Box>
    );
}

export default CompetitorsControl;