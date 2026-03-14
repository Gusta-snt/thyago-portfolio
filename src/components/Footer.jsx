import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Linkedin, Instagram, Twitter, FileText } from 'lucide-react';
import './Footer.css';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="container footer-container">
                <div className="footer-column branding">
                    <h3 className="footer-title">Prof. Thyago Carvalho</h3>
                    <p className="footer-description">
                        Educação, inovação e transformação através do conhecimento.
                        Dedicado ao avanço da pesquisa acadêmica e crescimento profissional.
                    </p>
                </div>

                <div className="footer-column links">
                    <h4 className="footer-subtitle">Links Rápidos</h4>
                    <ul className="footer-links">
                        <li><Link to="/">Início</Link></li>
                        <li><Link to="/about">Sobre</Link></li>
                        <li><Link to="/books">Livros</Link></li>
                        <li><Link to="/companies">Empresas</Link></li>
                        <li>
                            <a href="http://lattes.cnpq.br/" target="_blank" rel="noopener noreferrer">
                                Currículo Lattes
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-column contact">
                    <h4 className="footer-subtitle">Contato</h4>
                    <p className="footer-contact-item">
                        <Mail size={16} />
                        <a href="mailto:thyago@ufg.br">thyago@ufg.br</a>
                    </p>
                </div>
            </div>

            <div className="footer-bottom">
                <div className="container">
                    <p>&copy; {currentYear} Prof. Thyago Carvalho. Todos os direitos reservados.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
