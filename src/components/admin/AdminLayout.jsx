import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import {
    LayoutDashboard,
    BookOpen,
    Briefcase,
    Clock,
    LogOut,
    Menu,
    X,
    User,
    Layers,
    Clapperboard
} from 'lucide-react';
import './AdminLayout.css';

const AdminLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                navigate('/login');
            } else {
                setUser(user);
            }
        };
        checkUser();
    }, [navigate]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        navigate('/login');
    };

    const navItems = [
        { path: '/admin', icon: <LayoutDashboard size={20} />, label: 'Painel Central' },
        { path: '/admin/books', icon: <BookOpen size={20} />, label: 'Livros' },
        { path: '/admin/companies', icon: <Briefcase size={20} />, label: 'Empresas' },
        { path: '/admin/projects', icon: <Layers size={20} />, label: 'Projetos' },
        { path: '/admin/ceia-projects', icon: <Clapperboard size={20} />, label: 'Projetos CEIA' },
        { path: '/admin/timeline', icon: <Clock size={20} />, label: 'Jornada' },
    ];

    if (!user) return null;

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className={`admin-sidebar ${isSidebarOpen ? 'open' : 'closed'}`}>
                <div className="sidebar-header">
                    <Link to="/" className="sidebar-logo">
                        <span>Admin Portfólio</span>
                    </Link>
                    <button className="toggle-btn" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </button>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                        >
                            {item.icon}
                            {isSidebarOpen && <span>{item.label}</span>}
                        </Link>
                    ))}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-profile">
                        <User size={20} />
                        {isSidebarOpen && <span className="user-email">{user.email}</span>}
                    </div>
                    <button className="logout-btn" onClick={handleLogout}>
                        <LogOut size={20} />
                        {isSidebarOpen && <span>Sair</span>}
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="admin-content">
                <header className="content-header">
                    <h1>{navItems.find(n => n.path === location.pathname)?.label || 'Administração'}</h1>
                </header>
                <div className="content-inner">
                    <Outlet />
                </div>
            </main>
        </div>
    );
};

export default AdminLayout;
