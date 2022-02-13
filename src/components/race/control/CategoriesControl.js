import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import useHttp from "../../../hooks/use-http";
import race, { raceActions } from "../../../store/race";
import CompetitorsControl from "./CompetitorsControl";

const CategoriesControl = () => {
    const dispatch = useDispatch();
    const raceId = useSelector((state) => state.race.raceId);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(-1);
    const { isLoading, error, sendRequest } = useHttp();

    useEffect(() => {
        if(!raceId) return;
        sendRequest({ url: `https://localhost:44302/races/categories?key=${raceId}` }, (data) => {
            setCategories(data);
        });
    }, [raceId]);

    const handleCategoryChange = (event) => {
        let id = event.target.value;
        setSelectedCategory(id);
        let category = categories.find(c => c.id == id);
        let courseId = -1;
        if(category){
            courseId = category.courseId;
        }
        dispatch(raceActions.changeCategory(id));
        dispatch(raceActions.changeCourse(courseId));
    }

    return(
        <Box>
            <Form.Select size="sm" onChange={handleCategoryChange} value={selectedCategory}>
                <option key={-1} value={-1}>Vyberte kategorii</option>
                {categories.map((category, index) => <option key={category.id} value={category.id}>{category.name}</option>)}
            </Form.Select>
            <CompetitorsControl />
        </Box>
    );
}

export default CategoriesControl;