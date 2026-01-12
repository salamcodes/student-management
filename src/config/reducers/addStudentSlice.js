import { createSlice } from "@reduxjs/toolkit";

export const addStudentSlice = createSlice({
    name: "student",

    initialState: {
        students: []
    },

    reducers: {
        addStudent: (state, action) => {
            state.students.push(action.payload)
        },

        removeStudent: (state, action) => {
            state.students = state.students.filter((item) => item.id !== action.payload)
        }
    }

})

export const { addStudent, removeStudent } = addStudentSlice.actions;
export default addStudentSlice.reducer;