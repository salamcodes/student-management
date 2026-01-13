import { configureStore } from "@reduxjs/toolkit";
import studentReducer from '../reducers/addStudentSlice'
import courseReducer from '../reducers/courseSlice'


export const store = configureStore({
    reducer: {

        student: studentReducer,
        course: courseReducer
    }
})