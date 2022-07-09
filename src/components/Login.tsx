import { useAppDispatch } from '../store'
import { login } from '../features/authSlice'
import { Stack, Box, Button } from '@mui/material'

export const Login = () => {
  const dispatch = useAppDispatch()
  const handleLogin = async () => {
    const userData = {
      displayName: undefined,
      email: undefined,
    }
    dispatch(login(userData))
  }

  return (
    <Stack>
      <Box>
        <Button variant='contained' onClick={handleLogin}>
          Googleでログイン
        </Button>
      </Box>
    </Stack>
  )
}
