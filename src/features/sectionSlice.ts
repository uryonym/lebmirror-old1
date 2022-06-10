import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getSections, Section } from '../lib/firestoreApi'
import { RootState } from '../store'

export interface SectionState {
  sections: Section[]
  currentSection?: Section
  status: 'idle' | 'loading' | 'failed'
}

const initialState: SectionState = {
  sections: [],
  currentSection: undefined,
  status: 'idle',
}

export const fetchSections = createAsyncThunk('section/fetch', async (noteId: string, thunkApi) => {
  try {
    const response = await getSections(noteId)
    return { sections: response }
  } catch (e) {
    return thunkApi.rejectWithValue('データ取得（section/fetch）に失敗しました。\n' + e)
  }
})

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchSections.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(fetchSections.fulfilled, (state, action) => {
      const { sections } = action.payload
      return { ...state, status: 'idle', sections }
    })
    builder.addCase(fetchSections.rejected, (state) => ({ ...state, status: 'failed' }))
  },
})

export const sectionSelecter = (state: RootState) => state.section
