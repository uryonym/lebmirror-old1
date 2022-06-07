import { configureStore } from '@reduxjs/toolkit'
import { useSelector as rawUseSelector, TypedUseSelectorHook, useDispatch } from 'react-redux'
import { authSlice } from './features/authSlice'
import { noteSlice } from './features/noteSlice'

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    note: noteSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      serializableCheck: false,
    })
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useSelector: TypedUseSelectorHook<RootState> = rawUseSelector
