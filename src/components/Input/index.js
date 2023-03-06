const Input = ({type = "text", placeholder, className}) => {
    return (
        <input type={type} placeholder={placeholder} className={`input input-bordered w-full max-w-xs ${className}`} />
    )
}

export default Input;