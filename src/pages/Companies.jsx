import React from 'react';
import { ExternalLink, Globe, Users, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import './Companies.css';

const Companies = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 }
        }
    };

    const companies = [
        {
            id: 1,
            name: "Empresa 1",
            role: "Cargo / Função",
            purpose: "Breve descrição do propósito da empresa.",
            description: "Descrição detalhada sobre a empresa, suas atividades principais e o impacto gerado no mercado.",
            link: "#",
            logo: "https://placehold.co/150x150/12433e/ffffff?text=Empresa+1",
            type: "Setor de Atuação"
        },
        {
            id: 2,
            name: "Empresa 2",
            role: "Cargo / Função",
            purpose: "Breve descrição do propósito da empresa.",
            description: "Descrição detalhada sobre a empresa, suas atividades principais e o impacto gerado no mercado.",
            link: "#",
            logo: "https://placehold.co/150x150/12433e/ffffff?text=Empresa+2",
            type: "Setor de Atuação"
        },
        {
            id: 3,
            name: "Empresa 3",
            role: "Cargo / Função",
            purpose: "Breve descrição do propósito da empresa.",
            description: "Descrição detalhada sobre a empresa, suas atividades principais e o impacto gerado no mercado.",
            link: "#",
            logo: "https://placehold.co/150x150/12433e/ffffff?text=Empresa+3",
            type: "Setor de Atuação"
        }
    ];

    const projects = [
        {
            id: 1,
            title: "Projeto 1",
            role: "Papel no Projeto",
            description: "Descrição do projeto, objetivos e resultados alcançados.",
            link: "#"
        },
        {
            id: 2,
            title: "Projeto 2",
            role: "Papel no Projeto",
            description: "Descrição do projeto, objetivos e resultados alcançados.",
            link: "#"
        }
    ];
    return (
        <div className="companies-page section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="page-title center">Empresas e Empreendimentos</h1>
                    <p className="section-description center" style={{ maxWidth: '700px', margin: '0 auto 4rem' }}>
                        Minha jornada empreendedora e projetos corporativos focados em criar valor e impulsionar mudanças sistêmicas.
                    </p>
                </motion.div>

                {/* Companies Grid */}
                <motion.div
                    className="companies-grid"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {companies.map((company) => (
                        <motion.div key={company.id} className="company-card" variants={itemVariants}>
                            <div className="company-header">
                                <img src={company.logo} alt={`Logo da ${company.name}`} className="company-logo" />
                                <div className="company-meta">
                                    <h2 className="company-name">{company.name}</h2>
                                    <span className="company-type">{company.type}</span>
                                </div>
                            </div>

                            <div className="company-body">
                                <div className="company-role">
                                    <strong>Papel:</strong> {company.role}
                                </div>
                                <div className="company-purpose">
                                    <Target size={18} className="icon-inline" />
                                    <em>{company.purpose}</em>
                                </div>
                                <p className="company-description">{company.description}</p>
                            </div>

                            <div className="company-footer">
                                <Button href={company.link} target="_blank" variant="secondary" className="visit-btn">
                                    Visitar Site <ExternalLink size={16} style={{ marginLeft: '5px' }} />
                                </Button>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Other Projects Section */}
                <div className="projects-section">
                    <motion.h2
                        className="section-title center"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        Projetos e Iniciativas
                    </motion.h2>
                    <motion.div
                        className="projects-grid"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {projects.map((project) => (
                            <motion.div
                                key={project.id}
                                className="project-card"
                                whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                            >
                                <h3 className="project-title">{project.title}</h3>
                                <span className="project-role">{project.role}</span>
                                <p className="project-desc">{project.description}</p>
                                <a href={project.link} className="project-link">Saiba Mais &rarr;</a>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Companies;
