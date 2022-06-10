import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getPages, Page } from '../lib/firestoreApi'
import { RootState } from '../store'

export interface PageState {
  pages: Page[]
  currentPage?: Page
  status: 'idle' | 'loading' | 'failed'
}

const initialState: PageState = {
  pages: [],
  currentPage: undefined,
  status: 'idle',
}

export const fetchPages = createAsyncThunk('page/fetch', async (sectionId: string, thunkApi) => {
  try {
    const response = await getPages(sectionId)
    return { pages: response }
  } catch (e) {
    return thunkApi.rejectWithValue('データ取得（page/fetch）に失敗しました。\n' + e)
  }
})

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPages.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(fetchPages.fulfilled, (state, action) => {
      const { pages } = action.payload
      return { ...state, status: 'idle', pages }
    })
    builder.addCase(fetchPages.rejected, (state) => ({ ...state, status: 'failed' }))
  },
})

export const pageSelector = (state: RootState) => state.page
