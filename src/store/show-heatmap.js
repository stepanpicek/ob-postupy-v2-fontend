import {createSlice} from '@reduxjs/toolkit';

const initialShowHeatmapState = {
    paths: [],
    weight: 5,
    borderWeight: 1,
    color: [ "#ff0000", "#ffff00", "#008800"],
    borderColor: "#000000",
    min: 0,
    max: 15
};

const showHeatmapSlice = createSlice({
    name: 'showHeatmap',
    initialState: initialShowHeatmapState,
    reducers: {
        add(state, action){
            state.paths.push(action.payload);
        },
        remove(state, action){
            state.paths = state.paths.filter(p => p.id != action.payload);
        },
        removeAll(state){
            state.paths = [];
        },
        changeWeight(state, action){
            state.weight = action.payload;
        },
        changeBorderWeight(state, action){
            state.borderWeight = action.payload;
        },
        changeColor(state, action){
            state.color = action.payload;
        },
        changeBorderColor(state, action){
            state.borderColor = action.payload;
        },
        changeMin(state, action){
            state.min = action.payload;
        },
        changeMax(state, action){
            state.max = action.payload;
        }
    }
});

export const showHeatmapActions = showHeatmapSlice.actions;

export default showHeatmapSlice.reducer;