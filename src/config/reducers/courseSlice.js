import { createSlice } from "@reduxjs/toolkit";

export const courseSlice = createSlice({
    name: "courses",

    initialState: {
        course: []
    },

    reducers: {
        addCourse: (state, action) => {
            state.course = action.payload
        }
    }
})

export const { addCourse } = courseSlice.actions;
export default courseSlice.reducer