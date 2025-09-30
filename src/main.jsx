import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App.jsx'
import RootLayout from './components/RootLayout.jsx'
import Drama from './components/Drama.jsx'
import Movie from './components/Movie.jsx'
import Ani from './components/Ani.jsx'
import Comedy from './components/Comedy.jsx'
import Morebomb from './components/Morebomb.jsx'
import Now from './components/Now.jsx'
import './index.css'


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        path: '/drama',
        element: <Drama />
      },
      {
        path: '/movie',
        element: <Movie />
      },
      {
        path: '/ani/:id',   /* : -> 변수의 역할 */
        element: <Ani />
      },
      {
        path: '/comedy',
        element: <Comedy />
      },
      {
        path: '/morebomb',
        element: <Morebomb />
      },
      {
        path: '/now',
        element: <Now />
      },
    ]
  },

])



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
