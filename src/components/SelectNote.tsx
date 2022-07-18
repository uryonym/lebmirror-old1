import { useEffect, useMemo, useState } from 'react'
import { useAppDispatch, useSelector } from '../store'
import { fetchNotes, noteSelector, setCurrentNote } from '../features/noteSlice'
import { fetchSections } from '../features/sectionSlice'
import { Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from '@mui/material'

export const SelectNote = () => {
  const dispatch = useAppDispatch()
  const [noteName, setNoteName] = useState('')
  const { notes } = useSelector(noteSelector)

  useEffect(() => {
    dispatch(fetchNotes())
  }, [])

  const handleSelectNote = (e: SelectChangeEvent) => {
    setNoteName(e.target.value)
    dispatch(setCurrentNote(e.target.value))
    dispatch(fetchSections(e.target.value))
  }

  return (
    <Box textAlign='center' sx={{ flexGrow: 1 }}>
      <FormControl sx={{ minWidth: 200 }} size='small'>
        <InputLabel id='selectNote'>ノートを選択</InputLabel>
        <Select labelId='selectNote' value={noteName} label='ノートを選択' onChange={handleSelectNote} autoWidth>
          {notes.map((note) => (
            <MenuItem key={note.id} value={note.id}>
              {note.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
