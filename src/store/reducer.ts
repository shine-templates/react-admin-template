import { combineReducers } from 'redux'
import layoutSlice from './reducers/layoutSlice'
import authSlice from './reducers/authSlice'
import messageSlice from './reducers/messageSlice'
import deleteSlice from './reducers/utilSlice'
import workforceSlice from './reducers/workforceSlice'

const allReducers = combineReducers({
  layoutSlice,
  authSlice,
  messageSlice,
  deleteSlice,
  workforceSlice,
})

export default allReducers
