import { SelectNote } from './SelectNote'
import { useAppDispatch, useSelector } from '../store'
import { authSelector, logout } from '../features/authSlice'
import { DefaultPalette, ILinkStyles, IStackStyles, IStackTokens, Link, Stack, StackItem, Text } from '@fluentui/react'

export const Header = () => {
  const dispatch = useAppDispatch()
  const { authenticated } = useSelector(authSelector)

  const handleLogout = () => {
    dispatch(logout())
  }

  const headerStyle: IStackStyles = {
    root: {
      backgroundColor: DefaultPalette.themePrimary,
      height: 50,
      padding: '0 32px',
    },
  }

  const headerToken: IStackTokens = {
    childrenGap: 16,
  }

  const linkStyle: ILinkStyles = {
    root: {
      color: DefaultPalette.white,
      selectors: {
        ':hover': {
          color: DefaultPalette.whiteTranslucent40,
          textDecoration: 'none',
        },
      },
    },
  }

  return (
    <Stack horizontal verticalAlign='center' styles={headerStyle} tokens={headerToken}>
      <Text variant='large' styles={{ root: { color: DefaultPalette.white } }}>
        lebmirror
      </Text>
      {authenticated && (
        <>
          <SelectNote />
          <Link onClick={handleLogout} styles={linkStyle}>
            ノート作成
          </Link>
          <Link onClick={handleLogout} styles={linkStyle}>
            ログアウト
          </Link>
        </>
      )}
    </Stack>
  )
}
