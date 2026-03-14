import React, { useState, useEffect } from 'react';
import { Download, FileText, CheckCircle, Calendar, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { supabase } from '../lib/supabase';
import Button from '../components/Button';
import './About.css';

const About = () => {
    const [expertise, setExpertise] = useState([]);
    const [timeline, setTimeline] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const [expRes, timeRes] = await Promise.all([
                supabase.from('expertise').select('name'),
                supabase.from('timeline').select('*').order('year_range', { ascending: false })
            ]);

            if (expRes.error) console.error('Erro ao buscar expertise:', expRes.error);
            else setExpertise(expRes.data.map(e => e.name));

            if (timeRes.error) console.error('Erro ao buscar jornada:', timeRes.error);
            else setTimeline(timeRes.data);

            setLoading(false);
        };

        fetchData();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className="about-page"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="container">
                {/* Bio Section */}
                <section className="bio-section section">
                    <div className="bio-grid">
                        <motion.div
                            className="bio-image-container"
                            initial={{ opacity: 0, scale: 0.9, x: -50 }}
                            animate={{ opacity: 1, scale: 1, x: 0 }}
                            transition={{ duration: 0.7 }}
                        >
                            <img
                                src="http://servicosweb.cnpq.br/wspessoa/servletrecuperafoto?tipo=1&id=K4772258J6"
                                alt="Retrato do Professor Thyago Carvalho"
                                className="bio-image"
                            />
                            <div className="bio-shape"></div>
                        </motion.div>
                        <motion.div className="bio-content" variants={itemVariants}>
                            <motion.h1 className="page-title" variants={itemVariants}>Sobre Mim</motion.h1>
                            <motion.h2 className="bio-subtitle" variants={itemVariants}>Academia, Engenharia e Mercado Financeiro</motion.h2>
                            <motion.p className="bio-text" variants={itemVariants}>
                                Sou Professor Associado IV na Escola de Engenharia Elétrica, Mecânica e de Computação (EMC) da Universidade Federal de Goiás (UFG) e Pesquisador EMBRAPII. Minha trajetória combina sólida formação acadêmica com vasta experiência prática em engenharia econômica, financeira e desenvolvimento de softwares inteligentes.
                            </motion.p>
                            <motion.p className="bio-text" variants={itemVariants}>
                                Graduado em Ciência da Computação, Mestre e Doutor em Engenharia Elétrica e de Computação (Unicamp), possuo também especializações em Economia Financeira e Planejamento Tributário. Essa multidisciplinaridade me permite atuar na fronteira entre tecnologia e negócios, desenvolvendo soluções de *Business Intelligence*, *Data Science* e Inteligência Artificial para otimização de processos e viabilidade econômica.
                            </motion.p>
                            <motion.p className="bio-text" variants={itemVariants}>
                                Tenho forte atuação no Mercado de Capitais, com experiência no desenvolvimento de robôs de investimento (HFT - High Frequency Trading). Além disso, coordeno o curso de Especialização em Engenharia Econômica e Financeira nos Negócios e atuo como Coordenador de Desenvolvimento de Projetos no CEIA (Centro de Excelência em Inteligência Artificial), um dos principais hubs de IA do Brasil.
                            </motion.p>

                            <motion.div className="bio-actions" variants={itemVariants}>
                                <Button
                                    href="https://lattes.cnpq.br/1763926064124591"
                                    target="_blank"
                                    variant="secondary"
                                >
                                    <FileText size={18} style={{ marginRight: '8px' }} />
                                    Ver Currículo Lattes Completo
                                </Button>
                            </motion.div>
                        </motion.div>
                    </div>
                </section>

                {loading ? (
                    <div className="loading-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 0' }}>
                        <Loader2 className="spinner" size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                        <p>Carregando informações...</p>
                    </div>
                ) : (
                    <>
                        {/* Areas of Expertise */}
                        {expertise.length > 0 && (
                            <motion.section
                                className="expertise-section section"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={containerVariants}
                            >
                                <motion.h2 className="section-title center" variants={itemVariants}>Áreas de Especialização</motion.h2>
                                <div className="expertise-grid">
                                    {expertise.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className="expertise-item"
                                            variants={itemVariants}
                                            whileHover={{ scale: 1.05, backgroundColor: "#f0fdfa" }}
                                        >
                                            <CheckCircle size={20} className="expertise-icon" />
                                            <span>{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}

                        {/* Professional Timeline */}
                        {timeline.length > 0 && (
                            <motion.section
                                className="timeline-section section"
                                initial="hidden"
                                whileInView="visible"
                                viewport={{ once: true, margin: "-100px" }}
                                variants={containerVariants}
                            >
                                <motion.h2 className="section-title center" variants={itemVariants}>Jornada Profissional</motion.h2>
                                <div className="timeline">
                                    {timeline.map((item, index) => (
                                        <motion.div
                                            key={index}
                                            className="timeline-item"
                                            variants={itemVariants}
                                        >
                                            <div className="timeline-marker"></div>
                                            <div className="timeline-content">
                                                <span className="timeline-year"><Calendar size={14} style={{ marginRight: '5px' }} /> {item.year_range}</span>
                                                <h3 className="timeline-role">{item.role}</h3>
                                                <h4 className="timeline-org">{item.organization}</h4>
                                                <p className="timeline-desc">{item.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.section>
                        )}
                    </>
                )}
            </div>
        </motion.div>
    );
};

export default About;
