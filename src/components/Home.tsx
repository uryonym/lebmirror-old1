import { authSelector, logout } from '../features/authSlice'
import { useAppDispatch, useSelector } from '../store'
import { createNote, fetchNotes, noteSelector, setCurrentNote } from '../features/noteSlice'
import { Note, Page, Section } from '../lib/firestoreApi'
import { createSection, fetchSections, sectionSelector } from '../features/sectionSlice'
import { fetchPages, pageSelector } from '../features/pageSlice'
import { ChangeEvent, useState } from 'react'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { uid } = useSelector(authSelector)
  const { notes, currentNote } = useSelector(noteSelector)
  const { sections } = useSelector(sectionSelector)
  const { pages } = useSelector(pageSelector)

  const [noteName, setNoteName] = useState('')
  const [sectionName, setSectionName] = useState('')

  const handleFetchNotes = () => {
    dispatch(fetchNotes())
  }

  const handleInputNoteName = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value)
  }

  const handleCreateNote = () => {
    const data: Note = {
      name: noteName,
      uid,
      createdAt: new Date(),
    }
    dispatch(createNote(data))
  }

  const handleSelectNote = (noteId: string) => {
    dispatch(setCurrentNote(noteId))
    dispatch(fetchSections(noteId))
  }

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
  }

  const handleFetchPages = (sectionId: string) => {
    dispatch(fetchPages(sectionId))
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h1>ホーム画面</h1>
      <h2>ノート一覧</h2>
      <button type='button' onClick={handleFetchNotes}>
        ノート取得
      </button>
      <div>
        <input type='test' value={noteName} onChange={handleInputNoteName} />
        <button type='button' onClick={handleCreateNote}>
          ノート作成
        </button>
      </div>
      <ul>
        {notes.map((note: Note) => (
          <li key={note.id}>
            <a href='#' onClick={() => handleSelectNote(note.id)}>
              {note.name}
            </a>
          </li>
        ))}
      </ul>
      <h2>セクション一覧</h2>
      <div>
        <input type='test' value={sectionName} onChange={handleInputSectionName} />
        <button type='button' onClick={handleCreateSection}>
          セクション作成
        </button>
      </div>
      <ul>
        {sections.map((section: Section) => (
          <li key={section.id}>
            <a href='#' onClick={() => handleFetchPages(section.id)}>
              {section.name}
            </a>
          </li>
        ))}
      </ul>
      <h2>ページ一覧</h2>
      <ul>
        {pages.map((page: Page) => (
          <li key={page.id}>
            <a href='#'>{page.name}</a>
          </li>
        ))}
      </ul>
      <p>ログイン済の状態です。</p>
      <button type='button' onClick={handleLogout}>
        ログアウト
      </button>
    </div>
  )
}
