// /Users/chayavogel/Documents/Flatiron/phase-5/the-nest/client/src/components/State/ToySlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchToys = createAsyncThunk('toys/fetchToys', async () => {
  const response = await fetch("http://localhost:3000/toys")
  const data = await response.json();
  return data
})

export const createToy = createAsyncThunk(
  'toys/createToy',
  async initialToy => {
    const response = await fetch.post("http://localhost:3000/toys", initialToy)
    return response.data
  }
)

const toysSlice = createSlice({
  name: 'toys',
  initialState: {
    value: []
  },
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
      .addCase(fetchToys.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchToys.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = state.value.concat(action.payload)
      })
      .addCase(fetchToys.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default toysSlice.reducer