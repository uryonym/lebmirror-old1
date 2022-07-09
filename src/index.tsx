import * as ReactDOM from 'react-dom'
import { App } from './App'
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter } from 'react-router-dom'
import 'react-reflex/styles.css'
import './style/index.css'

const element = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
)
const container = document.getElementById('root')
ReactDOM.render(element, container)
