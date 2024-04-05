// /Users/chayavogel/Documents/Flatiron/phase-5/the-nest/client/src/store.js

import { configureStore } from '@reduxjs/toolkit'
import toysReducer from "./Pages/ToyCards/ToySlice"
import usersReducer from "./Pages/Login/UserSlice"

export default configureStore({
  reducer: {  
    toys: toysReducer,
    users: usersReducer
  }
})