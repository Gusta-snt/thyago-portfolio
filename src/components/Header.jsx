import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, FileText } from 'lucide-react';
import Button from './Button';
import './Header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    const navLinks = [
        { name: 'Início', path: '/' },
        { name: 'Sobre', path: '/about' },
        { name: 'Livros', path: '/books' },
        { name: 'Empresas', path: '/companies' },
    ];

    return (
        <header className="header">
            <div className="container header-container">
                <Link to="/" className="header-logo">
                    Prof. Thyago Carvalho
                </Link>

                {/* Desktop Navigation */}
                <nav className="header-nav desktop-only">
                    <ul className="nav-list">
                        {navLinks.map((link) => (
                            <li key={link.name}>
                                <Link
                                    to={link.path}
                                    className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                                >
                                    {link.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <div className="header-actions desktop-only">
                    <Button
                        href="http://lattes.cnpq.br/"
                        target="_blank"
                        variant="secondary"
                        className="lattes-btn"
                    >
                        <FileText size={18} style={{ marginRight: '8px' }} />
                        Currículo Lattes
                    </Button>
                </div>

                {/* Mobile Menu Toggle */}
                <button className="mobile-menu-btn mobile-only" onClick={toggleMenu} aria-label="Toggle menu">
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <nav className="mobile-nav">
                        <ul className="mobile-nav-list">
                            {navLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.path}
                                        className="mobile-nav-link"
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                            <li>
                                <Button
                                    href="http://lattes.cnpq.br/"
                                    target="_blank"
                                    variant="secondary"
                                    className="mobile-lattes-btn"
                                >
                                    <FileText size={18} style={{ marginRight: '8px' }} />
                                    Currículo Lattes
                                </Button>
                            </li>
                        </ul>
                    </nav>
                )}
            </div>
        </header>
    );
};

export default Header;
