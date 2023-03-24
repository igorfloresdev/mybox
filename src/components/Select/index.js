import React from 'react'

const Select = ({ label, defaultOption = '--- Selecione ---', options, className, getValue, value }) => {

    const selectValue = (event) => {
        getValue(event.target.value)
    }


    return (
        <div className="w-full">
            {label &&
                <label className="label">
                    <span className="label-text">{label}</span>
                </label>
            }
            <select onChange={selectValue} value={value} className={`select select-bordered w-full`}>
                <option value=''>{defaultOption}</option>
                { options.map( option => <option key={option.id} value={option.id}>{option.name}</option> ) }
            </select>
        </div>
    )
}

export default Select