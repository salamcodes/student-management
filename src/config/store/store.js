import { configureStore } from "@reduxjs/toolkit";
import studentReducer from '../reducers/addStudentSlice'


export const store = configureStore({
    reducer: {

        student: studentReducer
    }
})