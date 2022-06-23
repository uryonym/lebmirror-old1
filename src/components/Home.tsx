import { useAppDispatch, useSelector } from '../store'
import { noteSelector } from '../features/noteSlice'
import { Page, Section } from '../lib/firestoreApi'
import { changeSection, createSection, destroySection, sectionSelector, setCurrentSection } from '../features/sectionSlice'
import { changePage, createPage, destroyPage, fetchPages, pageSelector, setCurrentPage } from '../features/pageSlice'
import { ChangeEvent, useState } from 'react'
import LebEditor from './LebEditor'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { currentNote } = useSelector(noteSelector)
  const { sections, currentSection } = useSelector(sectionSelector)
  const { pages, currentPage } = useSelector(pageSelector)

  const [sectionName, setSectionName] = useState('')
  const [renameSection, setRenameSection] = useState<Section>()
  const [pageName, setPageName] = useState('')
  const [renamePage, setRenamePage] = useState<Page>()

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
    <ReflexContainer orientation='vertical'>
      <ReflexElement>
        <div>
          <div>
            <input type='test' value={sectionName} onChange={handleInputSectionName} />
            <button type='button' className='outline-btn' onClick={handleCreateSection}>
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
        </div>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement>
        <div>
          <div>
            <input type='test' value={pageName} onChange={handleInputPageName} />
            <button type='button' className='outline-btn' onClick={handleCreatePage}>
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
        </div>
      </ReflexElement>
      <ReflexSplitter />
      <ReflexElement>
        <LebEditor content={currentPage?.content} />
      </ReflexElement>
    </ReflexContainer>
  )
}
