import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App.jsx'
import RootLayout from './components/RootLayout.jsx'
import Error from './components/Error.jsx'
import GenrePage from './components/GenrePage.jsx'
import './index.css'
import MovieDetail from './components/MovieDetail.jsx'
import Search from "./components/Search.jsx"

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <App />,
      },
      {
        path: 'genres/:genreId',
        element: <GenrePage />,
      },
      {
        path: ':id',
        element: <MovieDetail />,
      }
        ,
        {
          path: 'search',
          element: <Search />,
        }

    ]
  },
]
)



createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
