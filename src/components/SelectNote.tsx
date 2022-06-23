import { ChangeEvent, useEffect } from "react";
import { useAppDispatch, useSelector } from "../store";
import { fetchNotes, noteSelector, setCurrentNote } from "../features/noteSlice";
import { Note } from "../lib/firestoreApi";
import { fetchSections } from "../features/sectionSlice";

export const SelectNote = () => {
  const dispatch = useAppDispatch()
  const { notes } = useSelector(noteSelector)

  useEffect(() => {
    dispatch(fetchNotes())
  }, [])

  const handleSelectNote = (e: ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCurrentNote(e.target.value))
    dispatch(fetchSections(e.target.value))
  }

  return (
    <div>
      <select className='py-2 px-4 pr-9 block w-full border-gray-200 rounded-full text-sm focus:border-blue-500 focus:ring-blue-500' onChange={handleSelectNote}>
        <option>ノートを選択</option>
        {notes.map((note: Note) => (
          <option key={note.id} value={note.id}>{note.name}</option>
        ))}
      </select>
    </div>
  )
}
