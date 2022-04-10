import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface workForceState {
  selectName: string
}

const initialState: workForceState = {
  selectName: '',
}
export const workforceSlice = createSlice({
  name: 'workforceSlice',
  initialState,
  reducers: {
    setSelectName: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        selectName: action.payload,
      }
    },
  },
})

export const { setSelectName } = workforceSlice.actions

export default workforceSlice.reducer
