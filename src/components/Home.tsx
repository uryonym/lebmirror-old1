import { useAppDispatch, useSelector } from '../store'
import { noteSelector } from '../features/noteSlice'
import { Page } from '../lib/firestoreApi'
import { sectionSelector } from '../features/sectionSlice'
import { changePage, createPage, destroyPage, pageSelector, setCurrentPage } from '../features/pageSlice'
import { ChangeEvent, useState } from 'react'
import LebEditor from './LebEditor'
import { ReflexContainer, ReflexElement, ReflexSplitter } from 'react-reflex'
import { SectionList } from './SectionList'
import { PageList } from './PageList'

export const Home = () => {
  const dispatch = useAppDispatch()
  const { currentNote } = useSelector(noteSelector)
  const { currentSection } = useSelector(sectionSelector)
  const { pages, currentPage } = useSelector(pageSelector)

  const [pageName, setPageName] = useState('')
  const [renamePage, setRenamePage] = useState<Page>()

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
        <ReflexElement size={200} minSize={50}>
          <SectionList />
        </ReflexElement>
        <ReflexSplitter />
        <ReflexElement size={200} minSize={50}>
          <PageList />
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
