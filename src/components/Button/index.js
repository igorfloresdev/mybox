import React from 'react'

const Button = ({name, color = 'primary', className, onClick, children}) => {
  return (
    <button onClick={onClick} className={`btn btn-${color} ${className}`}>{name}{children}</button>
  )
}

export default Button