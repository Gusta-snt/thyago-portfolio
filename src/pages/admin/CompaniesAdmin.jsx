import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Search, Loader2, X, Save, ExternalLink } from 'lucide-react';
import Button from '../../components/Button';
import './BooksAdmin.css'; // Reusing table styles

const CompaniesAdmin = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        role: '',
        purpose: '',
        description: '',
        link: '',
        logo_url: '',
        type: ''
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('companies')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Erro ao buscar empresas:', error);
        else setItems(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir esta empresa?')) return;

        const { error } = await supabase
            .from('companies')
            .delete()
            .eq('id', id);

        if (error) alert('Erro ao excluir item: ' + error.message);
        else fetchItems();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingItem) {
                const { error } = await supabase
                    .from('companies')
                    .update(formData)
                    .eq('id', editingItem.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('companies')
                    .insert([formData]);
                if (error) throw error;
            }

            setIsModalOpen(false);
            setEditingItem(null);
            resetForm();
            fetchItems();
        } catch (err) {
            alert('Erro ao salvar item: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', role: '', purpose: '', description: '', link: '', logo_url: '', type: '' });
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            name: item.name,
            role: item.role || '',
            purpose: item.purpose || '',
            description: item.description || '',
            link: item.link || '',
            logo_url: item.logo_url || '',
            type: item.type || ''
        });
        setIsModalOpen(true);
    };

    const filteredItems = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.type?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="admin-actions-bar">
                <div className="search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Pesquisar empresas..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={() => { setEditingItem(null); resetForm(); setIsModalOpen(true); }} variant="primary">
                    <Plus size={18} style={{ marginRight: '8px' }} /> Adicionar Empresa
                </Button>
            </div>

            {loading && !isModalOpen ? (
                <div className="loading-state">
                    <Loader2 className="spinner" size={40} />
                    <p>Carregando itens...</p>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Logo</th>
                                <th>Nome</th>
                                <th>Tipo</th>
                                <th>Cargo</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <img src={item.logo_url || 'https://placehold.co/40x40'} alt="" className="table-thumb" style={{ height: '40px' }} />
                                    </td>
                                    <td>
                                        <div className="table-title">{item.name}</div>
                                    </td>
                                    <td><span className="badge">{item.type}</span></td>
                                    <td>{item.role}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button onClick={() => openEditModal(item)} className="action-btn edit"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(item.id)} className="action-btn delete"><Trash2 size={16} /></button>
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
                            <h2>{editingItem ? 'Editar Empresa' : 'Adicionar Nova Empresa'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="close-btn"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Nome</label>
                                    <input required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Setor / Tipo</label>
                                    <input value={formData.type} onChange={e => setFormData({ ...formData, type: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Cargo / Posição</label>
                                <input value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Propósito (Curto)</label>
                                <input value={formData.purpose} onChange={e => setFormData({ ...formData, purpose: e.target.value })} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Link do Website</label>
                                    <input value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>URL do Logo</label>
                                    <input value={formData.logo_url} onChange={e => setFormData({ ...formData, logo_url: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Descrição Detalhada</label>
                                <textarea rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div className="modal-footer">
                                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                                <Button type="submit" variant="primary" disabled={loading}>
                                    {loading ? <Loader2 className="spinner" size={18} /> : <Save size={18} style={{ marginRight: '8px' }} />}
                                    Salvar Empresa
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default CompaniesAdmin;
