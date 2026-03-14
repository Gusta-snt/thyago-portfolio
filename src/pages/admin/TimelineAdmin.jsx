import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Search, Loader2, X, Save, Calendar } from 'lucide-react';
import Button from '../../components/Button';
import './BooksAdmin.css'; // Reusing table styles

const TimelineAdmin = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        year_range: '',
        role: '',
        organization: '',
        description: ''
    });

    useEffect(() => {
        fetchItems();
    }, []);

    const fetchItems = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('timeline')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Erro ao buscar jornada:', error);
        else setItems(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este registro?')) return;

        const { error } = await supabase
            .from('timeline')
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
                    .from('timeline')
                    .update(formData)
                    .eq('id', editingItem.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('timeline')
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
        setFormData({ year_range: '', role: '', organization: '', description: '' });
    };

    const openEditModal = (item) => {
        setEditingItem(item);
        setFormData({
            year_range: item.year_range,
            role: item.role,
            organization: item.organization || '',
            description: item.description || ''
        });
        setIsModalOpen(true);
    };

    const filteredItems = items.filter(item =>
        item.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.organization?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="admin-actions-bar">
                <div className="search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Pesquisar jornada..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={() => { setEditingItem(null); resetForm(); setIsModalOpen(true); }} variant="primary">
                    <Plus size={18} style={{ marginRight: '8px' }} /> Adicionar Registro
                </Button>
            </div>

            {loading && !isModalOpen ? (
                <div className="loading-state">
                    <Loader2 className="spinner" size={40} />
                    <p>Carregando jornada...</p>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Período</th>
                                <th>Cargo / Título</th>
                                <th>Organização</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((item) => (
                                <tr key={item.id}>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Calendar size={14} className="text-gray-400" />
                                            <span className="font-semibold">{item.year_range}</span>
                                        </div>
                                    </td>
                                    <td>
                                        <div className="table-title">{item.role}</div>
                                    </td>
                                    <td>{item.organization}</td>
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
                            <h2>{editingItem ? 'Editar Registro' : 'Adicionar Novo Registro'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="close-btn"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-group">
                                <label>Período (ex: 2018 - 2020)</label>
                                <input required value={formData.year_range} onChange={e => setFormData({ ...formData, year_range: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Cargo / Posição / Título</label>
                                <input required value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Organização / Universidade</label>
                                <input value={formData.organization} onChange={e => setFormData({ ...formData, organization: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Descrição</label>
                                <textarea rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div className="modal-footer">
                                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                                <Button type="submit" variant="primary" disabled={loading}>
                                    {loading ? <Loader2 className="spinner" size={18} /> : <Save size={18} style={{ marginRight: '8px' }} />}
                                    Salvar Registro
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TimelineAdmin;
