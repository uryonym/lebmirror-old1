import { useAppDispatch } from '../store'
import { login } from '../features/authSlice'

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
    <div>
      <h1>ログイン画面</h1>
      <button type='button' onClick={handleLogin}>
        Googleでログイン
      </button>
    </div>
  )
}
