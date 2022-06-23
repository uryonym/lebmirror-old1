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
    setSectionName('')
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
    setPageName('')
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

  if (currentNote) {
    return (
      <ReflexContainer orientation='vertical'>
        <ReflexElement>
          <div>
            <div>
              <label htmlFor='hs-trailing-button-add-on' className='sr-only'>
                Label
              </label>
              <div className='flex rounded-md shadow-sm m-2'>
                <input
                  type='text'
                  id='hs-trailing-button-add-on'
                  name='hs-trailing-button-add-on'
                  className='py-2 px-3 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  value={sectionName}
                  onChange={handleInputSectionName}
                />
                <button
                  type='button'
                  className='py-2 px-3 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm'
                  onClick={handleCreateSection}
                >
                  作成
                </button>
              </div>
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
            <ul className='max-w-xs flex flex-col m-2'>
              {sections.map((section: Section) => (
                <li
                  key={section.id}
                  className='inline-flex items-center gap-x-2 py-2 px-3 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg'
                >
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
              <label htmlFor='hs-trailing-button-add-on' className='sr-only'>
                Label
              </label>
              <div className='flex rounded-md shadow-sm m-2'>
                <input
                  type='text'
                  id='hs-trailing-button-add-on'
                  name='hs-trailing-button-add-on'
                  className='py-2 px-3 block w-full border-gray-200 shadow-sm rounded-l-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500'
                  value={pageName}
                  onChange={handleInputPageName}
                />
                <button
                  type='button'
                  className='py-2 px-3 inline-flex flex-shrink-0 justify-center items-center gap-2 rounded-r-md border border-transparent font-semibold bg-blue-500 text-white hover:bg-blue-600 focus:z-10 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-sm'
                  onClick={handleCreatePage}
                >
                  作成
                </button>
              </div>
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
            <ul className='max-w-xs flex flex-col m-2'>
              {pages.map((page: Page) => (
                <li
                  key={page.id}
                  className='inline-flex items-center gap-x-2 py-2 px-3 text-sm font-medium bg-white border text-gray-800 -mt-px first:rounded-t-lg first:mt-0 last:rounded-b-lg'
                >
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
  } else {
    return <p>ノートを選択してください。</p>
  }
}
