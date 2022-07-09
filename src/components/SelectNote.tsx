import { useEffect, useMemo } from 'react'
import { useAppDispatch, useSelector } from '../store'
import { fetchNotes, noteSelector, setCurrentNote } from '../features/noteSlice'
import { fetchSections } from '../features/sectionSlice'
import { Dropdown, IDropdownOption } from '@fluentui/react'

export const SelectNote = () => {
  const dispatch = useAppDispatch()
  const { notes } = useSelector(noteSelector)

  useEffect(() => {
    dispatch(fetchNotes())
  }, [])

  const options: IDropdownOption[] = useMemo(() => {
    return notes.map((note) => {
      return { key: note.id, text: note.name }
    })
  }, [notes])

  const handleSelectNote = (_e, option: IDropdownOption) => {
    if (typeof option.key === 'string') {
      dispatch(setCurrentNote(option.key))
      dispatch(fetchSections(option.key))
    }
  }

  return <Dropdown placeholder='ノートを選択' dropdownWidth='auto' onChange={handleSelectNote} options={options} />
}
