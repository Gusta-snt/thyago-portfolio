import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, FileText, Award, Users, BookOpen, Briefcase, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import BookCard from '../components/BookCard';
import './Home.css';

const Home = () => {
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

    // Mock data for books
    const recentBooks = [
        {
            id: 1,
            title: "Título do Livro 1",
            subtitle: "Subtítulo do Livro",
            year: "2024",
            description: "Descrição breve do livro, abordando os principais tópicos e contribuições para a área.",
            link: "#",
            cover: "https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro"
        },
        {
            id: 2,
            title: "Título do Livro 2",
            subtitle: "Subtítulo do Livro",
            year: "2023",
            description: "Descrição breve do livro, abordando os principais tópicos e contribuições para a área.",
            link: "#",
            cover: "https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro"
        },
        {
            id: 3,
            title: "Título do Livro 3",
            subtitle: "Subtítulo do Livro",
            year: "2022",
            description: "Descrição breve do livro, abordando os principais tópicos e contribuições para a área.",
            link: "#",
            cover: "https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro"
        }
    ];

    const stats = [
        { id: 1, value: "10+", label: "Anos de Experiência", icon: <Briefcase size={24} /> },
        { id: 2, value: "CEIA", label: "Coord. Projetos IA", icon: <Award size={24} /> },
        { id: 3, value: "UFG", label: "Professor Associado", icon: <Users size={24} /> },
        { id: 4, value: "EMBRAPII", label: "Pesquisador", icon: <BookOpen size={24} /> },
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
                            Professor <span className="highlight">Thyago Carvalho</span>
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
                                href="http://lattes.cnpq.br/3478059068063711"
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
                            alt="Professor Thyago Carvalho"
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
                                Com uma sólida formação acadêmica e prática, atuo na interseção entre Engenharia, Economia e Tecnologia. Sou Professor Associado na UFG, Coordenador de Projetos no CEIA (Centro de Excelência em IA) e ex-Subsecretário de Ciência e Tecnologia de Goiás. Minha missão é aplicar modelos matemáticos e IA para resolver problemas complexos de mercado e sociedade.
                            </p>
                            <Link to="/about" className="preview-link">
                                Ler Biografia Completa <ArrowRight size={16} />
                            </Link>
                        </div>
                        <div className="preview-image-wrapper">
                            <img src="https://geekflare.com/wp-content/uploads/2023/03/img-placeholder.png" alt="Sobre" className="preview-image" />
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
                            <h3 className="stat-value">{stat.value}</h3>
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
                    <motion.div
                        className="books-grid"
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        variants={containerVariants}
                    >
                        {recentBooks.map((book) => (
                            <motion.div key={book.id} variants={itemVariants}>
                                <BookCard {...book} />
                            </motion.div>
                        ))}
                    </motion.div>
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
                            <div className="grid-img-item" style={{ backgroundColor: 'white' }}>
                                <img src="https://placehold.co/150x80/png?text=Empresa+1" alt="Logo 1" style={{ maxWidth: '100%' }} />
                            </div>
                            <div className="grid-img-item" style={{ backgroundColor: 'white' }}>
                                <img src="https://placehold.co/150x80/png?text=Empresa+2" alt="Logo 2" style={{ maxWidth: '100%' }} />
                            </div>
                            <div className="grid-img-item" style={{ backgroundColor: 'white' }}>
                                <img src="https://placehold.co/150x80/png?text=Empresa+3" alt="Logo 3" style={{ maxWidth: '100%' }} />
                            </div>
                            <div className="grid-img-item" style={{ backgroundColor: 'white' }}>
                                <img src="https://placehold.co/150x80/png?text=Empresa+4" alt="Logo 4" style={{ maxWidth: '100%' }} />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>


        </div>
    );
};

export default Home;
