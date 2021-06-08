import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  user: null,
  status: 'loading',
  loggingInStatus: 'idle',
  signUpStatus: 'idle',
};

export const fetchLoggedInStatus = createAsyncThunk(
  'auth/fetchLoggedInStatus', 
  async (_undefined, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/logged_in');
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch(error) {
      return rejectWithValue(error.response.data)
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({email, password}, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/login', {
        user: {
          email,
          password
        }
      }, { withCredentials: true });
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch(error) {
      return rejectWithValue(error.response.data)
    }
  }
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({first_name, last_name, email, password, password_confirmation}, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/users', {
        user: {
          first_name,
          last_name,
          email,
          password,
          password_confirmation
        }
      }, { withCredentials: true });
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch(error) {
      return rejectWithValue(error.response.data)
    }
  }
);

export const logout = createAsyncThunk(
  'auth/logout',
  async (_undefined, { rejectWithValue }) => {
    try {
      const response = await axios.delete('/api/logout');
      // The value we return becomes the `fulfilled` action payload
      return response.data;
    } catch(error) {
      return rejectWithValue(error.response.data)
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      .addCase(fetchLoggedInStatus.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.user && action.payload.logged_in) {
          state.user = action.payload.user
        }
      })
      .addCase(login.pending, (state) => {
        state.loggingInStatus = 'loading';
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loggingInStatus = 'idle';
        if (action.payload.user && action.payload.logged_in) {
          state.user = action.payload.user
        }
      })
      .addCase(login.rejected, (state) => {
        state.loggingInStatus = 'failed';
      })
      .addCase(signup.pending, (state) => {
        state.signUpStatus = 'loading';
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.signUpStatus = 'idle';
        if (action.payload.user && action.payload.status === 'created') {
          state.user = action.payload.user
        }
      })
      .addCase(signup.rejected, (state) => {
        state.signUpStatus = 'failed';
      })
      .addCase(logout.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = 'idle';
        if (action.payload.logged_out) {
          state.user = null;
        };
      })
  },
});

// export const {} = authSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const authSelector = (state) => state.auth;

export default authSlice.reducer;
