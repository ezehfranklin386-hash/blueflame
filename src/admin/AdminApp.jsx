import React, { useState, useEffect } from 'react';
import AdminLayout from './components/AdminLayout';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import GasPrice from './pages/GasPrice';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Settings from './pages/Settings';

const AUTH_KEY = 'bf_admin_auth';

function AdminApp() {
  const [authed, setAuthed] = useState(localStorage.getItem(AUTH_KEY) === 'true');
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    setChecking(false);
  }, []);

  const handleLogin = () => {
    localStorage.setItem(AUTH_KEY, 'true');
    setAuthed(true);
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    setAuthed(false);
  };

  if (checking) return null;

  if (!authed) {
    return <Login onLogin={handleLogin} />;
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setRefreshKey(prev => prev + 1);
  };

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard': return <Dashboard key={`dash-${refreshKey}`} />;
      case 'prices': return <GasPrice onPriceUpdate={() => setRefreshKey(prev => prev + 1)} />;
      case 'products': return <Products key={`prod-${refreshKey}`} />;
      case 'sales': return <Sales key={`sales-${refreshKey}`} onSaleChange={() => setRefreshKey(prev => prev + 1)} />;
      case 'settings': return <Settings key={`sett-${refreshKey}`} />;
      default: return <Dashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange} onLogout={handleLogout}>
      {renderTab()}
    </AdminLayout>
  );
}

export default AdminApp;
