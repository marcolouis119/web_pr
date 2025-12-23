import React from 'react';
import styles from './Button.module.css';

const Button = ({ variant = 'primary', size = 'medium', children, ...props }) => {
    const buttonClasses = `
        ${styles.button}
        ${styles[variant]}
        ${styles[size]}
    `;

    return (
        <button className={buttonClasses} {...props}>
            {children}
        </button>
    );
};

export default Button;
