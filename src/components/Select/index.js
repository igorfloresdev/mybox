import React from 'react'

const Select = ({ label, defaultOption = '--- Selecione ---', options, className, getValue, value }) => {

    const selectValue = (event) => {
        getValue(event.target.value)
    }


    return (
        <div>
            {label &&
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            }
            <select onChange={selectValue} value={value} className={`select select-bordered ${className}`}>
                <option value=''>{defaultOption}</option>
                { options.map( option => <option key={option.id} value={option.name}>{option.name}</option> ) }
            </select>
        </div>
    )
}

export default Select