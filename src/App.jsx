import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import Companies from './pages/Companies';
import './App.css';

const Layout = ({ children }) => {
  return (
    <div className="app-layout">
      <Header />
      <main>
        {children}
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
          <Route path="/companies" element={<Companies />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
