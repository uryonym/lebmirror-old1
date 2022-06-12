import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addSection, deleteSection, getSections, Section } from '../lib/firestoreApi'
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

export const createSection = createAsyncThunk('section/create', async (section: Section, thunkAPI) => {
  try {
    const response = await addSection(section)
    return { currentSection: response }
  } catch (e) {
    return thunkAPI.rejectWithValue('データ作成（section/create）に失敗しました。\n' + e)
  }
})

export const destroySection = createAsyncThunk('section/destroy', async (sectionId: string, thunkAPI) => {
  try {
    await deleteSection(sectionId)
    return { sectionId }
  } catch (e) {
    return thunkAPI.rejectWithValue('データ削除（section/destroy）に失敗しました。\n' + e)
  }
})

export const sectionSlice = createSlice({
  name: 'section',
  initialState,
  reducers: {
    setCurrentSection: (state, action: PayloadAction<string>) => {
      const currentSection = state.sections.find((x) => x.id === action.payload)
      return { ...state, currentSection }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSections.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(fetchSections.fulfilled, (state, action) => {
      const { sections } = action.payload
      return { ...state, status: 'idle', sections }
    })
    builder.addCase(fetchSections.rejected, (state) => ({ ...state, status: 'failed' }))
    builder.addCase(createSection.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(createSection.fulfilled, (state, action) => {
      const { currentSection } = action.payload
      const sections = state.sections.concat()
      sections.push(currentSection)
      return { status: 'idle', sections, currentSection }
    })
    builder.addCase(createSection.rejected, (state) => ({ ...state, status: 'failed' }))
    builder.addCase(destroySection.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(destroySection.fulfilled, (state, action) => {
      const { sectionId } = action.payload
      const sections = state.sections.filter((x) => x.id !== sectionId)
      return { ...state, status: 'idle', sections }
    })
    builder.addCase(destroySection.rejected, (state) => ({ ...state, status: 'failed' }))
  },
})

export const { setCurrentSection } = sectionSlice.actions
export const sectionSelector = (state: RootState) => state.section
