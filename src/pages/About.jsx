import React from 'react';
import { Download, FileText, CheckCircle, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/Button';
import './About.css';

const About = () => {
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

    const expertise = [
        "Inteligência Artificial & Data Science",
        "Engenharia Econômica e Financeira",
        "Otimização Matemática",
        "Mercado de Capitais & HFT",
        "Business Intelligence (BI)",
        "Planejamento Tributário"
    ];

    const timeline = [
        { year: "2018 - 2020", role: "Esp. em Engenharia Econômica e Financeira", org: "UFG", desc: "Título: Automating Asset Trading in the Financial Market Using Artificial Intelligence." },
        { year: "2013 - 2015", role: "Esp. em Planejamento Tributário", org: "UFG", desc: "Especialização focada em estratégias tributárias e planejamento fiscal." },
        { year: "2005 - 2007", role: "Esp. em Economia Financeira", org: "UNICAMP", desc: "Título: Uma Gestão Eficiente de uma Carteira de Ações no Mercado Brasileiro." },
        { year: "2002 - 2006", role: "Doutorado em Eng. Elétrica", org: "UNICAMP", desc: "Título: Uma Política Operativa a Usinas Individualizadas para o Sistema Interligado Nacional." },
        { year: "2000 - 2002", role: "Mestrado em Eng. Elétrica e de Computação", org: "UFG", desc: "Pesquisa em alocação de contratos de energia elétrica e sistemas de apoio à decisão." },
        { year: "1996 - 1999", role: "Graduação em Ciência da Computação", org: "IUESO", desc: "Desenvolvimento de Biblioteca Virtual." }
    ];

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
                                    href="http://lattes.cnpq.br/3478059068063711"
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

                {/* Areas of Expertise */}
                <section className="expertise-section section">
                    <motion.h2 className="section-title center" variants={itemVariants}>Áreas de Especialização</motion.h2>
                    <motion.div
                        className="expertise-grid"
                        variants={containerVariants}
                    >
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
                    </motion.div>
                </section>

                {/* Professional Timeline */}
                <section className="timeline-section section">
                    <motion.h2 className="section-title center" variants={itemVariants}>Jornada Profissional</motion.h2>
                    <div className="timeline">
                        {timeline.map((item, index) => (
                            <motion.div
                                key={index}
                                className="timeline-item"
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                            >
                                <div className="timeline-marker"></div>
                                <div className="timeline-content">
                                    <span className="timeline-year"><Calendar size={14} style={{ marginRight: '5px' }} /> {item.year}</span>
                                    <h3 className="timeline-role">{item.role}</h3>
                                    <h4 className="timeline-org">{item.org}</h4>
                                    <p className="timeline-desc">{item.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>
            </div>
        </motion.div>
    );
};

export default About;
