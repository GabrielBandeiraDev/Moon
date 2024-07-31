import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import Friends from './friends'
import './index.css'
import Earn from "./earn.tsx"
import Airdrop from "./Airdrop.tsx"
import Exchange from "./exchange.tsx"
import {RouterProvider,createBrowserRouter} from "react-router-dom"

const lista=([
  {path:"/friends",element:<Friends/>},
  {path:"/",element:<App/>},
  {path:"/exchange",element:<Exchange/>},
  {path : "/earn", element:<Earn/>},
  {path: "/Airdrop", element:<Airdrop/>}
])

const rotas=(createBrowserRouter(lista))


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={rotas}/>
  </React.StrictMode>,
)
