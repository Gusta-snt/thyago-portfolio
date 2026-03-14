import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import BookCard from '../components/BookCard';
import './Books.css';

const Books = () => {
    const allBooks = [
        {
            id: 1,
            title: "Título do Livro 1",
            subtitle: "Subtítulo do Livro",
            year: "2024",
            description: "Descrição breve do livro, abordando os principais tópicos e contribuições para a área.",
            category: "Negócios",
            link: "#",
            cover: "https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro"
        },
        {
            id: 2,
            title: "Título do Livro 2",
            subtitle: "Subtítulo do Livro",
            year: "2023",
            description: "Descrição breve do livro, abordando os principais tópicos e contribuições para a área.",
            category: "Liderança",
            link: "#",
            cover: "https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro"
        },
        {
            id: 3,
            title: "Título do Livro 3",
            subtitle: "Subtítulo do Livro",
            year: "2022",
            description: "Descrição breve do livro, abordando os principais tópicos e contribuições para a área.",
            category: "Educação",
            link: "#",
            cover: "https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro"
        },
        {
            id: 4,
            title: "Título do Livro 4",
            subtitle: "Subtítulo do Livro",
            year: "2021",
            description: "Descrição breve do livro, abordando os principais tópicos e contribuições para a área.",
            category: "Negócios",
            link: "#",
            cover: "https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro"
        },
        {
            id: 5,
            title: "Título do Livro 5",
            subtitle: "Subtítulo do Livro",
            year: "2020",
            description: "Descrição breve do livro, abordando os principais tópicos e contribuições para a área.",
            category: "Liderança",
            link: "#",
            cover: "https://placehold.co/400x600/e2e8f0/1e293b?text=Capa+do+Livro"
        }
    ];

    const categories = ["Todos", "Negócios", "Liderança", "Educação"];
    const [activeCategory, setActiveCategory] = useState("Todos");

    const filteredBooks = activeCategory === "Todos"
        ? allBooks
        : allBooks.filter(book => book.category === activeCategory);

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
                    <AnimatePresence>
                        {filteredBooks.map((book) => (
                            <motion.div
                                key={book.id}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <BookCard {...book} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {filteredBooks.length === 0 && (
                    <p className="no-results">Nenhum livro encontrado nesta categoria.</p>
                )}
            </div>
        </div>
    );
};

export default Books;
