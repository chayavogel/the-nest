import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchToys = createAsyncThunk('toys/fetchToys', async () => {
  const response = await fetch("http://localhost:3000/toys")
  const data = await response.json();
  return data
})

export const createToy = createAsyncThunk(
  'users/createToy',
   async (initialToy) => {
    const response = await fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(initialToy)
    })
    const data = await response.json();
    return data;
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
        state.value = action.payload;
      })
      .addCase(fetchToys.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createToy.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(createToy.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value.push(action.payload)
      })
      .addCase(createToy.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { toyAdded } = toysSlice.actions

export default toysSlice.reducer