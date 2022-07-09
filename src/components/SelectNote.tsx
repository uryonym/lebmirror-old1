import { useEffect, useMemo } from 'react'
import { useAppDispatch, useSelector } from '../store'
import { fetchNotes, noteSelector, setCurrentNote } from '../features/noteSlice'
import { fetchSections } from '../features/sectionSlice'
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material'

export const SelectNote = () => {
  const dispatch = useAppDispatch()
  const { notes } = useSelector(noteSelector)

  useEffect(() => {
    dispatch(fetchNotes())
  }, [])

  const handleSelectNote = (e) => {
    dispatch(setCurrentNote(e.target.value))
    dispatch(fetchSections(e.target.value))
  }

  return (
    <FormControl fullWidth>
      <InputLabel id='selectNote'>ノートを選択</InputLabel>
      <Select labelId='selectNote' label='ノートを選択' onChange={handleSelectNote} autoWidth>
        {notes.map((note) => (
          <MenuItem key={note.id} value={note.id}>
            {note.name}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
