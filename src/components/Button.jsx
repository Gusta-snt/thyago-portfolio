import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    href,
    onClick,
    className = '',
    ...props
}) => {
    const Component = href ? 'a' : 'button';

    return (
        <Component
            href={href}
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Button;
