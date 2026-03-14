import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import Companies from './pages/Companies';
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import BooksAdmin from './pages/admin/BooksAdmin';
import CompaniesAdmin from './pages/admin/CompaniesAdmin';
import TimelineAdmin from './pages/admin/TimelineAdmin';
import ProjectsAdmin from './pages/admin/ProjectsAdmin';
import AdminLayout from './components/admin/AdminLayout';
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
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/books" element={<Layout><Books /></Layout>} />
        <Route path="/companies" element={<Layout><Companies /></Layout>} />

        {/* Admin Login */}
        <Route path="/login" element={<Login />} />

        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="books" element={<BooksAdmin />} />
          <Route path="companies" element={<CompaniesAdmin />} />
          <Route path="projects" element={<ProjectsAdmin />} />
          <Route path="timeline" element={<TimelineAdmin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
