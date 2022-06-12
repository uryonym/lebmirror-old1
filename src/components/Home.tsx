import { authSelector, logout } from '../features/authSlice'
import { useAppDispatch, useSelector } from '../store'
import { createNote, fetchNotes, noteSelector } from '../features/noteSlice'
import { Note, Page, Section } from '../lib/firestoreApi'
import { fetchSections, sectionSelector } from '../features/sectionSlice'
import { fetchPages, pageSelector } from '../features/pageSlice'
import { ChangeEvent, useState } from 'react'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { uid } = useSelector(authSelector)
  const { notes } = useSelector(noteSelector)
  const { sections } = useSelector(sectionSelector)
  const { pages } = useSelector(pageSelector)

  const [noteNmae, setNoteName] = useState('')

  const handleFetchNotes = () => {
    dispatch(fetchNotes())
  }

  const handleInputNoteName = (e: ChangeEvent<HTMLInputElement>) => {
    setNoteName(e.target.value)
  }

  const handleCreateNote = () => {
    const data: Note = {
      name: noteNmae,
      uid,
      createdAt: new Date(),
    }
    dispatch(createNote(data))
  }

  const handleFetchSections = (noteId: string) => {
    dispatch(fetchSections(noteId))
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
        <input type='test' value={noteNmae} onChange={handleInputNoteName} />
        <button type='button' onClick={handleCreateNote}>
          ノート作成
        </button>
      </div>
      <ul>
        {notes.map((note: Note) => (
          <li key={note.id}>
            <a href='#' onClick={() => handleFetchSections(note.id)}>
              {note.name}
            </a>
          </li>
        ))}
      </ul>
      <h2>セクション一覧</h2>
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
