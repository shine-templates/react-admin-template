// import { getList } from '@/assets/api/personalManage/leaveMessage'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import conf from '@/assets/conf'
type Tags = Array<{ routeName: string; path: string }>

export interface LayoutState {
  openKeys: string[]
  visitiedViews: Tags
  unHandleNumber: number
}

const initialState: LayoutState = {
  openKeys: [],
  visitiedViews: [{ routeName: '首页', path: '/Dashboard' }],
  unHandleNumber: 0,
}
export const layoutSlice = createSlice({
  name: 'layoutSlice',
  initialState,
  reducers: {
    handleOpenkeys: (state, action: PayloadAction<string[]>) => {
      return {
        ...state,
        openKeys: action.payload,
      }
    },
    handleSetTags: (state, action: PayloadAction<Tags>) => ({
      ...state,
      visitiedViews: action.payload,
    }),
    handleRemoveTags: (state, action: PayloadAction<Tags>) => ({
      ...state,
      visitiedViews: [],
    }),
    handleClearTags: state => ({ ...state, visitiedViews: [] }),
    getUnHandleNumber: (state, action: PayloadAction<number>) => {
      return { ...state, unHandleNumber: action.payload }
    },
  },
})

// export const asyncGetUnHandleNumber = payload => dispatch => {
//   // 只在机构管理调用
//   if (conf.loginType === '2') {
//     getList({ pageSize: 1, pageNum: 1 }, { organizationId: payload, status: '1' }).then(res => {
//       dispatch(getUnHandleNumber(res.data.total))
//     })
//   }
// }

export const { handleOpenkeys, handleSetTags, handleRemoveTags, getUnHandleNumber } = layoutSlice.actions

export default layoutSlice.reducer
