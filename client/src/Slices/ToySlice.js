import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchToys = createAsyncThunk('toys/fetchToys', async () => {
  const response = await fetch("/toys")
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error)
  }
})

export const createToy = createAsyncThunk(
  'toys/createToy',
   async (initialToy) => {
    const response = await fetch("/toys", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(initialToy)
    })
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error)
    }
  }
)

const toysSlice = createSlice({
  name: 'toys',
  initialState: {
    status: "",
    value: [],
    error: [],
    isSubmitted: false
  },
  reducers: {
    createToySuccess: (state) => {
      state.isSubmitted = true;
      state.error = null;
    },
    createToyFailure: (state, action) => {
      state.isSubmitted = false;
      state.error = action.payload;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchToys.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchToys.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.value = action.payload;
        state.error = null
      })
      .addCase(fetchToys.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createToy.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(createToy.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.value.unshift(action.payload)
        state.error = null
      })
      .addCase(createToy.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default toysSlice.reducer