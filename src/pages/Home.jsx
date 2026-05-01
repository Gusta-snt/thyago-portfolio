import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Award, Users, BookOpen, Briefcase, ChevronRight, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';
import BookCard from '../components/BookCard';
import './Home.css';

const FloatingIcons = () => {
    const icons = [
        { icon: 'fa-dollar-sign', top: '10%', left: '15%', size: '1.2rem', delay: '0s' },
        { icon: 'fa-coins', top: '25%', left: '75%', size: '1.5rem', delay: '1s' },
        { icon: 'fa-money-bill-trend-up', top: '60%', left: '20%', size: '1.8rem', delay: '2s' },
        { icon: 'fa-chart-line', top: '75%', left: '60%', size: '1.4rem', delay: '0.5s' },
        { icon: 'fa-vault', top: '40%', left: '45%', size: '2rem', delay: '1.5s' },
        { icon: 'fa-piggy-bank', top: '15%', left: '55%', size: '1.3rem', delay: '2.5s' },
        { icon: 'fa-money-bill', top: '80%', left: '10%', size: '1.1rem', delay: '3s' },
        { icon: 'fa-credit-card', top: '45%', left: '85%', size: '1.2rem', delay: '0.2s' },
    ];

    return (
        <div className="decorative-icons-container">
            {icons.map((item, index) => (
                <div
                    key={index}
                    className="floating-icon"
                    style={{
                        top: item.top,
                        left: item.left,
                        fontSize: item.size,
                        animationDelay: item.delay,
                        opacity: 0.4 + (Math.random() * 0.2) // Increased visibility
                    }}
                >
                    <i className={`fas ${item.icon}`}></i>
                </div>
            ))}
        </div>
    );
};

const Home = () => {
    const [recentBooks, setRecentBooks] = useState([]);
    const [companies, setCompanies] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [booksRes, compsRes] = await Promise.all([
                    supabase
                        .from('books')
                        .select('*')
                        .order('created_at', { ascending: false })
                        .limit(3),
                    supabase
                        .from('companies')
                        .select('*')
                        .order('created_at', { ascending: false })
                        .limit(4)
                ]);

                if (!booksRes.error) setRecentBooks(booksRes.data || []);
                if (!compsRes.error) setCompanies(compsRes.data || []);
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    // Animation Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const stats = [
        { id: 1, value: "10+", label: "Anos de Experiência", icon: <Briefcase size={24} /> },
        { id: 2, value: "CEIA", label: "Coord. Projetos IA", icon: <Award size={24} />, url: "https://ceia.ufg.br/" },
        { id: 3, value: "UFG", label: "Professor Associado", icon: <Users size={24} />, url: "https://emc.ufg.br/" },
        { id: 4, value: "EMBRAPII", label: "Pesquisador", icon: <BookOpen size={24} />, url: "https://embrapii.org.br/" },
    ];

    return (
        <div className="home-page">
            {/* Hero Section */}
            <section className="hero-section">
                <div className="container hero-container">
                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        <motion.h1 className="hero-title" variants={itemVariants}>
                            Professor <span className="highlight">Thyago C. Marques</span>
                        </motion.h1>
                        <motion.p className="hero-subtitle" variants={itemVariants}>
                            Especialista em Inteligência Artificial, Engenharia Econômica e Otimização Matemática.
                            Transformando dados em decisões estratégicas.
                        </motion.p>
                        <motion.div className="hero-actions" variants={itemVariants}>
                            <Button to="/about" variant="primary" as={Link}>
                                Conheça Minha Trajetória
                            </Button>
                            <Button
                                href="https://lattes.cnpq.br/1763926064124591"
                                target="_blank"
                                variant="secondary"
                            >
                                <FileText size={18} style={{ marginRight: '8px' }} />
                                Currículo Lattes
                            </Button>
                        </motion.div>
                    </motion.div>

                    <motion.div
                        className="hero-image-container"
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.5 }}
                    >
                        <img
                            src="http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4772258J6"
                            alt="Professor Thyago C. Marques"
                            className="hero-image"
                        />
                        <div className="hero-shape"></div>
                    </motion.div>
                </div>
            </section>

            {/* About Preview Card */}
            <section className="section bg-alt" style={{ overflow: 'hidden' }}>
                <div className="container">
                    <motion.div
                        className="preview-card about-card"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                        variants={fadeInUp}
                    >
                        <div className="preview-content">
                            <h2 className="preview-title">Sobre Mim</h2>
                            <p className="preview-text">
                                Com uma sólida formação acadêmica e prática, atuo na interseção entre Engenharia, Economia e Tecnologia. Sou Professor Associado na <a href="https://emc.ufg.br/" target="_blank" rel="noopener noreferrer" className="inline-link">UFG</a>, Coordenador de Projetos no <a href="https://ceia.ufg.br/" target="_blank" rel="noopener noreferrer" className="inline-link">CEIA (Centro de Excelência em IA)</a> e ex-Subsecretário de Ciência e Tecnologia de Goiás. Minha missão é aplicar modelos matemáticos e IA para resolver problemas complexos de mercado e sociedade.
                            </p>
                            <Link to="/about" className="preview-link">
                                Ler Biografia Completa <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="preview-image-wrapper decorative">
                            <FloatingIcons />
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Authority / Stats Section */}
            <section className="section stats-section">
                <div className="container stats-container">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={stat.id}
                            className="stat-card"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <div className="stat-icon">{stat.icon}</div>
                            <h3 className="stat-value">
                                {stat.url ? (
                                    <a href={stat.url} target="_blank" rel="noopener noreferrer" className="stat-link">
                                        {stat.value}
                                    </a>
                                ) : (
                                    stat.value
                                )}
                            </h3>
                            <p className="stat-label">{stat.label}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Recent Books Section */}
            <section className="section books-preview">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Últimas Publicações</h2>
                        <Link to="/books" className="view-all-link">
                            Ver Todos os Livros <ArrowRight size={16} />
                        </Link>
                    </div>
                    {loading ? (
                        <div className="loading-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 0', color: '#64748b' }}>
                            <Loader2 className="spinner" size={48} style={{ color: 'var(--color-primary)', marginBottom: '1rem' }} />
                            <p>Carregando publicações recentes...</p>
                        </div>
                    ) : (
                        <motion.div
                            className="books-grid"
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                            variants={containerVariants}
                        >
                            {recentBooks.map((book) => (
                                <motion.div key={book.id} variants={itemVariants}>
                                    <BookCard
                                        {...book}
                                        cover={book.cover_url}
                                    />
                                </motion.div>
                            ))}
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Companies & Projects Preview Card */}
            <section className="section bg-alt">
                <div className="container">
                    <motion.div
                        className="preview-card companies-card reverse"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={fadeInUp}
                    >
                        <div className="preview-content">
                            <h2 className="preview-title">Empresas e Projetos</h2>
                            <p className="preview-text">
                                Texto resumo das empresas e projetos
                            </p>
                            <Link to="/companies" className="preview-link">
                                Ver Portfólio de Empresas <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="preview-grid-images">
                            {loading && companies.length === 0 ? (
                                <div className="loading-state" style={{ gridColumn: 'span 2', padding: '1rem' }}>
                                    <Loader2 className="spinner" size={24} />
                                </div>
                            ) : companies.length > 0 ? (
                                companies.map((company) => (
                                    <div key={company.id} className="grid-img-item" style={{ backgroundColor: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <img
                                            src={company.logo_url}
                                            alt={company.name}
                                            style={{ maxWidth: '80%', maxHeight: '80%', objectFit: 'contain' }}
                                        />
                                    </div>
                                ))
                            ) : (
                                // Fallback if no companies found
                                <div className="grid-img-item" style={{ backgroundColor: 'white', gridColumn: 'span 2' }}>
                                    <p style={{ fontSize: '0.875rem', color: '#64748b' }}>Nenhuma empresa cadastrada.</p>
                                </div>
                            )}
                        </div>
                    </motion.div>
                </div>
            </section>


        </div>
    );
};

export default Home;
