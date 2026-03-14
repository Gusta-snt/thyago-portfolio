import React from 'react';
import { ShoppingCart } from 'lucide-react';
import Button from './Button';
import './BookCard.css';

const BookCard = ({ cover, title, description, link, year, subtitle }) => {
    return (
        <div className="book-card">
            <div className="book-cover-container">
                {cover ? (
                    <img src={cover} alt={`Cover of ${title}`} className="book-cover" />
                ) : (
                    <div className="book-cover-placeholder">
                        <span>No Cover</span>
                    </div>
                )}
            </div>
            <div className="book-content">
                <span className="book-year">{year}</span>
                <h3 className="book-title">{title}</h3>
                {subtitle && <h4 className="book-subtitle">{subtitle}</h4>}
                <p className="book-description">{description}</p>
                <Button
                    href={link}
                    target="_blank"
                    variant="primary"
                    className="book-btn"
                >
                    <ShoppingCart size={16} style={{ marginRight: '8px' }} />
                    Comprar o livro
                </Button>
            </div>
        </div>
    );
};

export default BookCard;
