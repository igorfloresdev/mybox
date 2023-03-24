import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useCookies } from 'react-cookie'
import { BsBoxSeam } from 'react-icons/bs'
import Card from '../../components/Card'
import Input from '../../components/Input'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import { ENV } from '../helpers/env'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')


  const [cookies, setCookie] = useCookies(['authToken', 'userId', 'username'])

  let navigate = useNavigate()

  useEffect(() => {
    if (cookies.authToken) {
      axios.get(`${ENV}/users?authToken=${cookies.authToken}`)
        .then(response => {
          if (response.data[0]) {
            navigate('/auth/dashboard')
          } else {
            setCookie('authToken', '')
            setCookie('userId', '')
            setCookie('userName', '')
            navigate('/')
          }
        })
    }
  }, [cookies.authToken, navigate, setCookie])

  const LoginUser = () => {
    axios.get(`${ENV}/users?username=${username}&password=${password}`)
      .then(response => {
        if (response.data[0]) {
          setCookie('authToken', response.data[0].authToken)
          setCookie('userId', response.data[0].id)
          setCookie('userName', response.data[0].username)
          navigate('/auth/dashboard')
        } else {
          toast.error('Login ou senha incorreto !')
        }
      })
  }

  return (
    <div className="flex gap-x-32 h-screen flex-row items-center justify-center">
      <BsBoxSeam className="hidden lg:block" size={400} />
      <Card title="My Box" text="Digite seu login e senha para acessar !" action={LoginUser} button="Entrar">
        <div className="flex mt-4 justify-center lg:hidden">
          <BsBoxSeam size={50} />
        </div>
        <Input getValue={value => setUsername(value)} type="text" placeholder="Usuário" className="mt-6" />
        <Input getValue={value => setPassword(value)} type="password" placeholder="Senha" className="mb-2" />
        <p onClick={() => toast('Login: igorflores | Senha: igorfloresdev', { icon: "✌️" })} className="mb-2 text-sm cursor-pointer">Esqueci minha senha!</p>
      </Card>
    </div>
  )
}

export default Login