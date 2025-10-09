import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App.jsx'
import RootLayout from './pages/RootLayout.jsx'
import Error from './pages/Error.jsx'
import GenrePage from './pages/GenrePage.jsx'
import './index.css'
import MovieDetail from './pages/MovieDetail.jsx'
import Search from "./pages/Search.jsx"
import Moregak from './pages/Moregak.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import TrendingPage from './pages/TrendingPage.jsx'

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
        path: 'tv/:id',
        element: <MovieDetail />,
      },
      {
        path: 'search',
        element: <Search />,
      },
      {
        path: '/moregak',
        element: < Moregak />,
      },
      {
        path: 'profile/:type',
        element: <ProfilePage />,
      },
      {
        path: 'trending',
        element: <TrendingPage />,
      },
      // 아래 추가!
      {
        path: '*',
        element: <Error />,
      },
    ]
  },
]
)



createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)
