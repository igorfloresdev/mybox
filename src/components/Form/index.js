import React from 'react'

const Form = ({children, className}) => {
  return (
    <form onSubmit={ (e) => e.preventDefault() } className={className}>
        {children}
    </form>
  )
}

export default Form