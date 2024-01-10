import './App.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import HomeContainer from './container/HomeContainer';

import Register from './container/Register';
import Login from './container/Login';
import Categories from './container/Categories';

import Layout from './layout/Layout';
import Create from './container/Create';


const router = createBrowserRouter([
  {

    element: <Layout />,
    children: [
      { path: "/",
       element: <HomeContainer /> },
      { path: "/register",
       element: <Register /> },
      { path: "/login",
      element: <Login /> },
      { path: "/category",
       element: <Categories /> },
       { path: "/create",
       element: <Create /> }


    ],
  },
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />


    </div>

  );
}

export default App
