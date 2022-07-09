import { useAppDispatch, useSelector } from '../store'
import { authSelector, logout } from '../features/authSlice'
import { SelectNote } from './SelectNote'
import { Button, Stack } from '@mui/material'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { authenticated } = useSelector(authSelector)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <Stack direction='row'>
      <h3>lebmirror</h3>
      {authenticated && (
        <>
          <SelectNote />
          <Button variant='text' onClick={handleLogout}>
            ノート作成
          </Button>
          <Button variant='text' onClick={handleLogout}>
            ログアウト
          </Button>
        </>
      )}
    </Stack>
  )
}
