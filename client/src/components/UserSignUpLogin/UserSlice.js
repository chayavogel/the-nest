// /Users/chayavogel/Documents/Flatiron/phase-5/the-nest/client/src/components/features/userSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch("http://localhost:3000/users")
  const data = await response.json();
  return data
})

export const createUser = createAsyncThunk(
  'users/createUser',
   async (initialUser) => {
    const response = await fetch("http://localhost:3000/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(initialUser)
    })
    const data = await response.json();
    return data;
  }
)

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    value: []
  },  
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value.push(action.payload)
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { userAdded } = usersSlice.actions

export default usersSlice.reducer