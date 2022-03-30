import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import { animationActions } from '../../../store/animation';
import race, { raceActions } from "../../../store/race";
import CompetitorsControl from "./CompetitorsControl";

const CategoriesControl = () => {
    const dispatch = useDispatch();
    const raceId = useSelector((state) => state.race.raceId);
    const categories = useSelector((state) => state.race.categories);
    const selectedCategory = useSelector((state) => state.race.categoryId);
    const isAnimationOn = useSelector((state) => state.animation.isAnimationOn);
    const { isLoading, error, sendRequest } = useHttp();

    useEffect(() => {
        if (!raceId) return;
        sendRequest({ url: `https://localhost:5001/result/categories/${raceId}` }, (data) => {
            dispatch(raceActions.setCategories(data.categories));
        });
    }, [raceId]);

    const handleCategoryChange = (event) => {
        let id = event.target.value;
        let category = categories.find(c => c.id == id);
        let courseId = -1;
        if (category) {
            courseId = category.courseId;
        }
        dispatch(raceActions.changeCategory(id));
        dispatch(raceActions.changeCourse(courseId));
    }

    const handlePlayAll = () => {
        dispatch(animationActions.changeIsAnimationOn());
    }

    return (
        <Box sx={{ width: '100%', p: 1 }}>
            <Form.Select size="sm" onChange={handleCategoryChange} value={selectedCategory}>
                <option key={-1} value={-1}>Vyberte kategorii</option>
                {categories.map((category, index) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Form.Select>
            {selectedCategory >= 0 &&
                <Box sx={{ display: 'flex', width: '100%'}}>
                    Kategorie: <b>{categories.find(c => c.id == selectedCategory).name}</b>
                    <IconButton onClick={handlePlayAll} style={{ color: isAnimationOn ? 'red' : 'white' }} className="ms-auto"><PlayArrowIcon /></IconButton>
                </Box>}
            <CompetitorsControl />
        </Box>
    );
}

export default CategoriesControl;