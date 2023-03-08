import React from 'react'

const Toast = ({ text, className, display }) => {
    return (
        <div className="toast toast-top toast-center w-max">
            {display ?
                <div className={`alert ${className}`}>
                    <div>
                        <span>{text}</span>
                    </div>
                </div> : ''
            }
        </div>
    )
}

export default Toast