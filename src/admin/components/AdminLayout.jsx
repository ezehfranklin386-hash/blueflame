import React, { useState } from 'react';
import { BarChart3, DollarSign, Package, TrendingUp, Settings, Menu, X } from 'lucide-react';

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { key: 'prices', label: 'Gas Price', icon: DollarSign },
  { key: 'products', label: 'Products', icon: Package },
  { key: 'sales', label: 'Sales Records', icon: TrendingUp },
  { key: 'settings', label: 'Settings', icon: Settings },
];

function AdminLayout({ activeTab, onTabChange, onLogout, children }) {
  const now = new Date().toLocaleString();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleTabClick = (key) => {
    onTabChange(key);
    setSidebarOpen(false);
  };

  const tabLabels = {
    dashboard: 'Dashboard',
    prices: 'Gas Price',
    products: 'Products',
    sales: 'Sales Records',
    settings: 'Settings',
  };

  return (
    <div className="admin-wrapper">
      <button className="hamburger-btn" onClick={() => setSidebarOpen(true)} aria-label="Open menu">
        <Menu size={24} />
      </button>

      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />}

      <aside className={`sidebar ${sidebarOpen ? 'sidebar--open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-header-top">
            <div className="sidebar-logo">
              <img src="/logo.png" alt="Logo" />
              <h3>Blue Flame</h3>
            </div>
            <button className="sidebar-close-btn" onClick={() => setSidebarOpen(false)} aria-label="Close menu">
              <X size={22} />
            </button>
          </div>
          <div className="sidebar-user">
            <div className="sidebar-avatar">A</div>
            <div className="sidebar-user-info">
              <p>Admin</p>
              <span>Super Admin</span>
            </div>
          </div>
        </div>
        <ul className="sidebar-menu">
          {TABS.map(tab => (
            <li key={tab.key}>
              <button
                className={`tab-link ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => handleTabClick(tab.key)}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="sidebar-footer">
          <button className="logout-btn" onClick={onLogout}>Logout</button>
          <div className="sidebar-version">v1.0.0</div>
        </div>
      </aside>

      <main className="main-content">
        <div className="header">
          <h2>{tabLabels[activeTab] || 'Dashboard'}</h2>
          <div className="header-info">
            <p>Welcome, Admin!</p>
            <p>{now}</p>
          </div>
        </div>

        <div className="tab-container">
          <div className="tab-buttons">
            {TABS.map(tab => (
              <button
                key={tab.key}
                className={`tab-btn ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => onTabChange(tab.key)}
              >
                <tab.icon size={18} /> {tab.label}
              </button>
            ))}
          </div>
          <div className="tab-content">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminLayout;
