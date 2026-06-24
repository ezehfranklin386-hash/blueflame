import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import Login from './pages/Login';
import AdminLayout from './components/AdminLayout';
import Dashboard from './pages/Dashboard';
import GasPrice from './pages/GasPrice';
import Products from './pages/Products';
import Sales from './pages/Sales';
import Settings from './pages/Settings';

function AdminApp() {
  const [session, setSession] = useState(null);
  const [checking, setChecking] = useState(true);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setChecking(false);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogin = () => {
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setRefreshKey(prev => prev + 1);
  };

  const handleSaleChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (checking) return null;

  if (!session) {
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
