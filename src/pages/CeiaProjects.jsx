import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Loader2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import './CeiaProjects.css';

const gridVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08
        }
    }
};

const cardVariants = {
    hidden: { opacity: 0, y: 18 },
    show: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.38,
            ease: 'easeOut'
        }
    }
};

const CeiaProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('concluido');

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('ceia_projects')
                .select('*')
                .order('title', { ascending: true });

            if (!error) {
                setProjects(data);
            }
            setLoading(false);
        };

        fetchProjects();
    }, []);

    const filteredProjects = projects.filter(project => {
        // Fallback to 'concluido' if status is missing
        const status = project.status || 'concluido';
        return status === filterStatus;
    });

    return (
        <div className="ceia-page section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="page-title center">Projetos CEIA</h1>
                    <p className="section-description center ceia-intro">
                        Explore os projetos desenvolvidos no CEIA. Cada card apresenta uma visão geral e permite acessar
                        uma página com descrição detalhada e vídeo, quando disponível.
                    </p>
                </motion.div>

                {!loading && (
                    <motion.div 
                        className="filter-container"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                    >
                        <button 
                            className={`filter-btn ${filterStatus === 'concluido' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('concluido')}
                        >
                            Concluídos
                        </button>
                        <button 
                            className={`filter-btn ${filterStatus === 'em_andamento' ? 'active' : ''}`}
                            onClick={() => setFilterStatus('em_andamento')}
                        >
                            Em andamento
                        </button>
                    </motion.div>
                )}

                {loading ? (
                    <div className="loading-state ceia-loading">
                        <Loader2 className="spinner" size={48} />
                        <p>Carregando projetos CEIA...</p>
                    </div>
                ) : (
                    <motion.div
                        key={filterStatus}
                        className="ceia-grid"
                        variants={gridVariants}
                        initial="hidden"
                        animate="show"
                    >
                        {filteredProjects.map((project) => (
                            <motion.article
                                key={project.id}
                                className="ceia-card"
                                variants={cardVariants}
                                whileHover={{ y: -6, scale: 1.01 }}
                                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
                            >
                                <img
                                    src={project.image_url}
                                    alt={`Imagem do projeto ${project.title}`}
                                    className="ceia-card-image"
                                />
                                <div className="ceia-card-content">
                                    <div className="ceia-card-header">
                                        <h2>{project.title}</h2>
                                        <span className={`status-badge ${project.status || 'concluido'}`}>
                                            {project.status === 'em_andamento' ? 'Em andamento' : 'Concluído'}
                                        </span>
                                    </div>
                                    <p>{project.short_description || 'Sem resumo cadastrado.'}</p>
                                    <Link to={`/ceia/${project.id}`} className="ceia-card-link">
                                        Ver detalhes <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.article>
                        ))}
                    </motion.div>
                )}

                {!loading && filteredProjects.length === 0 && (
                    <p className="no-results">Nenhum projeto encontrado para este filtro.</p>
                )}
            </div>
        </div>
    );
};

export default CeiaProjects;
