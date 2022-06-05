import { signInWithRedirect } from 'firebase/auth'
import { firebaseAuth, googleProvider } from './lib/firebase'

export const Login = () => {
  return (
    <div>
      <h1>ログイン画面</h1>
      <button type='button' onClick={() => signInWithRedirect(firebaseAuth, googleProvider)}>
        Googleでログイン
      </button>
    </div>
  )
}
