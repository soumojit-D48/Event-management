// import { configureStore, combineReducers } from "@reduxjs/toolkit";
// import { Provider } from "react-redux";
// import { api } from "./api";
// import globalReducer from "./index";
// // import { useDispatch, useSelector } from "react-redux";
// import { useRef } from "react";

// // Combine reducers
// const rootReducer = combineReducers({
//   global: globalReducer,
//   [api.reducerPath]: api.reducer,
// });

// // Create store function
// export const makeStore = () =>
//   configureStore({
//     reducer: rootReducer,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(api.middleware),
//   });

// // // Types for JS (optional, but keep for convenience)
// // export const useAppDispatch = () => useDispatch();
// // export const useAppSelector = useSelector;

// // Provider component
// export default function StoreProvider({ children }) {
//   const storeRef = useRef(null);
//   if (!storeRef.current) {
//     storeRef.current = makeStore();
//   }
//   return <Provider store={storeRef.current}>{children}</Provider>;
// }








// src/state/store.js
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { api } from "./api";
import globalReducer from "./index";

const rootReducer = combineReducers({
  global: globalReducer,
  [api.reducerPath]: api.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

