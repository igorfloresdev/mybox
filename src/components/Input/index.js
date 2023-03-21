const Input = ({ type = "text", placeholder, className, getValue, label, size, required = false, value }) => {

    const inputValue = (event) => {
        getValue(event.target.value)
    }

    return (
        <div>
            {label &&
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            }
            <input required={required}
                onChange={inputValue}
                size={size}
                type={type}
                placeholder={placeholder}
                className={`input input-bordered w-full max-w-xs ${className}`}
                value={value}
            />
        </div>
    )
}

export default Input;