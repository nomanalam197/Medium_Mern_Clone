import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  user: null,
  isAuthenticated: false,
  error: null,
  blogs: null
}

export const userSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    loaduser: (state, action)=>{
      // bnda signup ho jae tb pr bhi load user
      //  console.log(action)
        // console.log(action.payload)

        state.user = action.payload;
        state.isAuthenticated = true;

    },
    loadblogs: (state,action)=>{
      state.blogs = action.payload;
    },
    signout: (state,action)=>{
      // do not use comma here
      state.user = null;
      state.isAuthenticated = false;
      state.error = null
    },
    errors:(state,action)=>{
        console.log(action.payload)
        state.error = action.payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {loaduser, loadblogs, signout, errors } = userSlice.actions

// upr wale line mein jetna export hai usko khaas specify krke import krna pdega but yeah niche wala code default
// export hota hai
export default userSlice.reducer