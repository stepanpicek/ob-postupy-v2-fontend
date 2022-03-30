import { combineReducers, configureStore } from '@reduxjs/toolkit';
import animation from './animation';
import manualPath from './manual-path';
import race from './race';
import showPath from './show-path';
import uploadPath from './upload-path';

const combinedReducer = combineReducers({race: race, animation: animation, manualPath: manualPath, uploadPath: uploadPath, showPath: showPath});

const rootReducer = (state, action) => {
    if (action.type === 'reset-all') {
      state = undefined;
    }
    return combinedReducer(state, action);
  };

const store = configureStore({
    reducer: rootReducer,    
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false      
    })
});

export default store;