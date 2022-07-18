import { useAppDispatch, useSelector } from '../store'
import { authSelector, logout } from '../features/authSlice'
import { SelectNote } from './SelectNote'
import { AppBar, Button, Toolbar, Typography } from '@mui/material'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { authenticated } = useSelector(authSelector)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppBar position='static' color='transparent' elevation={1}>
      <Toolbar>
        <Typography
          variant='h6'
          sx={{
            fontWeight: 700,
          }}
        >
          lebmirror
        </Typography>
        {authenticated && (
          <>
            <SelectNote />
            <Button onClick={handleLogout}>ノート作成</Button>
            <Button onClick={handleLogout}>ログアウト</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  )
}
