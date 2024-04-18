import { configureStore } from '@reduxjs/toolkit'
import toysReducer from "./Slices/ToySlice"
import usersReducer from "./Slices/UsersSlice"
import reviewsReducer from "./Slices/ReviewsSlice"

export default configureStore({
  reducer: {  
    toys: toysReducer,
    users: usersReducer,
    reviews: reviewsReducer,
  }
})