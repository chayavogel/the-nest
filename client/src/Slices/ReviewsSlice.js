import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchReviews = createAsyncThunk('reviews/fetchReviews', async () => {
  const response = await fetch("/reviews")
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error)
  }
})

export const createReview = createAsyncThunk(
  'reviews/createReview',
   async (initialReview) => {
    const response = await fetch("/reviews", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(initialReview)
    })
    const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error)
  }
  }
)

const reviewsSlice = createSlice({
  name: 'reviews',
  initialState: {
    status: "",
    value: [],
    error: []
  },
  reducers: {
    // omit existing reducers here
  },
  extraReducers(builder) {
    builder
    .addCase(fetchReviews.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchReviews.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = action.payload;
        state.error = null
      })
      .addCase(fetchReviews.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(createReview.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(createReview.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value.push(action.payload)
        state.error = null
      })
      .addCase(createReview.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export default reviewsSlice.reducer