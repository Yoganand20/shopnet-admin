import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import tableReducer from "@/lib/slice/tableSlice";


export const store = configureStore({
    reducer: {
        auth: authReducer,
        table: tableReducer
    },

})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;