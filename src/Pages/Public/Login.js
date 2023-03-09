import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { BsBoxSeam } from 'react-icons/bs'
import Card from '../../components/Card'
import Input from '../../components/Input'
import Toast from '../../components/Toast'
import { useNavigate } from 'react-router-dom'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const [toastText, setToastText] = useState('')
  const [toastDisplay, setToastDisplay] = useState('')

  const [cookies, setCookie, removeCookie] = useCookies(['authToken'])

  let navigate = useNavigate()

  useEffect( () => {
    if(cookies.authToken) {
      navigate('/auth/dashboard')
    }
  })
  
  const LoginUser = () => {
    axios.get(`http://localhost:3001/users?username=${username}&password=${password}`)
    .then(response => {
      if (response.data[0]) {
        setCookie('authToken', response.data[0].authToken)
        navigate('/auth/dashboard')
      } else {
        setToastText('Login ou senha incorreto !')
        setToastDisplay(true)
      }
    })
  }

  return (
    <div className="flex gap-x-32 h-screen flex-row items-center justify-center">
      <Toast text={toastText} display={toastDisplay} className="alert-error" duration={3000} />
      <BsBoxSeam size={400} />
      <Card title="My Box" text="Digite seu login e senha para acessar !" action={LoginUser} button="Entrar">
        <Input getValue={ value => setUsername(value) } type="text" placeholder="Usuário" className="mt-12" />
        <Input getValue={ value => setPassword(value) } type="password" placeholder="Senha" className="mb-2" />
        <a href="/" className="mb-2 text-sm">Esqueci minha senha!</a>
      </Card>
    </div>
  )
}

export default Login