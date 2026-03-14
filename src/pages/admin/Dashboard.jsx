import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { BookOpen, Briefcase, Clock, Award } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        books: 0,
        companies: 0,
        projects: 0,
        expertise: 0
    });

    useEffect(() => {
        const fetchStats = async () => {
            const [books, companies, projects, expertise] = await Promise.all([
                supabase.from('books').select('*', { count: 'exact', head: true }),
                supabase.from('companies').select('*', { count: 'exact', head: true }),
                supabase.from('projects').select('*', { count: 'exact', head: true }),
                supabase.from('expertise').select('*', { count: 'exact', head: true }),
            ]);

            setStats({
                books: books.count || 0,
                companies: companies.count || 0,
                projects: projects.count || 0,
                expertise: expertise.count || 0
            });
        };
        fetchStats();
    }, []);

    const cards = [
        { title: 'Livros', count: stats.books, icon: <BookOpen className="text-blue-500" />, color: '#3b82f6' },
        { title: 'Empresas', count: stats.companies, icon: <Briefcase className="text-emerald-500" />, color: '#10b981' },
        { title: 'Projetos', count: stats.projects, icon: <Award className="text-purple-500" />, color: '#a855f7' },
        { title: 'Jornada', count: stats.expertise, icon: <Clock className="text-amber-500" />, color: '#f59e0b' },
    ];

    return (
        <div className="dashboard-grid">
            {cards.map((card) => (
                <div key={card.title} className="stat-card-admin">
                    <div className="stat-icon-wrapper" style={{ backgroundColor: `${card.color}15`, color: card.color }}>
                        {card.icon}
                    </div>
                    <div className="stat-info">
                        <h3>{card.count}</h3>
                        <p>{card.title}</p>
                    </div>
                </div>
            ))}

            <div className="welcome-card">
                <h2>Bem-vindo, Admin!</h2>
                <p>Use a barra lateral para gerenciar os dados do seu portfólio. Todas as alterações feitas aqui serão refletidas instantaneamente no site público.</p>
            </div>
        </div>
    );
};

export default Dashboard;
