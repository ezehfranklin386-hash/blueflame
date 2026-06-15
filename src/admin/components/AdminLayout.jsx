import React from 'react';

const TABS = [
  { key: 'dashboard', label: 'Dashboard', icon: '\uD83D\uDCCA' },
  { key: 'prices', label: 'Gas Price', icon: '\uD83D\uDCB0' },
  { key: 'products', label: 'Products', icon: '\uD83D\uDCE6' },
  { key: 'sales', label: 'Sales Records', icon: '\uD83D\uDCC8' },
  { key: 'settings', label: 'Settings', icon: '\u2699\uFE0F' },
];

function AdminLayout({ activeTab, onTabChange, onLogout, children }) {
  const now = new Date().toLocaleString();

  const tabLabels = {
    dashboard: 'Dashboard',
    prices: 'Gas Price',
    products: 'Products',
    sales: 'Sales Records',
    settings: 'Settings',
  };

  return (
    <div className="admin-wrapper">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <img src="/logo.png" alt="Logo" />
          <h3>Blue Flame</h3>
        </div>
        <ul className="sidebar-menu">
          {TABS.map(tab => (
            <li key={tab.key}>
              <button
                className={`tab-link ${activeTab === tab.key ? 'active' : ''}`}
                onClick={() => onTabChange(tab.key)}
              >
                {tab.icon} {tab.label}
              </button>
            </li>
          ))}
        </ul>
        <div className="sidebar-logout">
          <button className="logout-btn" onClick={onLogout}>Logout</button>
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
                {tab.icon} {tab.label}
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
