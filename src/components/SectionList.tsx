import { Section } from '../lib/firestoreApi'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch, useSelector } from '../store'
import { noteSelector } from '../features/noteSlice'
import { createSection, sectionSelector, setCurrentSection } from '../features/sectionSlice'
import { fetchPages } from '../features/pageSlice'
import { Stack, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

export const SectionList = () => {
  const dispatch = useAppDispatch()
  const { currentNote } = useSelector(noteSelector)
  const { sections } = useSelector(sectionSelector)
  const [sectionName, setSectionName] = useState('')

  const handleInputSectionName = (e: ChangeEvent<HTMLInputElement>) => {
    setSectionName(e.target.value)
  }

  const handleCreateSection = () => {
    const data: Section = {
      name: sectionName,
      noteId: currentNote.id,
      createdAt: new Date(),
    }
    dispatch(createSection(data))
    setSectionName('')
  }

  const handleSelectSection = (sectionId: string) => {
    dispatch(setCurrentSection(sectionId))
    dispatch(fetchPages(sectionId))
  }

  return (
    <Stack>
      <Typography variant='subtitle1' p={1}>
        セクション
      </Typography>
      <List dense disablePadding>
        {sections.map((section: Section) => (
          <ListItem key={section.id} disablePadding divider>
            <ListItemButton onClick={() => handleSelectSection(section.id)}>
              <ListItemText>{section.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
