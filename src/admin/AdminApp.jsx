import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import GasPrice from './pages/GasPrice';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Settings from './pages/Settings';

const SESSION_DURATION = 30 * 60 * 1000;

function AdminApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const loggedIn = localStorage.getItem('adminLoggedIn') === 'true';
    const loginTime = parseInt(localStorage.getItem('adminLoginTime') || '0', 10);
    const sessionExpired = (Date.now() - loginTime) > SESSION_DURATION;

    if (loggedIn && !sessionExpired) {
      setIsLoggedIn(true);
    } else {
      localStorage.removeItem('adminLoggedIn');
      localStorage.removeItem('adminLoginTime');
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setActiveTab('dashboard');
  };

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminLoginTime');
    setIsLoggedIn(false);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setRefreshKey(prev => prev + 1);
  };

  const handleSaleChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  const renderTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard key={`dash-${refreshKey}`} />;
      case 'prices':
        return <GasPrice onPriceUpdate={() => setRefreshKey(prev => prev + 1)} />;
      case 'products':
        return <Products key={`prod-${refreshKey}`} />;
      case 'sales':
        return <Sales key={`sales-${refreshKey}`} onSaleChange={handleSaleChange} />;
      case 'settings':
        return <Settings key={`sett-${refreshKey}`} />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AdminLayout activeTab={activeTab} onTabChange={handleTabChange} onLogout={handleLogout}>
      {renderTab()}
    </AdminLayout>
  );
}

export default AdminApp;
