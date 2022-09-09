import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import rootReducer from './reducer'

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
  whiteList: [], // 除 whiteList 之外的都不做持久化
  blacklist: ['authSlice'], // 除 blacklist 之外的都做持久化
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export const persistor = persistStore(store)
