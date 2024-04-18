import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchCurrentUser = createAsyncThunk('users/fetchCurrentUser', async () => {
  const response = await fetch('/check_session');
  if (response.ok) {
    const data = await response.json();
    return data;
  } else {
    return null
  }
});

export const createUser = createAsyncThunk(
  'users/createUser',
   async (initialUser) => {
    const response = await fetch("/signup", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(initialUser)
    })
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error)
    }
  }
)

export const loginUser = createAsyncThunk(
  'users/loginUser',
    async (initialUser) => {
    const response = await fetch("/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(initialUser)
    })
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error)
    }
  }
)

export const logoutUser = createAsyncThunk(
  'users/logoutUser',
    async () => {
    const response = await fetch("/logout", {
      method: "DELETE"
    })
    if (response.ok) {
      return true;
    } else {
      const data = await response.json();
      throw new Error(data.error)
    }
  }
)

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async(updatedUser) => {
    const response = await fetch("/edit_account", {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(updatedUser)
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error)
    }
  }
)

export const deleteAccount = createAsyncThunk(
  'users/deleteUser',
    async () => {
    const response = await fetch("/delete_account", {
      method: "DELETE"
    })
    if (response.ok) {
      return true;
    } else {
      const data = await response.json();
      throw new Error(data.error)
    }
  }
)

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await fetch("/users")
  const data = await response.json();
  if (response.ok) {
    return data;
  } else {
    throw new Error(data.error)
  }
})

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    status: "",
    users: [],
    currentUser: null,
    error: null
  },  
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchCurrentUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.status = 'failed'; 
      })

      .addCase(createUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.users.push(action.payload);
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(loginUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(logoutUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(logoutUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.currentUser = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(updateUser.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.currentUser = action.payload;
        state.error = null;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(deleteAccount.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(deleteAccount.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.currentUser = null;
        state.error = null;
      })
      .addCase(deleteAccount.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(fetchUsers.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'fulfilled';
        state.users = action.payload;
        state.error = null;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
  }
})

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer