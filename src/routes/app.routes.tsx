import {Routes, Route } from 'react-router-dom'
import Home from '../pages/HomePage'
import { Layout } from '../components/Layout'
import User from '../pages/User'
import { ClientDetails } from '../pages/ClientDetails'

export default function AppRoutes(){
  return (
    <Routes>
      <Route path='/' element = {<Layout />}>
        <Route path='/' element = {<Home />} />
        <Route path='/user' element={<User />}/>
        <Route path='/clientdetails' element={<ClientDetails />}/>
      </Route>
        
    </Routes>

  )
}