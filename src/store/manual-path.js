import { createSlice } from '@reduxjs/toolkit';

const initialManualPathState = {
    isOpened: false,
    points: [],
    lastPoint: null,
    name: "",
    controls: 0,
    nextControl: 0,
    isEnd: false
};

const manualPathSlice = createSlice({
    name: 'manualPath',
    initialState: initialManualPathState,
    reducers: {
        addName(state, action){
            state.name = action.payload;
        },
        setControls(state, action){
            state.controls = action.payload;
        },
        addPoint(state, action){
            state.points.push(action.payload);
            state.lastPoint = action.payload;
            if(state.lastPoint.isControl){
                if(state.nextControl == state.controls - 1){
                    state.isEnd = true;
                }
                state.nextControl++;                                             
            }
        },
        removeLastPoint(state){
            let last = state.points.pop();            
            if(!last) return; 
            if(last.isControl){
                state.nextControl--;
            }
            state.lastPoint = state.points[state.points.length-1];
            state.isEnd = false;
        },
        removeAllPoints(state){
            state.points = initialManualPathState.points;
            state.lastPoint = initialManualPathState.lastPoint;
            state.nextControl = initialManualPathState.nextControl;
            state.isEnd = false;
        },
        open(state){
            state.isOpened = true;
        },
        close(state){
            state.isOpened = initialManualPathState.isOpened;
            state.points = initialManualPathState.points
            state.lastPoint = initialManualPathState.lastPoint;
            state.name = initialManualPathState.name;
            state.isEnd = initialManualPathState.isEnd;
            state.nextControl = initialManualPathState.nextControl;
        }
    }
});

export const manualPathActions = manualPathSlice.actions;

export default manualPathSlice.reducer;