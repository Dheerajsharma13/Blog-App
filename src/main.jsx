import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home.jsx'
import { AuthLayout,Login } from './components/index.js'
import AddPost from './pages/AddPost.jsx'
import Signup from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'

const router = createBrowserRouter([
  {
    path: "/Blog-app/",
    element: <App />,
    children: [
      {
        path: "/Blog-app/",
        element: <Home />,
      },
      {
        path: "/Blog-app/login",
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },
      {
        path: "/Blog-app/signup",
        element: (
          <AuthLayout authentication={false}>
             <Signup />
          </AuthLayout>
        ),
      },
      {
        path: "/Blog-app/add-post",
        element: (
            <AuthLayout authentication>
                {" "}
                <AddPost />
            </AuthLayout>
        ),
    },
      {
        path: "/Blog-app/all-posts",
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
      },
      {
        path: "/Blog-app/edit-post/:slug",
            element: (
                <AuthLayout authentication>
                    {" "}
                    <EditPost />
                </AuthLayout>
            ),
      },
      {
        path: "/Blog-app/post/:slug",
        element: <Post />,
    },
    ]
       
  }
])

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
     <RouterProvider router={router}/>
    </Provider >
  </React.StrictMode>,
)
