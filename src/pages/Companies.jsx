import React, { useState, useEffect } from 'react';
import { ExternalLink, Globe, Users, Target, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';
import './Companies.css';

const Companies = () => {
    const [companies, setCompanies] = useState([]);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [compRes, projRes] = await Promise.all([
                supabase.from('companies').select('*').order('created_at', { ascending: false }),
                supabase.from('projects').select('*').order('created_at', { ascending: false })
            ]);

            if (compRes.error) console.error('Erro ao buscar empresas:', compRes.error);
            else setCompanies(compRes.data);

            if (projRes.error) console.error('Erro ao buscar projetos:', projRes.error);
            else setProjects(projRes.data);

            setLoading(false);
        };

        fetchData();
    }, []);

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

                {loading ? (
                    <div className="loading-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 0' }}>
                        <Loader2 className="spinner" size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                        <p>Carregando empreendimentos...</p>
                    </div>
                ) : (
                    <>
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
                                        <img
                                            src={company.logo_url || 'https://placehold.co/150x150?text=Logo'}
                                            alt={`Logo da ${company.name}`}
                                            className="company-logo"
                                        />
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
                        {projects.length > 0 && (
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
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Companies;
