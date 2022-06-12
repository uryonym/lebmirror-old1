import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { addNote, getNotes, Note } from '../lib/firestoreApi'
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

export const createNote = createAsyncThunk('note/create', async (note: Note, thunkAPI) => {
  try {
    const response = await addNote(note)
    return { currentNote: response }
  } catch (e) {
    return thunkAPI.rejectWithValue('データ作成（note/create）に失敗しました。\n' + e)
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
    builder.addCase(createNote.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(createNote.fulfilled, (state, action) => {
      const { currentNote } = action.payload
      const notes = state.notes.concat()
      notes.push(currentNote)
      return { status: 'idle', notes, currentNote }
    })
    builder.addCase(createNote.rejected, (state) => ({ ...state, status: 'failed' }))
  },
})

export const noteSelector = (state: RootState) => state.note
