import { createAsyncThunk, createSlice, isFulfilled, SerializedError } from '@reduxjs/toolkit'
import { signInWithRedirect, signOut } from 'firebase/auth'
import { firebaseAuth, googleProvider } from '../lib/firebase'
import firebase from 'firebase/compat'
import UserCredential = firebase.auth.UserCredential
import { act } from 'react-dom/test-utils'
import { RootState } from '../store'

export interface AuthState {
  displayName?: string
  email?: string
  authenticated?: boolean
  error?: SerializedError
}

const initialState: AuthState = {
  displayName: undefined,
  email: undefined,
  authenticated: undefined,
  error: undefined,
}

interface PayLoad {
  displayName?: string
  email?: string
}

export const login = createAsyncThunk<AuthState, PayLoad>('login', async (req, thunkAPI) => {
  try {
    if (req.displayName === null) {
      const response: UserCredential = await signInWithRedirect(firebaseAuth, googleProvider)
      const displayName = response.user.displayName
      const email = response.user.email
      return { displayName, email } as PayLoad
    } else {
      return req
    }
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const logout = createAsyncThunk('logout', async (_, thunkAPI) => {
  try {
    await signOut(firebaseAuth)
  } catch (error) {
    return thunkAPI.rejectWithValue({ error: error.message })
  }
})

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.displayName = action.payload.displayName
      state.email = action.payload.email
      state.authenticated = true
    })
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.error
    })
    builder.addCase(logout.fulfilled, (state) => {
      state.authenticated = false
      state.displayName = initialState.displayName
      state.email = initialState.email
    })
    builder.addCase(logout.rejected, (state, action) => {
      state.error = action.error
    })
  },
})

export const authSelector = (state: RootState) => state.auth
