import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface MessageState {
  count: string | number
}

const initialState: MessageState = {
  count: '',
}

export const messageSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setMessage: (state, action: PayloadAction<string | number>) => {
      return {
        ...state,
        count: action.payload,
      }
    },
  },
})

export const { setMessage } = messageSlice.actions

export default messageSlice.reducer
