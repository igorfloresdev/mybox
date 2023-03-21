import React from 'react'
import { NavLink } from 'react-router-dom';
import { BsBoxSeam } from 'react-icons/bs'
import { AiOutlineLogout } from 'react-icons/ai';
import Button from '../Button';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie'

const Navbar = ({ children, menuItems }) => {
    let navigate = useNavigate()
    const [cookie, setCookie, removeCookie] = useCookies(['authToken'])
    
    const logout = () => {
        removeCookie('authToken')
        navigate('/')
    }

    return (
        <div className="drawer">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <div className="navbar bg-base-200">
                    <div className="flex-none">
                        <label htmlFor="my-drawer" className="btn btn-square btn-ghost drawer-button">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-5 h-5 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                        </label>
                    </div>
                    <div className="flex-1">
                        <NavLink to={'/auth/dashboard'} className="btn btn-ghost normal-case text-lg">
                            <BsBoxSeam className="mr-2" size={22} />
                            MyBox
                        </NavLink>
                    </div>
                    <div className="navbar-end">
                        <Button onClick={logout} className="mr-4" color="ghost" name="sair"><AiOutlineLogout className="pl-2" size={30} /></Button>
                    </div>
                </div>
                <div className="w-screen flex justify-center py-10">
                    {children}
                </div>
            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer" className="drawer-overlay"></label>
                <ul className="menu p-4 w-80 bg-base-100 text-base-content">
                    {menuItems.map(menuItem => {
                        return <li key={menuItem.id}><NavLink to={menuItem.link}>{menuItem.name}</NavLink></li>
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Navbar