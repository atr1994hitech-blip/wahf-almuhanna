import React, { useState, useEffect } from 'react';
import { Search, Plus, LogOut, Settings, FileText, Edit2, Trash2, Eye } from 'lucide-react';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import AdminPage from './pages/AdminPage';
import FilePreview from './components/FilePreview';
import FloatingAddButton from './components/FloatingAddButton';

function App() {
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [selectedFile, setSelectedFile] = useState(null);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    const savedCategories = localStorage.getItem('categories');
    const savedFiles = localStorage.getItem('files');

    if (savedUser) {
      const userData = JSON.parse(savedUser);
      setUser(userData);
      setIsAdmin(userData.isAdmin);
    }

    if (savedCategories) setCategories(JSON.parse(savedCategories));
    if (savedFiles) setFiles(JSON.parse(savedFiles));
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setIsAdmin(userData.isAdmin);
    localStorage.setItem('currentUser', JSON.stringify(userData));
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem('currentUser');
    setSearchQuery('');
    setSearchResults([]);
    setCurrentPage('login');
  };

  const handleAddCategory = (categoryName) => {
    const newCategory = {
      id: Date.now(),
      name: categoryName,
      icon: generateIcon(categoryName),
      createdAt: new Date().toLocaleDateString('ar-SA')
    };

    const updatedCategories = [...categories, newCategory];
    setCategories(updatedCategories);
    localStorage.setItem('categories', JSON.stringify(updatedCategories));
  };

  const handleAddFile = (fileData) => {
    const newFile = {
      id: Date.now(),
      name: fileData.name,
      categoryId: fileData.categoryId,
      categoryName: fileData.categoryName,
      uploadDate: new Date().toLocaleDateString('ar-SA'),
      type: fileData.type,
      description: fileData.description,
      attachments: fileData.attachments || [],
      uploadedBy: user.name,
      url: fileData.url || null
    };

    const updatedFiles = [...files, newFile];
    setFiles(updatedFiles);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
  };

  const handleDeleteFile = (fileId) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
  };

  const handleEditFile = (fileId, updatedData) => {
    const updatedFiles = files.map(f =>
      f.id === fileId ? { ...f, ...updatedData } : f
    );
    setFiles(updatedFiles);
    localStorage.setItem('files', JSON.stringify(updatedFiles));
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    const results = files.filter(file =>
      file.name.toLowerCase().includes(query.toLowerCase()) ||
      file.categoryName.toLowerCase().includes(query.toLowerCase()) ||
      file.description.toLowerCase().includes(query.toLowerCase())
    );

    setSearchResults(results);
  };

  const generateIcon = (categoryName) => {
    const icons = ['📁', '📄', '🗂️', '📑', '📋', '📊', '💼', '🏢'];
    const hash = categoryName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return icons[hash % icons.length];
  };

  if (!user) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-teal-200 shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <span className="text-3xl font-bold" style={{ color: '#D4AF37', fontFamily: 'Cairo' }}>المهنا</span>
            <span className="text-xl text-teal-700 font-semibold">وقف</span>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <input
                type="text"
                placeholder="ابحث عن ملف أو قسم..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg border border-teal-300 focus:outline-none focus:ring-2 focus:ring-teal-500 bg-white text-right"
              />
              <Search className="absolute left-3 top-2.5 text-teal-500" size={20} />
            </div>

            {/* Search Results Dropdown */}
            {searchResults.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-teal-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
                {searchResults.map(file => (
                  <div
                    key={file.id}
                    onClick={() => {
                      setSelectedFile(file);
                      setShowPreview(true);
                      setSearchQuery('');
                      setSearchResults([]);
                    }}
                    className="p-4 border-b border-teal-100 hover:bg-teal-50 cursor-pointer transition"
                  >
                    <p className="font-semibold text-teal-900">{file.name}</p>
                    <p className="text-sm text-gray-600">القسم: {file.categoryName}</p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-teal-700">{user.name}</span>
            {isAdmin && (
              <button
                onClick={() => setCurrentPage('admin')}
                className="p-2 hover:bg-teal-100 rounded-lg transition text-teal-700"
                title="الإعدادات"
              >
                <Settings size={20} />
              </button>
            )}
            <button
              onClick={handleLogout}
              className="p-2 hover:bg-red-100 rounded-lg transition text-red-600"
              title="تسجيل الخروج"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {currentPage === 'dashboard' && (
          <DashboardPage
            categories={categories}
            files={files}
            onAddCategory={handleAddCategory}
            onAddFile={handleAddFile}
            onDeleteFile={handleDeleteFile}
            onEditFile={handleEditFile}
            onSelectFile={(file) => {
              setSelectedFile(file);
              setShowPreview(true);
            }}
          />
        )}

        {currentPage === 'admin' && isAdmin && (
          <AdminPage onBack={() => setCurrentPage('dashboard')} />
        )}
      </main>

      {/* Floating Add Button */}
      {currentPage === 'dashboard' && (
        <FloatingAddButton
          categories={categories}
          onAddFile={handleAddFile}
        />
      )}

      {/* File Preview Modal */}
      {showPreview && selectedFile && (
        <FilePreview
          file={selectedFile}
          onClose={() => setShowPreview(false)}
          onEdit={handleEditFile}
          onDelete={handleDeleteFile}
        />
      )}
    </div>
  );
}

export default App;