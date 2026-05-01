import React, { useEffect, useState } from 'react';
import { Plus, Edit2, Trash2, Save, X, Loader2, Search } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import Button from '../../components/Button';
import './BooksAdmin.css';

const emptyProject = {
    title: '',
    short_description: '',
    description: '',
    image_url: '',
    video_url: '',
    sort_order: 0,
    status: 'concluido',
    partner_name: '',
    partner_logo_url: '',
    source_url: '',
    researchers: []
};

const emptyResearcher = {
    name: '',
    lattes: '',
    headline: '',
    profile_picture: ''
};

const sanitizeFileName = (name = '') =>
    name
        .toLowerCase()
        .replace(/[^a-z0-9.-]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-|-$/g, '');

const CeiaProjectsAdmin = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(emptyProject);
    const [researchers, setResearchers] = useState([emptyResearcher]);
    const [isEditing, setIsEditing] = useState(false);
    const [uploadingField, setUploadingField] = useState('');

    useEffect(() => {
        fetchProjects();
    }, []);

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

    const handleSave = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const normalizedResearchers = researchers
                .map((researcher) => ({
                    name: (researcher.name || '').trim(),
                    lattes: (researcher.lattes || '').trim() || null,
                    headline: (researcher.headline || '').trim() || null,
                    profile_picture: (researcher.profile_picture || '').trim() || null
                }))
                .filter((researcher) => researcher.name || researcher.lattes);

            const payload = {
                ...currentProject,
                researchers: normalizedResearchers
            };

            if (isEditing) {
                const { error } = await supabase
                    .from('ceia_projects')
                    .update(payload)
                    .eq('id', currentProject.id);
                if (error) throw error;
            } else {
                const { error } = await supabase.from('ceia_projects').insert([payload]);
                if (error) throw error;
            }

            setIsModalOpen(false);
            setCurrentProject(emptyProject);
            setResearchers([emptyResearcher]);
            fetchProjects();
        } catch (err) {
            alert(`Erro ao salvar projeto CEIA: ${err.message}`);
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este projeto CEIA?')) {
            return;
        }

        setLoading(true);
        const { error } = await supabase.from('ceia_projects').delete().eq('id', id);
        if (error) {
            alert('Erro ao excluir projeto CEIA.');
            setLoading(false);
        } else {
            fetchProjects();
        }
    };

    const openEditModal = (project) => {
        setCurrentProject(project);
        if (Array.isArray(project.researchers) && project.researchers.length > 0) {
            setResearchers(
                project.researchers.map((researcher) => ({
                    name: researcher?.name || '',
                    lattes: researcher?.lattes || ''
                }))
            );
        } else {
            setResearchers([emptyResearcher]);
        }
        setIsEditing(true);
        setIsModalOpen(true);
    };

    const openAddModal = () => {
        setCurrentProject(emptyProject);
        setResearchers([emptyResearcher]);
        setIsEditing(false);
        setIsModalOpen(true);
    };

    const updateResearcher = (index, field, value) => {
        setResearchers((prev) => prev.map((researcher, i) => (i === index ? { ...researcher, [field]: value } : researcher)));
    };

    const addResearcher = () => {
        setResearchers((prev) => [...prev, { ...emptyResearcher }]);
    };

    const removeResearcher = (index) => {
        setResearchers((prev) => {
            if (prev.length === 1) return [{ ...emptyResearcher }];
            return prev.filter((_, i) => i !== index);
        });
    };

    const handleFileUpload = async (event, targetField, folder) => {
        const file = event.target.files?.[0];
        if (!file) return;

        setUploadingField(targetField);
        try {
            const safeTitle = sanitizeFileName(currentProject.title || 'projeto-ceia');
            const safeFileName = sanitizeFileName(file.name);
            const extension = safeFileName.split('.').pop();
            const timestamp = Date.now();
            const path = `${folder}/${safeTitle}-${timestamp}.${extension}`;

            const { error: uploadError } = await supabase.storage.from('ceia-media').upload(path, file, {
                cacheControl: '3600',
                upsert: false
            });

            if (uploadError) throw uploadError;

            const { data } = supabase.storage.from('ceia-media').getPublicUrl(path);
            if (!data?.publicUrl) {
                throw new Error('Nao foi possivel obter a URL publica do arquivo.');
            }

            setCurrentProject((prev) => ({
                ...prev,
                [targetField]: data.publicUrl
            }));
        } catch (err) {
            alert(`Erro ao enviar arquivo: ${err.message}`);
        } finally {
            setUploadingField('');
            event.target.value = '';
        }
    };

    const filteredProjects = projects.filter((project) =>
        `${project.title} ${project.short_description || ''}`.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="admin-actions-bar">
                <div className="search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Pesquisar projetos CEIA..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={openAddModal} variant="primary">
                    <Plus size={18} style={{ marginRight: '8px' }} /> Adicionar Projeto CEIA
                </Button>
            </div>

            {loading && projects.length === 0 ? (
                <div className="loading-state">
                    <Loader2 className="spinner" size={40} />
                    <p>Carregando projetos CEIA...</p>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Projeto</th>
                                <th>Resumo</th>
                                <th>Imagem</th>
                                <th>Video</th>
                                <th>Status</th>
                                <th>Acoes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredProjects.map((project) => (
                                <tr key={project.id}>
                                    <td className="table-title">{project.title}</td>
                                    <td>
                                        <div
                                            className="table-subtitle"
                                            style={{ maxWidth: '260px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
                                        >
                                            {project.short_description}
                                        </div>
                                    </td>
                                    <td>{project.image_url ? 'Sim' : 'Nao'}</td>
                                    <td>{project.video_url ? 'Sim' : 'Nao'}</td>
                                    <td>{project.status || '-'}</td>
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
                            <h2>{isEditing ? 'Editar Projeto CEIA' : 'Adicionar Projeto CEIA'}</h2>
                            <button className="close-btn" onClick={() => setIsModalOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="admin-form">
                            <div className="form-group">
                                <label>Titulo</label>
                                <input
                                    type="text"
                                    value={currentProject.title}
                                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>Resumo do card</label>
                                <input
                                    type="text"
                                    value={currentProject.short_description}
                                    onChange={(e) => setCurrentProject({ ...currentProject, short_description: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>Descricao completa</label>
                                <textarea
                                    rows="5"
                                    value={currentProject.description}
                                    onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label>URL da imagem do card</label>
                                <div className="upload-field-row">
                                    <input
                                        type="url"
                                        value={currentProject.image_url}
                                        onChange={(e) => setCurrentProject({ ...currentProject, image_url: e.target.value })}
                                        required
                                    />
                                    <label className="upload-btn">
                                        {uploadingField === 'image_url' ? (
                                            <>
                                                <Loader2 size={14} className="spinner" /> Enviando...
                                            </>
                                        ) : (
                                            'Upload imagem'
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, 'image_url', 'images')}
                                            hidden
                                            disabled={uploadingField === 'image_url'}
                                        />
                                    </label>
                                </div>
                                {currentProject.image_url && (
                                    <div className="media-preview">
                                        <img src={currentProject.image_url} alt="Preview da imagem do card" />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Video (Supabase Storage)</label>
                                <label className="upload-btn" style={{ marginTop: '0.5rem' }}>
                                    {uploadingField === 'video_url' ? (
                                        <>
                                            <Loader2 size={14} className="spinner" /> Enviando...
                                        </>
                                    ) : (
                                        'Upload video'
                                    )}
                                    <input
                                        type="file"
                                        accept="video/*"
                                        onChange={(e) => handleFileUpload(e, 'video_url', 'videos')}
                                        hidden
                                        disabled={uploadingField === 'video_url'}
                                    />
                                </label>
                                {currentProject.video_url && (
                                    <div className="media-preview">
                                        <video controls preload="metadata">
                                            <source src={currentProject.video_url} />
                                            Seu navegador nao suporta video.
                                        </video>
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Status</label>
                                <select
                                    value={currentProject.status || 'concluido'}
                                    onChange={(e) => setCurrentProject({ ...currentProject, status: e.target.value })}
                                    required
                                >
                                    <option value="concluido">Concluido</option>
                                    <option value="em_andamento">Em andamento</option>
                                </select>
                            </div>

                            <div className="form-group">
                                <label>Nome do parceiro</label>
                                <input
                                    type="text"
                                    value={currentProject.partner_name || ''}
                                    onChange={(e) => setCurrentProject({ ...currentProject, partner_name: e.target.value })}
                                />
                            </div>

                            <div className="form-group">
                                <label>URL da logo do parceiro</label>
                                <div className="upload-field-row">
                                    <input
                                        type="url"
                                        value={currentProject.partner_logo_url || ''}
                                        onChange={(e) => setCurrentProject({ ...currentProject, partner_logo_url: e.target.value })}
                                    />
                                    <label className="upload-btn">
                                        {uploadingField === 'partner_logo_url' ? (
                                            <>
                                                <Loader2 size={14} className="spinner" /> Enviando...
                                            </>
                                        ) : (
                                            'Upload logo'
                                        )}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileUpload(e, 'partner_logo_url', 'partners')}
                                            hidden
                                            disabled={uploadingField === 'partner_logo_url'}
                                        />
                                    </label>
                                </div>
                                {currentProject.partner_logo_url && (
                                    <div className="media-preview">
                                        <img src={currentProject.partner_logo_url} alt="Preview da logo do parceiro" />
                                    </div>
                                )}
                            </div>

                            <div className="form-group">
                                <label>Pesquisadores</label>
                                <div className="researchers-list">
                                    {researchers.map((researcher, index) => (
                                        <div key={`${index}-${researcher.name}`} className="researcher-item">
                                            <input
                                                type="text"
                                                placeholder="Nome do pesquisador"
                                                value={researcher.name || ''}
                                                onChange={(e) => updateResearcher(index, 'name', e.target.value)}
                                            />
                                            <input
                                                type="text"
                                                placeholder="Resumo / Headline (opcional)"
                                                value={researcher.headline || ''}
                                                onChange={(e) => updateResearcher(index, 'headline', e.target.value)}
                                            />
                                            <input
                                                type="url"
                                                placeholder="URL da Foto de Perfil (opcional)"
                                                value={researcher.profile_picture || ''}
                                                onChange={(e) => updateResearcher(index, 'profile_picture', e.target.value)}
                                            />
                                            <input
                                                type="url"
                                                placeholder="URL do Lattes (opcional)"
                                                value={researcher.lattes || ''}
                                                onChange={(e) => updateResearcher(index, 'lattes', e.target.value)}
                                            />
                                            <button
                                                type="button"
                                                className="action-btn delete"
                                                onClick={() => removeResearcher(index)}
                                                title="Remover pesquisador"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    ))}
                                    <button type="button" className="add-researcher-btn" onClick={addResearcher}>
                                        <Plus size={16} /> Adicionar pesquisador
                                    </button>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button type="submit" variant="primary" disabled={loading}>
                                    {loading ? <Loader2 className="spinner" size={18} /> : <Save size={18} style={{ marginRight: '8px' }} />}
                                    {isEditing ? 'Salvar alteracoes' : 'Cadastrar projeto'}
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CeiaProjectsAdmin;
