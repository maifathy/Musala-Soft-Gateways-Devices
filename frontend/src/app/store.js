import { configureStore } from '@reduxjs/toolkit';
import gatewayReducer from '../redux/gateway/gatewaySlice.js';

export const store = configureStore({
  reducer: {
    gateway: gatewayReducer,
  },
})
