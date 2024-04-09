import { configureStore } from '@reduxjs/toolkit'
import toysReducer from "./Slices/ToySlice"
import usersReducer from "./Slices/UsersSlice"

export default configureStore({
  reducer: {  
    toys: toysReducer,
    users: usersReducer,
  }
})