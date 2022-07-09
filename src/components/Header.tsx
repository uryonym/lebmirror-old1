import { SelectNote } from './SelectNote'
import { useAppDispatch, useSelector } from '../store'
import { authSelector, logout } from '../features/authSlice'
import { DefaultPalette, Stack, Text } from '@fluentui/react'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { authenticated } = useSelector(authSelector)

  const handleLogout = () => {
    dispatch(logout())
  }

  const headerStyle = {
    root: {
      backgroundColor: DefaultPalette.themePrimary,
      height: 50,
      padding: '0 32px',
      color: DefaultPalette.white,
    },
  }

  return (
    <Stack horizontal verticalAlign='center' styles={headerStyle}>
      <Text variant='large' styles={{ root: { color: DefaultPalette.white } }}>
        lebmirror
      </Text>
      <nav className='flex items-center justify-between w-full mx-auto px-4'>
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
    </Stack>
  )
}
