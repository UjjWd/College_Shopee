
import './index.css'
import Home from './componenets/Home'
import Login from './componenets/Login'
import Signup from './componenets/Signup';
import AddProduct from './componenets/AddProduct';
import LikedProducts from './componenets/LikedProducts';
import ProductDetail from './componenets/ProductDetail';
import * as React from "react";
import { createRoot } from "react-dom/client";
import CategoryPage from './componenets/CategoryPage';
import MyProducts from './componenets/MyProducts';
import MyProfile from './componenets/MyProfile';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";



const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Home/>
    ),
  },
  {
    path: "/login",
    element:(<Login/>)
  },
  {path: "/signup",
    element:(<Signup/>)
  },
  {path: "/add-product",
  element:(<AddProduct/>)
},
{
  path: "/liked-product",
  element:(<LikedProducts/>)
},
{
  path: "/product/:productId",
  element:(<ProductDetail/>)

},
{
  path: "/category/:catName",
element:(<CategoryPage/>)

},
{
  path:"/my-products",
element:(<MyProducts/>)

},
{
  path:"/my-profile",
element:(<MyProfile/>)

}
]);


createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);