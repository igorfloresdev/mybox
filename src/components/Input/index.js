const Input = ({ type = "text", placeholder, className, getValue, label, size, required = false, value }) => {

    const inputValue = (event) => {
        getValue(event.target.value)
    }

    return (
        <div className={`${className}`}>
            {label &&
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            }
            <input required={required}
                onChange={inputValue}
                size={size}
                type={type}
                min={0}
                placeholder={placeholder}
                className={`input input-bordered w-full ${className}`}
                value={value}
            />
        </div>
    )
}

export default Input;