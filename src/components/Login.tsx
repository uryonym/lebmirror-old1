import { useAppDispatch } from '../store'
import { login } from '../features/authSlice'
import { DefaultButton, IStackStyles, Stack, StackItem } from '@fluentui/react'

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
    <Stack verticalAlign='center' styles={{ root: { height: '100%' } }}>
      <StackItem align='center'>
        <DefaultButton onClick={handleLogin}>Googleでログイン</DefaultButton>
      </StackItem>
    </Stack>
  )
}
