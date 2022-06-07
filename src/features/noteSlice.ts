import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getNotes, Note } from '../lib/firestoreApi'
import { RootState } from '../store'

export interface NoteState {
  notes: Note[]
  currentNote?: Note
  status: 'idle' | 'loading' | 'failed'
}

const initialState: NoteState = {
  notes: [],
  currentNote: undefined,
  status: 'idle',
}

export const fetchNotes = createAsyncThunk('note/fetch', async (_, thunkApi) => {
  try {
    const response = await getNotes()
    return { notes: response }
  } catch (e) {
    return thunkApi.rejectWithValue('データ取得（note/fetch）に失敗しました。\n' + e)
  }
})

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchNotes.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(fetchNotes.fulfilled, (state, action) => {
      const { notes } = action.payload
      return { ...state, status: 'idle', notes }
    })
    builder.addCase(fetchNotes.rejected, (state) => ({ ...state, status: 'failed' }))
  },
})

export const noteSelecter = (state: RootState) => state.note
