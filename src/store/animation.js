import { createSlice } from '@reduxjs/toolkit';

const initialAnimationState = {
    isPlayed: false,
    competitors: [],
    snakeSize: 60,
    speed: 10,
    maxIndex: 0
};

const animationSlice = createSlice({
    name: 'animation',
    initialState: initialAnimationState,
    reducers: {
        addCompetitor(state, action) {
            if (state.competitors.find(c => c.id == action.payload.id)) {
                state.competitors = state.competitors.filter(c => c.id != action.payload.id);

            }
            else {
                state.competitors.push(action.payload);
            }
        },
        removeCompetitor(state, action) {
            state.competitors = state.competitors.filter(c => c.id != action.payload);
        },
        changeSnakeColor(state, action) {
            let competitorIndex = state.competitors.findIndex(c => c.id === action.payload.id);
            if (competitorIndex >= 0) {
                state.competitors[competitorIndex].color = action.payload.color;
            }
        },
        changeSnakeSize(state, action) {
            state.snakeSize = action.payload.size;
        },
        changeIsPlayed(state) {
            state.isPlayed = !state.isPlayed;
        },
        changeSpeed(state, action) {
            state.speed = action.payload.speed;
        },
        startFrom(state, action) {
            state.competitors.forEach((element, index) => {
                state.competitors[index].actualIndex = findNearestPosition(element.path, action.payload.position);
            });
        },
        startFromStart(state) {
            state.competitors.forEach((_, index) => {
                state.competitors[index].actualIndex = 0;
            });
        },
        updatePosition(state, action) {
            state.competitors.forEach((element, index) => {
                let newIndex = action.payload;
                if (index < 0) {
                    element.actualIndex = 0;
                }
                else if (newIndex >= element.locations.length) {
                    element.actualIndex = element.locations.length - 1;
                }
                else {
                    element.actualIndex = newIndex;
                }
            });
        }
    }
});

const findNearestPosition = (path, position) => {
    let distances = [];

    path.forEach((location, index) => {
        let a = position[0] - location['position']["item1"];
        let b = position[1] - location['position']["item2"];
        let distance = Math.sqrt((a ** 2) + (b ** 2));
        distances.push({ key: index, distance: distance });
    });

    let sorted = distances.sort((a, b) => a.distance - b.distance);
    return sorted[0].key;
}

export const animationActions = animationSlice.actions;

export default animationSlice.reducer;