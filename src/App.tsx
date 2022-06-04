import { signInWithRedirect } from 'firebase/auth'
import { firebaseAuth, googleProvider } from './lib/firebase'

export const App = () => {
  return (
    <div>
      <h1>Hello World!</h1>
      <button type='button' onClick={() => signInWithRedirect(firebaseAuth, googleProvider)}>
        Googleでログイン
      </button>
    </div>
  )
}
