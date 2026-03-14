import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2, ExternalLink, Search, Layers } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/Button';
import './BooksAdmin.css'; // Reusing common admin styles

const ProjectsAdmin = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState({ title: '', role: '', description: '', link: '' });
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        fetchProjects();
    }, []);

    const fetchProjects = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Erro ao buscar projetos:', error);
        else setProjects(data);
        setLoading(false);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (isEditing) {
                const { error } = await supabase
                    .from('projects')
                    .update(currentProject)
                    .eq('id', currentProject.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('projects')
                    .insert([currentProject]);
                if (error) throw error;
            }

            setIsModalOpen(false);
            setCurrentProject({ title: '', role: '', description: '', link: '' });
            fetchProjects();
        } catch (err) {
            alert('Erro ao salvar projeto: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este projeto?')) {
            setLoading(true);
            const { error } = await supabase
                .from('projects')
                .delete()
                .eq('id', id);

            if (error) alert('Erro ao excluir projeto');
            else fetchProjects();
        }
    };

    const openEditModal = (project) => {
        setCurrentProject(project);
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentProject({ title: '', role: '', description: '', link: '' });
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="admin-actions-bar">
                <div className="search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Pesquisar projetos..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={openAddModal} variant="primary">
                    <Plus size={18} style={{ marginRight: '8px' }} /> Adicionar Projeto
                </Button>
            </div>

            {loading && projects.length === 0 ? (
                <div className="loading-state">
                    <Loader2 className="spinner" size={40} />
                    <p>Carregando projetos...</p>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Projeto</th>
                                <th>Papel</th>
                                <th>Descrição</th>
                                <th>Link</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((project) => (
                                <tr key={project.id}>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Layers size={16} className="text-gray-400" />
                                            <span className="table-title">{project.title}</span>
                                        </div>
                                    </td>
                                    <td>{project.role}</td>
                                    <td>
                                        <div className="table-subtitle" style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                            {project.description}
                                        </div>
                                    </td>
                                    <td>
                                        {project.link && (
                                            <a href={project.link} target="_blank" rel="noopener noreferrer" className="badge">
                                                <ExternalLink size={12} style={{ marginRight: '4px' }} /> Abrir
                                            </a>
                                        )}
                                    </td>
                                    <td>
                                        <div className="table-actions">
                                            <button className="action-btn edit" onClick={() => openEditModal(project)} title="Editar">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="action-btn delete" onClick={() => handleDelete(project.id)} title="Excluir">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{isEditing ? 'Editar Projeto' : 'Adicionar Novo Projeto'}</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>
                        <form onSubmit={handleSave} className="admin-form">
                            <div className="form-group">
                                <label>Título do Projeto</label>
                                <input
                                    type="text"
                                    value={currentProject.title}
                                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                    required
                                    placeholder="Ex: Sistema de Gestão Financeira"
                                />
                            </div>
                            <div className="form-group">
                                <label>Papel no Projeto</label>
                                <input
                                    type="text"
                                    value={currentProject.role}
                                    onChange={(e) => setCurrentProject({ ...currentProject, role: e.target.value })}
                                    required
                                    placeholder="Ex: Arquiteto de Software"
                                />
                            </div>
                            <div className="form-group">
                                <label>Link do Projeto</label>
                                <input
                                    type="url"
                                    value={currentProject.link}
                                    onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
                                    placeholder="https://exemplo.com"
                                />
                            </div>
                            <div className="form-group">
                                <label>Descrição</label>
                                <textarea
                                    value={currentProject.description}
                                    onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                    required
                                    rows="4"
                                    placeholder="Descreva os objetivos e resultados do projeto..."
                                ></textarea>
                            </div>
                            <div className="modal-footer">
                                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" variant="primary" disabled={loading}>
                                    {loading ? <Loader2 className="spinner" size={18} /> : <Save size={18} style={{ marginRight: '8px' }} />}
                                    {isEditing ? 'Salvar Alterações' : 'Cadastrar Projeto'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProjectsAdmin;
