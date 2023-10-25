import { createSlice } from "@reduxjs/toolkit";

const initialState = null;
const catSlice = createSlice({
    name: 'useData',
    initialState,
    reducers: {

        addCat(state, action) {
            state = action.payload
            return state
        }

    }
})
export const { addCat } = catSlice.actions
export default catSlice.reducer