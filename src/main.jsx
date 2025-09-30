import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App.jsx'
import RootLayout from './components/RootLayout.jsx'
import Error from './components/Error.jsx'
import './index.css'


const router = createBrowserRouter(
  {
    path: '/',
    element: <RootLayout />,   
    errorElement: <Error />,
    children: [
      {
        path: 'drama',
        element: <Drama />
      },
      {
        path: 'movie',
        element: <Movie />
      },
      {
        path: 'ani/:id',   /* : -> 변수의 역할 */
        element: <Ani />
      },
      {
        path: 'comedy',
        element: <Comedy />
      },
      {
        path: 'morebomb',
        element: <Morebomb />
      },
      {
        path: 'now',
        element: <Now />
      },
    ]
  },

)



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </StrictMode>,
)
