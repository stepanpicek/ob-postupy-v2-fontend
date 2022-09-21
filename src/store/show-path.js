import {createSlice} from '@reduxjs/toolkit';

const initialShowPathState = {
    paths: [],
    weight: 5,
    transparency: 99
};

const showPathSlice = createSlice({
    name: 'showPath',
    initialState: initialShowPathState,
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
        changePathColor(state, action){
            let element = state.paths.find(c => c.id === action.payload.id);
            if (element) {
                element.color = action.payload.color;
            }
        },
        changeTransparency(state, action){
            state.transparency = action.payload;
        }
    }
});

export const showPathActions = showPathSlice.actions;

export default showPathSlice.reducer;