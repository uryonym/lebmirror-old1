import { useAppDispatch, useSelector } from './store'
import { authSelector, login } from './features/authSlice'
import { Link, Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import { Login } from './components/Login'
import { Home } from './components/Home'
import { useCallback, useEffect } from 'react'
import { firebaseAuth } from './lib/firebase'

export const App = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const location = useLocation()
  const { authenticated } = useSelector(authSelector)

  const refresh = useCallback(
    async (uid, displayName, email) => {
      const userData = {
        uid,
        displayName,
        email,
      }
      return dispatch(login(userData))
    },
    [dispatch],
  )

  useEffect(() => {
    const f = async () => {
      firebaseAuth.onAuthStateChanged(async (user) => {
        if (user && authenticated) {
          if (location.pathname === '/login') {
            navigate('/')
          }
        }
        if (user && !authenticated) {
          return await refresh(user.uid, user.displayName, user.email)
        }
        if (!user && !authenticated) {
          if (location.pathname !== '/login') {
            navigate('/login')
          }
        }
      })
    }
    f()
  })

  return (
    <>
      <Link to='/'>Home</Link>
      <Link to='/login'>Login</Link>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='login' element={<Login />} />
      </Routes>
    </>
  )
}
