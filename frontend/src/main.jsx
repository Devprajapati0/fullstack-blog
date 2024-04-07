import React from 'react'
import ReactDOM from 'react-dom/client'
import { store } from './components/index.js'
import './index.css'
import { Provider } from 'react-redux'

import Rout from './Rout.jsx'



 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
     <Rout />
    </Provider>
  </React.StrictMode>,
)
