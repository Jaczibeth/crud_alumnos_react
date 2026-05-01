import React from 'react';

const ButtonRegister = ({ onClick, text = "Registrar", type = "button", disabled = false }) => {
    return (
        <button
            type={type}
            className="btn-universal-premium"
            onClick={onClick}
            disabled={disabled}
        >
            <i className="bi bi-plus-circle me-2"></i>
            {text}
        </button>
    );
};

export default ButtonRegister;
