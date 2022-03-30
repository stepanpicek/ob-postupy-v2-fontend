import {createSlice} from '@reduxjs/toolkit';

const initialUploadPathState = {
    isUploadPathOpened: false,
    path: [],
    startOffset: 0,
    endOffset: 0,
    name: null,
    id: null
};

const uploadPathSlice = createSlice({
    name: 'uploadPath',
    initialState: initialUploadPathState,
    reducers: {
        open(state, action){
            state.isUploadPathOpened = true;
            state.path = action.payload.path,
            state.id = action.payload.id
        },
        close(state){
            state.isUploadPathOpened = initialUploadPathState.isUploadPathOpened;
            state.path = initialUploadPathState.path;
            state.startOffset = initialUploadPathState.startOffset;
            state.endOffset = initialUploadPathState.endOffset;
            state.name = initialUploadPathState.name;
            state.id = initialUploadPathState.id;
        },
        changeStartOffset(state, action){
            state.startOffset = action.payload;
        },
        changeEndOffset(state, action){
            state.endOffset = action.payload;
        }
    }
});

export const uploadPathActions = uploadPathSlice.actions;

export default uploadPathSlice.reducer;