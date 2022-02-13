import { configureStore } from '@reduxjs/toolkit';
import animation from './animation';
import race from './race';

const store = configureStore({
    reducer: {race: race, animation: animation},    
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
      
    })
});

export default store;