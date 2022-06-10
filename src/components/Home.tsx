import { logout } from '../features/authSlice'
import { useAppDispatch, useSelector } from '../store'
import { fetchNotes, noteSelector } from '../features/noteSlice'
import { Note, Page, Section } from '../lib/firestoreApi'
import { fetchSections, sectionSelector } from '../features/sectionSlice'
import { fetchPages, pageSelector } from '../features/pageSlice'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { notes } = useSelector(noteSelector)
  const { sections } = useSelector(sectionSelector)
  const { pages } = useSelector(pageSelector)

  const handleFetchNotes = () => {
    dispatch(fetchNotes())
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
