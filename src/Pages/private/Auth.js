import axios from 'axios'
import React, { useEffect } from 'react'
import { useCookies } from 'react-cookie'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../../components/Navbar'

const Auth = () => {

  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])

  const navigate = useNavigate()

  useEffect(() => {
    if (cookies) {
      axios.get(`http://localhost:3001/users?authToken=${cookies.authToken}`)
      .then(response => {
        if (!response.data[0]){
          navigate('/')
          console.log('unauthorized access')
        }
      })
      .catch(response => {
        navigate('/')
        console.log(response)
      })
    }
  })

  const menuItems = [
    {
      id: 1,
      name: 'Dashboard',
      link: '/auth/dashboard'
    },
    {
      id: 2,
      name: 'Produtos',
      link: '/auth/products'
    },
    {
      id: 3,
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

export default Auth