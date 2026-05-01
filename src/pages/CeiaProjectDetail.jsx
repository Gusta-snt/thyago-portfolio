import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Loader2, ArrowLeft, Video } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './CeiaProjects.css';

const CeiaProjectDetail = () => {
    const { id } = useParams();
    const [project, setProject] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProject = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('ceia_projects')
                .select('*')
                .eq('id', id)
                .single();

            if (!error) {
                setProject(data);
            }
            setLoading(false);
        };

        fetchProject();
    }, [id]);

    if (loading) {
        return (
            <div className="ceia-page section">
                <div className="container ceia-loading">
                    <Loader2 className="spinner" size={48} />
                    <p>Carregando projeto...</p>
                </div>
            </div>
        );
    }

    if (!project) {
        return (
            <div className="ceia-page section">
                <div className="container">
                    <p className="no-results">Projeto CEIA não encontrado.</p>
                    <Link to="/ceia" className="ceia-back-link">
                        <ArrowLeft size={16} /> Voltar para a listagem
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="ceia-page section">
            <motion.div
                className="container ceia-detail"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
            >
                <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1, duration: 0.35 }}>
                    <Link to="/ceia" className="ceia-back-link">
                    <ArrowLeft size={16} /> Voltar para a listagem
                    </Link>
                </motion.div>

                <motion.h1 className="page-title" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.35 }}>
                    {project.title}
                </motion.h1>
                <motion.img
                    src={project.image_url}
                    alt={`Imagem do projeto ${project.title}`}
                    className="ceia-detail-image"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.22, duration: 0.4, ease: 'easeOut' }}
                />
                <motion.div
                    className="ceia-detail-description markdown-body"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28, duration: 0.38 }}
                >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                        {project.description}
                    </ReactMarkdown>
                </motion.div>

                {(() => {
                    const thyagoFallback = {
                        name: 'Thyago Carvalho Marques',
                        headline: 'Professor e Pesquisador | Inteligência Artificial Aplicada | Ciência de Dados e P&D Aplicado',
                        profile_picture: 'https://raw.githubusercontent.com/Gusta-snt/gpsia-landing-page-images/refs/heads/main/participants/participant2.png',
                        lattes: 'http://lattes.cnpq.br/1763926064124591'
                    };

                    const rawResearchers = project.researchers || [];
                    const thyagoIndex = rawResearchers.findIndex(r => r.name && r.name.toLowerCase().includes('thyago'));

                    let thyagoObj = thyagoFallback;
                    let others = [...rawResearchers];

                    if (thyagoIndex !== -1) {
                        thyagoObj = others[thyagoIndex];
                        others.splice(thyagoIndex, 1);
                    }

                    const finalResearchers = [thyagoObj, ...others];

                    return (
                        <motion.div
                            className="researchers-section"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.32, duration: 0.4 }}
                        >
                            <h3>Pesquisadores Envolvidos</h3>
                            <div className="researchers-grid">
                                {finalResearchers.map((researcher, idx) => {
                                    const isThyago = idx === 0;
                                    return (
                                        <div key={idx} className={`researcher-card ${isThyago ? 'featured-researcher' : ''}`}>
                                            {researcher.profile_picture ? (
                                                <img src={researcher.profile_picture} alt={researcher.name} className="researcher-avatar" />
                                            ) : (
                                                <div className="researcher-avatar placeholder">
                                                    {researcher.name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="researcher-info">
                                                <h4>{researcher.name}</h4>
                                                {researcher.headline && <p className="researcher-headline">{researcher.headline}</p>}
                                                {researcher.lattes && (
                                                    <a href={researcher.lattes} target="_blank" rel="noopener noreferrer" className="inline-link lattes-link">
                                                        Currículo Lattes
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </motion.div>
                    );
                })()}

                {project.video_url && (
                    <motion.div
                        className="ceia-video-wrapper"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.35, duration: 0.4 }}
                    >
                        <h2>
                            <Video size={20} /> Video do projeto
                        </h2>
                        {project.video_url.includes('youtube.com') || project.video_url.includes('youtu.be') || project.video_url.includes('vimeo.com') ? (
                            <iframe 
                                className="ceia-video-player"
                                src={project.video_url}
                                title="Video do projeto"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                style={{ aspectRatio: '16/9', height: 'auto' }}
                            ></iframe>
                        ) : (
                            <video controls preload="metadata" className="ceia-video-player">
                                <source src={project.video_url} />
                                Seu navegador nao suporta o player de video.
                            </video>
                        )}
                    </motion.div>
                )}
            </motion.div>
        </div>
    );
};

export default CeiaProjectDetail;
