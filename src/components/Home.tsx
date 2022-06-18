import { authSelector, logout } from '../features/authSlice'
import { useAppDispatch, useSelector } from '../store'
import { changeNote, createNote, destroyNote, fetchNotes, noteSelector, setCurrentNote } from '../features/noteSlice'
import { Note, Page, Section } from '../lib/firestoreApi'
import { changeSection, createSection, destroySection, fetchSections, sectionSelector, setCurrentSection } from '../features/sectionSlice'
import { changePage, createPage, destroyPage, fetchPages, pageSelector, setCurrentPage } from '../features/pageSlice'
import { ChangeEvent, useState } from 'react'
import LebEditor from './LebEditor'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { uid } = useSelector(authSelector)
  const { notes, currentNote } = useSelector(noteSelector)
  const { sections, currentSection } = useSelector(sectionSelector)
  const { pages, currentPage } = useSelector(pageSelector)

  const [noteName, setNoteName] = useState('')
  const [renameNote, setRenameNote] = useState<Note>()
  const [sectionName, setSectionName] = useState('')
  const [renameSection, setRenameSection] = useState<Section>()
  const [pageName, setPageName] = useState('')
  const [renamePage, setRenamePage] = useState<Page>()

  const handleLogout = () => {
    dispatch(logout())
  }

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

  const handleInputRenameNote = (e: ChangeEvent<HTMLInputElement>) => {
    setRenameNote({ ...renameNote, name: e.target.value })
  }

  const handleRenameNote = () => {
    dispatch(changeNote(renameNote))
    setRenameNote(undefined)
  }

  const handleCancelRenameNote = () => {
    setRenameNote(undefined)
  }

  const handleSelectNote = (noteId: string) => {
    dispatch(setCurrentNote(noteId))
    dispatch(fetchSections(noteId))
  }

  const handleUpdateNote = (noteId: string) => {
    const currentNote = notes.find((x) => x.id === noteId)
    setRenameNote(currentNote)
  }

  const handleDeleteNote = (noteId: string) => {
    dispatch(destroyNote(noteId))
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

  const handleInputRenameSection = (e: ChangeEvent<HTMLInputElement>) => {
    setRenameSection({ ...renameSection, name: e.target.value })
  }

  const handleRenameSection = () => {
    dispatch(changeSection(renameSection))
    setRenameSection(undefined)
  }

  const handleCancelRenameSection = () => {
    setRenameSection(undefined)
  }

  const handleSelectSection = (sectionId: string) => {
    dispatch(setCurrentSection(sectionId))
    dispatch(fetchPages(sectionId))
  }

  const handleUpdateSection = (sectionId: string) => {
    const currentSection = sections.find((x) => x.id === sectionId)
    setRenameSection(currentSection)
  }

  const handleDeleteSection = (sectionId: string) => {
    dispatch(destroySection(sectionId))
  }

  const handleInputPageName = (e: ChangeEvent<HTMLInputElement>) => {
    setPageName(e.target.value)
  }

  const handleCreatePage = () => {
    const data: Page = {
      name: pageName,
      content: '',
      sectionId: currentSection.id,
      createdAt: new Date(),
    }
    dispatch(createPage(data))
  }

  const handleInputRenamePage = (e: ChangeEvent<HTMLInputElement>) => {
    setRenamePage({ ...renamePage, name: e.target.value })
  }

  const handleRenamePage = () => {
    dispatch(changePage(renamePage))
    setRenamePage(undefined)
  }

  const handleCancelRenamePage = () => {
    setRenamePage(undefined)
  }

  const handleSelectPage = (pageId: string) => {
    dispatch(setCurrentPage(pageId))
  }

  const handleUpdatePage = (pageId: string) => {
    const currentPage = pages.find((x) => x.id === pageId)
    setRenamePage(currentPage)
  }

  const handleDeletePage = (pageId: string) => {
    dispatch(destroyPage(pageId))
  }

  return (
    <div>
      <h1>ホーム画面</h1>
      <p>ログイン済の状態です。</p>
      <button type='button' className='basic-btn' onClick={handleLogout}>
        ログアウト
      </button>
      <h2>ノート一覧</h2>
      <button type='button' className='basic-btn' onClick={handleFetchNotes}>
        ノート取得
      </button>
      <div>
        <input type='test' value={noteName} onChange={handleInputNoteName} />
        <button type='button' onClick={handleCreateNote}>
          ノート作成
        </button>
      </div>
      {renameNote && (
        <div>
          <input type='text' value={renameNote.name} onChange={handleInputRenameNote} />
          <button type='button' onClick={handleRenameNote}>
            名前を更新
          </button>
          <button type='button' onClick={handleCancelRenameNote}>
            キャンセル
          </button>
        </div>
      )}
      <ul>
        {notes.map((note: Note) => (
          <li key={note.id}>
            <a href='#' onClick={() => handleSelectNote(note.id)}>
              {note.name}
            </a>
            <button type='button' onClick={() => handleUpdateNote(note.id)}>
              名前変更
            </button>
            <button type='button' onClick={() => handleDeleteNote(note.id)}>
              削除
            </button>
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
      {renameSection && (
        <div>
          <input type='text' value={renameSection.name} onChange={handleInputRenameSection} />
          <button type='button' onClick={handleRenameSection}>
            名前を更新
          </button>
          <button type='button' onClick={handleCancelRenameSection}>
            キャンセル
          </button>
        </div>
      )}
      <ul>
        {sections.map((section: Section) => (
          <li key={section.id}>
            <a href='#' onClick={() => handleSelectSection(section.id)}>
              {section.name}
            </a>
            <button type='button' onClick={() => handleUpdateSection(section.id)}>
              名前変更
            </button>
            <button type='button' onClick={() => handleDeleteSection(section.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
      <h2>ページ一覧</h2>
      <div>
        <input type='test' value={pageName} onChange={handleInputPageName} />
        <button type='button' onClick={handleCreatePage}>
          ページ作成
        </button>
      </div>
      {renamePage && (
        <div>
          <input type='text' value={renamePage.name} onChange={handleInputRenamePage} />
          <button type='button' onClick={handleRenamePage}>
            名前を更新
          </button>
          <button type='button' onClick={handleCancelRenamePage}>
            キャンセル
          </button>
        </div>
      )}
      <ul>
        {pages.map((page: Page) => (
          <li key={page.id}>
            <a href='#' onClick={() => handleSelectPage(page.id)}>
              {page.name}
            </a>
            <button type='button' onClick={() => handleUpdatePage(page.id)}>
              名前変更
            </button>
            <button type='button' onClick={() => handleDeletePage(page.id)}>
              削除
            </button>
          </li>
        ))}
      </ul>
      <LebEditor content={currentPage?.content} />
    </div>
  )
}
