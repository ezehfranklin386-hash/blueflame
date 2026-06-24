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
  const [configError, setConfigError] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (!supabase) {
      setConfigError(true);
      setChecking(false);
      return;
    }
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
    if (!supabase) return;
    supabase.auth.getSession().then(({ data: { session } }) => setSession(session));
  };

  const handleLogout = async () => {
    if (!supabase) return;
    await supabase.auth.signOut();
    setSession(null);
  };

  if (checking) return null;
  if (configError) {
    return (
      <div className="login-container">
        <div className="login-card" style={{ textAlign: 'center' }}>
          <h1>Configuration Error</h1>
          <p style={{ color: 'var(--gray)', marginBottom: 16 }}>Supabase credentials not configured.</p>
          <p style={{ fontSize: '0.85rem', color: 'var(--gray)' }}>Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your environment variables.</p>
        </div>
      </div>
    );
  }

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
