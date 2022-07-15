import { useAppDispatch, useSelector } from '../store'
import { authSelector, logout } from '../features/authSlice'
import { SelectNote } from './SelectNote'
import { AppBar, Button, Container, Stack, Toolbar, Typography } from '@mui/material'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { authenticated } = useSelector(authSelector)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <AppBar position='static'>
      <Container>
        <Toolbar disableGutters>
          <Typography
            variant='h6'
            noWrap
            component='a'
            href-='/'
            sx={{
              mr: 2,
              fontWeight: 700,
              colsor: 'inherit',
            }}
          >
            lebmirror
          </Typography>
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
        </Toolbar>
      </Container>
    </AppBar>
  )
}
