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
    console.log("response from signing up in usersslice", data)
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
    console.log("response from loggin in in users slice", data)
    return data;
  }
)

export const logoutUser = createAsyncThunk(
  'users/logoutUser',
    async () => {
    const response = await fetch("http://localhost:3000/logout", {
      method: "DELETE"
    })
    if (response.ok) {
      const res = await response.json();
      console.log("this", res)
      return res;
    } else {
      throw new Error('Logout failed');
    }
  }
)

export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async () => {
  const response = await fetch('/check_session');
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('User not logged in');
  }
});

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    users: [],
    errors: [],
    currentUser: null
  },  
  reducers: {

  },
  extraReducers(builder) {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.users = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message
      })
      .addCase(createUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.users.push(action.payload)
        if (action.payload.error) {
          state.errors = action.payload.error;
        } else {
          state.currentUser = action.payload;
        }
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message
      })
      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        if (action.payload.error) {
          state.errors = action.payload.error;
        } else {
          state.currentUser = action.payload;
        }
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message
      })
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        if (action.payload.error) {
          state.errors = action.payload.error;
        } else {
          state.currentUser = action.payload;
        }
        state.isLoggedIn = true
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message
      })
      .addCase(logoutUser.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'fulfilled'
        state.currentUser = null;
        console.log("in reducer", state.currentUser)
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed'
        state.errors = action.error.message
      })
  }
})

export default usersSlice.reducer