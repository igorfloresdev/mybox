import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const auth = () => {

  const menuItems = [
    {
      name: 'Dashboard',
      link: '/auth'
    },
    {
      name: 'Produtos',
      link: '/auth/products'
    },
    {
      name: 'Categorias',
      link: '/auth/categories'
    }
  ]

  return (
    <div>
      <Navbar menuItems={menuItems}>
        <Outlet /> { /*Outlet goes inside because it's use a Navbar with drawer */ }
      </Navbar>
    </div>
  )
}

export default auth