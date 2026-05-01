import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import BookCard from '../components/BookCard';
import './Books.css';

const Books = () => {
    const [books, setBooks] = useState([]);
    const [categories, setCategories] = useState(["Todos"]);
    const [activeCategory, setActiveCategory] = useState("Todos");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchBooks();
    }, []);

    const fetchBooks = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('books')
                .select('*')
                .order('year', { ascending: false });

            if (!error) {
                setBooks(data);
                const uniqueCategories = ["Todos", ...new Set(data.map(book => book.category).filter(Boolean))];
                setCategories(uniqueCategories);
            }
        } catch (error) {
            console.error("Error fetching books:", error);
        } finally {
            setLoading(false);
        }
    };

    const filteredBooks = activeCategory === "Todos"
        ? books
        : books.filter(book => book.category === activeCategory);

    return (
        <div className="books-page section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center"
                >
                    <h1 className="page-title center">Livros Publicados</h1>
                    <p className="section-description center" style={{ maxWidth: '600px', margin: '0 auto 3rem' }}>
                        Explore minha coleção de obras sobre inovação, liderança e educação. Cada livro é elaborado para fornecer insights acionáveis para profissionais e estudantes.
                    </p>
                </motion.div>

                {loading ? (
                    <div className="loading-state" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '4rem 0' }}>
                        <Loader2 className="spinner" size={48} style={{ color: 'var(--primary)', marginBottom: '1rem' }} />
                        <p>Carregando acervo...</p>
                    </div>
                ) : (
                    <>
                        {/* Category Filter */}
                        <div className="filter-container">
                            {categories.map(category => (
                                <button
                                    key={category}
                                    className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
                                    onClick={() => setActiveCategory(category)}
                                >
                                    {category}
                                    {activeCategory === category && (
                                        <motion.div
                                            className="active-indicator"
                                            layoutId="activeIndicator"
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Books Grid */}
                        <motion.div
                            className="books-grid"
                            layout
                        >
                            <AnimatePresence mode='popLayout'>
                                {filteredBooks.map((book) => (
                                    <motion.div
                                        key={book.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <BookCard
                                            {...book}
                                            cover={book.cover_url} // Map cover_url to cover as expected by BookCard
                                        />
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>

                        {filteredBooks.length === 0 && (
                            <p className="no-results">Nenhum livro encontrado nesta categoria.</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Books;
