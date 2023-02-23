import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'

// import all components
import Username from './components/Username';
import Password from './components/Password';
import Register from './components/Register';
import Profile from './components/Profile';
import Recovery from './components/Recovery';
import Reset from './components/Reset';
import PageNotFound from './components/PageNotFound';

/** root routes */
const router = createBrowserRouter([
  {
    path: '/',
    element: <Username></Username>
  },
  {
    path: '/register',
    element: <Register />
  },
  {
    path: '/password',
    element : <Password />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/recovery',
    element: <Recovery />
  },
  {
    path: '/reset',
    element : <Reset />
  },
  {
    path: '*',
    element: <PageNotFound />
  }
])
function App() {
  return (
    <>
    <RouterProvider router={router}></RouterProvider>

    </>
  );
}

export default App;
