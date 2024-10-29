import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./slices/apiSlice";
import authReducer from './slices/authSlice';

const store = configureStore({
  reducer: {
   [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;


//  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
// This line sets up middleware for the Redux store. Middleware in Redux is used to intercept actions and add additional logic before they reach the reducer.
// getDefaultMiddleware() returns an array of default middleware, including useful ones like redux-thunk for handling asynchronous logic, immer for immutable state updates, and more.
// In your code, you're calling getDefaultMiddleware() without making any changes to it, which means you're using the default configuration.
// If you wanted to add custom middleware along with the defaults, you could do:

// code
// middleware: (getDefaultMiddleware) =>
//   getDefaultMiddleware().concat(customMiddleware),