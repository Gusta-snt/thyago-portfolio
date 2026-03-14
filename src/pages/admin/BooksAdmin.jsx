import React, { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, Search, Loader2, X, Save } from 'lucide-react';
import Button from '../../components/Button';
import './BooksAdmin.css';

const BooksAdmin = () => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        subtitle: '',
        year: '',
        description: '',
        category: '',
        link: '',
        cover_url: ''
    });

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('books')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) console.error('Erro ao buscar livros:', error);
        else setBooks(data);
        setLoading(false);
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este livro?')) return;

        const { error } = await supabase
            .from('books')
            .delete()
            .eq('id', id);

        if (error) alert('Erro ao excluir livro: ' + error.message);
        else fetchBooks();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (editingBook) {
                const { error } = await supabase
                    .from('books')
                    .update(formData)
                    .eq('id', editingBook.id);
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from('books')
                    .insert([formData]);
                if (error) throw error;
            }

            setIsModalOpen(false);
            setEditingBook(null);
            setFormData({ title: '', subtitle: '', year: '', description: '', category: '', link: '', cover_url: '' });
            fetchBooks();
        } catch (err) {
            alert('Erro ao salvar livro: ' + err.message);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (book) => {
        setEditingBook(book);
        setFormData({
            title: book.title,
            subtitle: book.subtitle || '',
            year: book.year || '',
            description: book.description || '',
            category: book.category || '',
            link: book.link || '',
            cover_url: book.cover_url || ''
        });
        setIsModalOpen(true);
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        book.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="admin-page">
            <div className="admin-actions-bar">
                <div className="search-wrapper">
                    <Search size={18} className="search-icon" />
                    <input
                        type="text"
                        placeholder="Pesquisar livros..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={() => { setEditingBook(null); setIsModalOpen(true); }} variant="primary">
                    <Plus size={18} style={{ marginRight: '8px' }} /> Adicionar Novo Livro
                </Button>
            </div>

            {loading && !isModalOpen ? (
                <div className="loading-state">
                    <Loader2 className="spinner" size={40} />
                    <p>Carregando livros...</p>
                </div>
            ) : (
                <div className="admin-table-wrapper">
                    <table className="admin-table">
                        <thead>
                            <tr>
                                <th>Capa</th>
                                <th>Título</th>
                                <th>Categoria</th>
                                <th>Ano</th>
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredBooks.map((book) => (
                                <tr key={book.id}>
                                    <td>
                                        <img src={book.cover_url || 'https://placehold.co/40x60'} alt="" className="table-thumb" />
                                    </td>
                                    <td>
                                        <div className="table-title">{book.title}</div>
                                        <div className="table-subtitle">{book.subtitle}</div>
                                    </td>
                                    <td><span className="badge">{book.category}</span></td>
                                    <td>{book.year}</td>
                                    <td>
                                        <div className="table-actions">
                                            <button onClick={() => openEditModal(book)} className="action-btn edit"><Edit2 size={16} /></button>
                                            <button onClick={() => handleDelete(book.id)} className="action-btn delete"><Trash2 size={16} /></button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Modal Tool/Component - kept simple here for brevity */}
            {isModalOpen && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>{editingBook ? 'Editar Livro' : 'Adicionar Novo Livro'}</h2>
                            <button onClick={() => setIsModalOpen(false)} className="close-btn"><X size={24} /></button>
                        </div>
                        <form onSubmit={handleSubmit} className="admin-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Título</label>
                                    <input required value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Categoria</label>
                                    <input value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Subtítulo</label>
                                <input value={formData.subtitle} onChange={e => setFormData({ ...formData, subtitle: e.target.value })} />
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Ano</label>
                                    <input value={formData.year} onChange={e => setFormData({ ...formData, year: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label>Link</label>
                                    <input value={formData.link} onChange={e => setFormData({ ...formData, link: e.target.value })} />
                                </div>
                            </div>
                            <div className="form-group">
                                <label>URL da Capa</label>
                                <input value={formData.cover_url} onChange={e => setFormData({ ...formData, cover_url: e.target.value })} />
                            </div>
                            <div className="form-group">
                                <label>Descrição</label>
                                <textarea rows="4" value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })}></textarea>
                            </div>
                            <div className="modal-footer">
                                <Button type="button" variant="secondary" onClick={() => setIsModalOpen(false)}>Cancelar</Button>
                                <Button type="submit" variant="primary" disabled={loading}>
                                    {loading ? <Loader2 className="spinner" size={18} /> : <Save size={18} style={{ marginRight: '8px' }} />}
                                    Salvar Livro
                                </Button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BooksAdmin;
