import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App';
import configureStore from './redux/store/configureStore'
import './components/NavBar_Components/navBar_component.css'
import './components/index.css'
import './components/students-info/studentsInfo.css'

const store = configureStore()
store.subscribe(() => {
  console.log('store updated', store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </BrowserRouter>
  </Provider>, document.getElementById('root')
)