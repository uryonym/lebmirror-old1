import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addPage, deletePage, getPages, Page, updatePage } from '../lib/firestoreApi'
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

export const createPage = createAsyncThunk('page/create', async (page: Page, thunkAPI) => {
  try {
    const response = await addPage(page)
    return { currentPage: response }
  } catch (e) {
    return thunkAPI.rejectWithValue('データ作成（page/create）に失敗しました。\n' + e)
  }
})

export const changePage = createAsyncThunk('page/change', async (page: Page, thunkAPI) => {
  try {
    await updatePage(page)
    return { page }
  } catch (e) {
    return thunkAPI.rejectWithValue('データ更新（page/change）に失敗しました。\n' + e)
  }
})

export const destroyPage = createAsyncThunk('page/destroy', async (pageId: string, thunkAPI) => {
  try {
    await deletePage(pageId)
    return { pageId }
  } catch (e) {
    return thunkAPI.rejectWithValue('データ削除（page/destroy）に失敗しました。\n' + e)
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
    builder.addCase(createPage.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(createPage.fulfilled, (state, action) => {
      const { currentPage } = action.payload
      const pages = state.pages.concat()
      pages.push(currentPage)
      return { status: 'idle', pages, currentPage }
    })
    builder.addCase(createPage.rejected, (state) => ({ ...state, status: 'failed' }))
    builder.addCase(changePage.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(changePage.fulfilled, (state, action) => {
      const { page } = action.payload
      const pages = state.pages.map((x) => (x.id === page.id ? page : x))
      return { ...state, status: 'idle', pages }
    })
    builder.addCase(changePage.rejected, (state) => ({ ...state, status: 'failed' }))
    builder.addCase(destroyPage.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(destroyPage.fulfilled, (state, action) => {
      const { pageId } = action.payload
      const pages = state.pages.filter((x) => x.id !== pageId)
      return { ...state, status: 'idle', pages }
    })
    builder.addCase(destroyPage.rejected, (state) => ({ ...state, status: 'failed' }))
  },
})

export const pageSelector = (state: RootState) => state.page
