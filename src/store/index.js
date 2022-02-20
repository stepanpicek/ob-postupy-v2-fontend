import { configureStore } from '@reduxjs/toolkit';
import animation from './animation';
import manualPath from './manual-path';
import race from './race';
import uploadPath from './upload-path';

const store = configureStore({
    reducer: {race: race, animation: animation, manualPath: manualPath, uploadPath: uploadPath},    
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false      
    })
});

export default store;