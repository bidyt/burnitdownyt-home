import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Product from './Components/Product.js';
import BIDapp from './Components/BIDapp.js'
import Contact from './Components/Contact.js'
import reportWebVitals from './reportWebVitals';
import {createBrowserRouter,RouterProvider} from 'react-router'
const root = ReactDOM.createRoot(document.getElementById('root'));
const rooter = createBrowserRouter([
  {path:"/",element:<BIDapp/>},
  {path:"/Product",element:<Product/>},
  {path:"/Contact",element:<Contact/>},
])
//<RouterProvider router={rooter}/>
root.render(
  <StrictMode>
   <RouterProvider router={rooter}/>
  </StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
