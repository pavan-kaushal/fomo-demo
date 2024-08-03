import { configureStore } from '@reduxjs/toolkit';
import coinReducer from './slice'; 

const store = configureStore({
  reducer: {
    coin: coinReducer,
  },
});

export default store;
