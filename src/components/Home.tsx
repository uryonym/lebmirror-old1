import { logout } from '../features/authSlice'
import { useAppDispatch, useSelector } from '../store'
import { fetchNotes, noteSelecter } from '../features/noteSlice'
import { Note, Section } from '../lib/firestoreApi'
import { fetchSections, sectionSelecter } from '../features/sectionSlice'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { notes } = useSelector(noteSelecter)
  const { sections } = useSelector(sectionSelecter)

  const handleFetchNotes = () => {
    dispatch(fetchNotes())
  }

  const handleFetchSections = (noteId: string) => {
    dispatch(fetchSections(noteId))
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
            <a href='#'>{section.name}</a>
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
