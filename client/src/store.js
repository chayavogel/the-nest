// /Users/chayavogel/Documents/Flatiron/phase-5/the-nest/client/src/store.js

import { configureStore } from '@reduxjs/toolkit'
import toysReducer from "./components/State/ToySlice"
import usersReducer from "./components/State/UserSlice"

export default configureStore({
  reducer: {  
    toys: toysReducer,
    // users: usersReducer
  }
})