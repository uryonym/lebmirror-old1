import { SelectNote } from './SelectNote'
import { useAppDispatch, useSelector } from '../store'
import { authSelector, logout } from '../features/authSlice'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { authenticated } = useSelector(authSelector)

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <header className='flex flex-nowrap justify-start w-full bg-gray-800 text-sm py-3'>
      <nav className='flex items-center justify-between w-full mx-auto px-4'>
        <span className='text-xl font-semibold text-white'>lebmirror</span>
        {authenticated && (
          <>
            <SelectNote />
            <div>
              <button type='button' className='font-medium text-gray-400 hover:text-gray-500 mr-3' onClick={handleLogout}>
                Create Note
              </button>
              <button type='button' className='font-medium text-gray-400 hover:text-gray-500' onClick={handleLogout}>
                Logout
              </button>
            </div>
          </>
        )}
      </nav>
    </header>
  )
}
