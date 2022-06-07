import { logout } from '../features/authSlice'
import { useAppDispatch, useSelector } from '../store'
import { fetchNotes, noteSelecter } from '../features/noteSlice'
import { Note } from '../lib/firestoreApi'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { notes } = useSelector(noteSelecter)

  const handleFetchNotes = () => {
    dispatch(fetchNotes())
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <div>
      <h1>ホーム画面</h1>
      <p>ノートの一覧です。</p>
      <button type='button' onClick={handleFetchNotes}>
        ノート取得
      </button>
      <ul>
        {notes.map((note: Note) => (
          <li key={note.id}>{note.name}</li>
        ))}
      </ul>
      <p>ログイン済の状態です。</p>
      <button type='button' onClick={handleLogout}>
        ログアウト
      </button>
    </div>
  )
}
