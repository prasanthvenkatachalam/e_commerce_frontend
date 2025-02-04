// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import toastReducer from './toastSlice'

export const store = configureStore({
    reducer: {
        auth: authReducer,
        toast: toastReducer
    },
    
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
    
    devTools: process.env.NODE_ENV !== 'production', // Disable in production
    
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;