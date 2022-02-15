import { configureStore } from '@reduxjs/toolkit';
import animation from './animation';
import manualPath from './manual-path';
import race from './race';

const store = configureStore({
    reducer: {race: race, animation: animation, manualPath: manualPath},    
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false      
    })
});

export default store;