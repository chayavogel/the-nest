import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch("http://localhost:3000/users")
  const data = await response.json();
  return data
})

export const fetchUsersById = createAsyncThunk(
  'users/fetchUserById',
  async (userId) => {
    const response = await fetch(`http://localhost:3000/users/${userId}`);
    const data = await response.json()
    return data
  }
)

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

export const loginUser = createAsyncThunk(
  'users/loginUser',
   async (initialUser) => {
    const response = await fetch("http://localhost:3000/login", {
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
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = (action.payload)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(fetchUsersById.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsersById.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.value = (action.payload)
      })
      .addCase(fetchUsersById.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { userAdded, userLogin } = usersSlice.actions

export default usersSlice.reducer