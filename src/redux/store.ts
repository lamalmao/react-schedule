import { configureStore } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import schedules from './schedules';

export const store = configureStore({
  reducer: {
    schedules
  }
});

export const useStoreDispatch = () => useDispatch<typeof store.dispatch>();
export type RootState = ReturnType<typeof store.getState>;
