import { Page } from '../lib/firestoreApi'
import { ChangeEvent, useState } from 'react'
import { useAppDispatch, useSelector } from '../store'
import { sectionSelector } from '../features/sectionSlice'
import { changePage, createPage, destroyPage, pageSelector, setCurrentPage } from '../features/pageSlice'
import { Stack, Typography, List, ListItem, ListItemButton, ListItemText } from '@mui/material'

export const PageList = () => {
  const dispatch = useAppDispatch()
  const { currentSection } = useSelector(sectionSelector)
  const { pages } = useSelector(pageSelector)
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

  return (
    <Stack>
      <Typography variant='subtitle1' p={1}>
        ページ
      </Typography>
      <List dense disablePadding>
        {pages.map((page: Page) => (
          <ListItem key={page.id} disablePadding divider>
            <ListItemButton onClick={() => handleSelectPage(page.id)}>
              <ListItemText>{page.name}</ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Stack>
  )
}
