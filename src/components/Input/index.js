const Input = ({type = "text", placeholder, className, getValue}) => {

    const inputValue = (event) => {
        getValue(event.target.value)
    }

    return (
        <input onChange={inputValue} type={type} placeholder={placeholder} className={`input input-bordered w-full max-w-xs ${className}`} />
    )
}

export default Input;