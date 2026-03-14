import React from 'react';
import './Button.css';

const Button = ({
    children,
    variant = 'primary',
    href,
    to,
    as: Component = href ? 'a' : 'button',
    onClick,
    className = '',
    ...props
}) => {
    // If 'to' is provided but 'as' is not explicitly set, we should use 'Link' if available,
    // but the safest way is to let the user pass 'as={Link}' as they already are.

    return (
        <Component
            href={href}
            to={to}
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
            {...props}
        >
            {children}
        </Component>
    );
};

export default Button;
