import Input from "./Jobs";
import React from "react";
import ReactDOM from "react-dom/client" ;
import Nav from "./Nav";
import Body from "./Body";
import { Outlet , createBrowserRouter , RouterProvider } from "react-router-dom";

const App = ()=>(
    <>
    <Nav  />
    <Outlet />
    </>
)

const router = createBrowserRouter([
    {
        path:"/" , 
        element:<App />,
        children:[
            {
                path:"/" , 
                element:<Body  />
            },
            {
                path:"/openposting",
                element:<Input  />
            }
        ]
    } , 
   
])



const root = ReactDOM.createRoot(document.getElementById("root")) ;
root.render(<RouterProvider router={router} />) ;
