import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface AuthState {
  auth: string[]
}

const initialState: AuthState = {
  auth: [],
}

export const layoutSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        auth: action.payload,
      }
    },
  },
})

export const { setAuth } = layoutSlice.actions

export default layoutSlice.reducer
