import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux'
import { RouterProvider } from 'react-router-dom'
import { Addpost, Home, Signup,Login, store, Editpost, Allposts } from './components/index.js'
import { createBrowserRouter } from 'react-router-dom'
import Post from './components/pages/Post.jsx'
import Authlayout from './components/sections/Authlayout.jsx'

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
        element: (
          <Authlayout authentication={false}>
              <Signup />
          </Authlayout>
      ),
      },
      {
        path:"/Addpost",
        element:(
          <Authlayout authentication>
              {" "}
              <Addpost />
          </Authlayout>
      ),
      },
      {
        path:"/Login",
        element:  ( <Authlayout authentication={false}>
        <Login />
    </Authlayout>)
      },
      {
        path:"/Allposts",
        element:(
          <Authlayout authentication>
              {" "}
              <Allposts />
          </Authlayout>
      ),
      },
      {
        path:"/Editpost/:postId",
        element:(
          <Authlayout authentication>
              {" "}
              <Editpost />
          </Authlayout>
      ),
      },
      {
        path:"/Post/:postId",
        element:<Post />
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
