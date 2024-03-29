import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Addpost, Home, Signup,Login, store } from './components/index.js'
import { createBrowserRouter } from 'react-router-dom'

const rout = createBrowserRouter([
  {
    path:"/",
    element:<App />,
    children:[
      {
        path:"/",
        element:<Home />
      },
      {
        path:"/Signup",
        element:<Signup />
      },
      {
        path:"/Addpost",
        element:<Addpost />
      },
      {
        path:"/Login",
        element:<Login />
      },
    ]
  }
])

 
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <Provider store={store}>
     <RouterProvider router={rout}/>
    </Provider>
  </React.StrictMode>,
)
