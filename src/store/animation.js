import { createSlice } from '@reduxjs/toolkit';
import { distance } from '../services/geo';

const initialAnimationState = {
    isPlayed: false,
    competitors: [],
    competitorsColorNumber: 0,    
    snakeSize: 60,
    snakeWidth: 8,
    snakeRadius: 8,
    speed: 10,
    minIndex: 0,
    maxIndex: 0,
    actualIndex: 0,
    isSliding: false,
    isAnimationOn: false,
    isFromStart: true,
    startPosition: null,
    playAllTrigger: false
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
                let competitor = action.payload;
                if (!state.isFromStart) {
                    let nearest = findNearestPosition(competitor.locations, state.startPosition);
                    competitor.offset = nearest;
                    let maximum = competitor.locations.length - nearest + Number(state.snakeSize);
                    state.minIndex = -nearest < state.minIndex ? -nearest : state.minIndex;
                    state.maxIndex = maximum > state.maxIndex ? maximum : state.maxIndex;
                }

                state.competitors.push(competitor);
                if (state.isFromStart) {
                    let maxIndex = 0;
                    state.competitors.forEach((element) => {
                        let maximum = element.locations.length + Number(state.snakeSize);
                        maxIndex = maximum > maxIndex ? maximum : maxIndex;
                    });
                    state.minIndex = 0;
                    state.maxIndex = maxIndex;
                }
                
            }
            state.isAnimationOn = state.competitors.length > 0;
            state.competitorsColorNumber++;
            if (!state.isAnimationOn) {
                state.actualIndex = initialAnimationState.actualIndex;
                state.isPlayed = initialAnimationState.isPlayed;
                state.isSliding = initialAnimationState.isSliding;
            }
        },
        changeColorNumber(state){
            state.competitorsColorNumber++;
        },
        removeCompetitor(state, action) {
            state.competitors = state.competitors.filter(c => c.id != action.payload);
        },
        changeSnakeColor(state, action) {
            let element = state.competitors.find(c => c.id === action.payload.id);
            if (element) {
                element.color = action.payload.color;
            }
        },
        changeSnakeSize(state, action) {
            state.snakeSize = action.payload;
        },
        changeSnakeWidth(state, action) {
            state.snakeWidth = action.payload;
        },
        changeSnakeRadius(state, action) {
            state.snakeRadius = action.payload;
        },
        changeIsPlayed(state, action) {
            state.isPlayed = action.payload ?? !state.isPlayed;
        },
        changeSpeed(state, action) {
            state.speed = action.payload;
        },
        startFrom(state, action) {
            let minIndex = 0;
            let maxIndex = 0;
            state.competitors.forEach((element) => {
                let nearest = findNearestPosition(element.locations, action.payload);
                let maximum = element.locations.length - nearest + Number(state.snakeSize);
                element.offset = nearest;
                minIndex = nearest > minIndex ? nearest : minIndex;
                maxIndex = maximum > maxIndex ? maximum : maxIndex;
            });
            state.actualIndex = 0;
            state.minIndex = -minIndex;
            state.maxIndex = maxIndex;
            state.isFromStart = false;
            state.startPosition = action.payload;
        },
        startFromStart(state) {
            let maxIndex = 0;
            state.competitors.forEach((element) => {
                let maximum = element.locations.length + Number(state.snakeSize);
                element.offset = 0;
                maxIndex = maximum > maxIndex ? maximum : maxIndex;
            });
            state.actualIndex = 0;
            state.minIndex = 0;
            state.maxIndex = maxIndex;
            state.isFromStart = true;
        },
        updatePosition(state, action) {
            state.isSliding = action.payload.isSliding;
            state.actualIndex = action.payload.id ?? Number(state.actualIndex) + 1;
            if(state.actualIndex >= state.maxIndex){
                state.isPlayed = false;
            }
        },
        updateBackPosition(state) {
            let index = Number(state.actualIndex) - 30;
            if (index < 0) {
                index = 0;
            }
            state.actualIndex = index;
        },
        updateForwardPosition(state) {
            let index = Number(state.actualIndex) + 30;
            if (index > state.maxIndex) {
                index = state.maxIndex;
            }
            state.actualIndex = index;
        },
        reset(state) {
            state.actualIndex = initialAnimationState.actualIndex;
            state.competitors = initialAnimationState.competitors;
            state.isPlayed = initialAnimationState.isPlayed;
            state.isSliding = initialAnimationState.isSliding;
            state.isAnimationOn = initialAnimationState.isAnimationOn;
            state.minIndex = initialAnimationState.minIndex;
            state.maxIndex = initialAnimationState.maxIndex;
            state.isFromStart = initialAnimationState.isFromStart;
            state.startPosition = initialAnimationState.startPosition;
            state.competitorsColorNumber = initialAnimationState.competitorsColorNumber;
        },
        changeIsAnimationOn(state){
            state.playAllTrigger = !state.playAllTrigger
        }
    }
});

const findNearestPosition = (path, position) => {
    let distances = [];

    path.forEach((location, index) => {
        let dist = distance(location, position);
        distances.push({ key: index, distance: dist });
    });

    let sorted = distances.sort((a, b) => a.distance - b.distance);
    return sorted[0].key;
}

export const animationActions = animationSlice.actions;

export default animationSlice.reducer;