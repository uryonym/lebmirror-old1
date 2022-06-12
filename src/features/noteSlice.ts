import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { addNote, deleteNote, getNotes, Note, updateNote } from '../lib/firestoreApi'
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

export const changeNote = createAsyncThunk('note/change', async (note: Note, thunkAPI) => {
  try {
    await updateNote(note)
    return { note }
  } catch (e) {
    return thunkAPI.rejectWithValue('データ更新（note/change）に失敗しました。\n' + e)
  }
})

export const destroyNote = createAsyncThunk('note/destroy', async (noteId: string, thunkAPI) => {
  try {
    await deleteNote(noteId)
    return { noteId }
  } catch (e) {
    return thunkAPI.rejectWithValue('データ削除（note/destroy）に失敗しました。\n' + e)
  }
})

export const noteSlice = createSlice({
  name: 'note',
  initialState,
  reducers: {
    setCurrentNote: (state, action: PayloadAction<string>) => {
      const currentNote = state.notes.find((x) => x.id === action.payload)
      return { ...state, currentNote }
    },
  },
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
    builder.addCase(changeNote.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(changeNote.fulfilled, (state, action) => {
      const { note } = action.payload
      const notes = state.notes.map((x) => (x.id === note.id ? note : x))
      return { ...state, status: 'idle', notes }
    })
    builder.addCase(changeNote.rejected, (state) => ({ ...state, status: 'failed' }))
    builder.addCase(destroyNote.pending, (state) => ({ ...state, status: 'loading' }))
    builder.addCase(destroyNote.fulfilled, (state, action) => {
      const { noteId } = action.payload
      const notes = state.notes.filter((x) => x.id !== noteId)
      return { ...state, status: 'idle', notes }
    })
    builder.addCase(destroyNote.rejected, (state) => ({ ...state, status: 'failed' }))
  },
})

export const { setCurrentNote } = noteSlice.actions
export const noteSelector = (state: RootState) => state.note
