import React from 'react'

const Modal = ({ children, id, title, open = false }) => {
    return (
        <div className={`modal ${open ? 'modal-open' : ''}`}>
            <div className="modal-box">
                <h3 className="font-bold text-lg pb-2">{title}</h3>
                {children}
            </div>
        </div>
    )
}

export default Modal