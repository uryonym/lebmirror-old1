import { createRoot } from 'react-dom/client'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import 'preline/dist/hs-ui.bundle'
import './style/index.css'

const container = document.getElementById('root')
createRoot(container).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
)
