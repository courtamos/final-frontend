import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import authReducer from '../features/auth/authSlice';
import jobsReducer from '../features/dashboard/jobs/jobsSlice';

const store = configureStore({
  reducer: {
    counter: counterReducer,
    auth: authReducer,
    jobs: jobsReducer,
  },
});

export default store;
