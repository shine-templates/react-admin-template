// ### 不一定需要的
// 保存删除图片的id
import { createSlice, PayloadAction, createAsyncThunk, AnyAction } from '@reduxjs/toolkit'
import { myOrg } from '@/assets/api/login'
import { formatSelect } from '@/utils/helper'
import type { FormatSelect } from '@/utils/helper'

export const getAsyncOrganizations = createAsyncThunk('/organization/myOrg', async () => {
  const response = await myOrg()
  return response.data
})

export interface DeleteState {
  hpContentFileList: string[]
  organizationSelect: Array<FormatSelect>
  organizationId: string
  organizationName: string

  currentStaffOption: Array<{ name: string; userId: string }>
  nextStaffOption: Array<{ name: string; userId: string }>
  departmentCount: Array<string>
}

const initialState: DeleteState = {
  hpContentFileList: [],
  organizationSelect: [],
  organizationId: '',
  organizationName: '',
  departmentCount: [],

  currentStaffOption: [],
  nextStaffOption: [],
}

export const deleteSlice = createSlice({
  name: 'deleteSlice',
  initialState,
  reducers: {
    setDeleteIds: (state, action: PayloadAction<string[]>) => ({ ...state, hpContentFileList: action.payload }),
    removeDeleteIds: state => ({ ...state, hpContentFileList: [] }),
    setOrganizationId: (state, action: PayloadAction<string>) => ({ ...state, organizationId: action.payload }),
    setOrganizationName: (state, action: PayloadAction<string>) => ({ ...state, organizationName: action.payload }),
    setCurrentStaffOption: (state, action: PayloadAction<Array<{ name: string; userId: string }>>) => ({
      ...state,
      currentStaffOption: action.payload,
    }),
    setCurrentStaffOptionEmpty: state => ({ ...state, currentStaffOption: [] }),
    removeCurrentStaffOption: (state, action: PayloadAction<string>) => {
      const arr = JSON.parse(JSON.stringify(state.currentStaffOption))
      for (let i = 0; i < state.currentStaffOption.length; i++) {
        if (state.currentStaffOption[i].userId === action.payload) {
          arr.splice(i, 1)
        }
      }
      return {
        ...state,
        currentStaffOption: arr,
      }
    },
    setNextStaffOption: (state, action: PayloadAction<Array<{ name: string; userId: string }>>) => ({
      ...state,
      nextStaffOption: action.payload,
    }),
    setNextStaffOptionEmpty: state => ({ ...state, nextStaffOption: [] }),
    removeNextStaffOption: (state, action: PayloadAction<string>) => {
      const arr = JSON.parse(JSON.stringify(state.nextStaffOption))
      for (let i = 0; i < state.nextStaffOption.length; i++) {
        if (state.nextStaffOption[i].userId === action.payload) {
          arr.splice(i, 1)
        }
      }
      return {
        ...state,
        nextStaffOption: arr,
      }
    },
    setDepartmentCount: (state, action: PayloadAction<Array<string>>) => ({
      ...state,
      departmentCount: action.payload,
    }),
  },

  extraReducers: builder => {
    builder.addCase(getAsyncOrganizations.fulfilled, (state, action: AnyAction) => {
      const data = formatSelect(action?.payload || [], ['organizationName', 'organizationId'])
      return {
        ...state,
        organizationSelect: data,
      }
    })
  },
})

export const {
  setDeleteIds,
  removeDeleteIds,
  setOrganizationId,
  setOrganizationName,
  setCurrentStaffOption,
  setCurrentStaffOptionEmpty,
  removeCurrentStaffOption,
  setNextStaffOption,
  setNextStaffOptionEmpty,
  removeNextStaffOption,
  setDepartmentCount,
} = deleteSlice.actions

export default deleteSlice.reducer
