import {createSlice} from '@reduxjs/toolkit';

const initialRaceState = { 
    raceId: null, 
    mapScale: 1, 
    categoryId: -1,
    courseId: null,
    categories: [],
    course: null,
    mapTransparency: 99 
};

const raceSlice = createSlice({
    name: 'race',
    initialState: initialRaceState,
    reducers: {
        addId(state, action){
            state.raceId = action.payload.id;
        },
        changeCourse(state, action){
            state.courseId = action.payload;
        },
        addMapScale(state, action){
            state.mapScale = action.payload;
        },
        changeMapTransparency(state, action){
            state.mapTransparency = action.payload;
        },
        changeCategory(state, action){
            state.categoryId = action.payload;
        },
        setCategories(state, action){
            state.categories = action.payload;
        },
        setCourse(state, action){
            state.course = action.payload;
        }
    }
});

export const raceActions = raceSlice.actions;

export default raceSlice.reducer;