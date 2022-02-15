import { createSlice } from '@reduxjs/toolkit';

const initialManualPathState = {
    isOpened: false,
    points: [],
    lastPoint: null,
    name: ""
};

const manualPathSlice = createSlice({
    name: 'manualPath',
    initialState: initialManualPathState,
    reducers: {
        addName(state, action){
            state.name = action.payload;
        },
        addPoint(state, action){
            state.points.push(action.payload);
            state.lastPoint = action.payload;
        },
        removeLastPoint(state){
            state.points.pop();
            state.lastPoint = state.points[state.points.length-1];
        },
        removeAllPoints(state){
            state.points = initialManualPathState.points;
            state.lastPoint = initialManualPathState.lastPoint;
        },
        open(state){
            state.isOpened = true;
        },
        close(state){
            state.isOpened = initialManualPathState.isOpened;
            state.points = initialManualPathState.points
            state.lastPoint = initialManualPathState.lastPoint;
            state.name = initialManualPathState.name;
        }
    }
});

export const manualPathActions = manualPathSlice.actions;

export default manualPathSlice.reducer;