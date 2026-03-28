import React, { useState } from "react";
import StockForm from "./StockForm";
import BillingForm from "./BillingForm";
import Dashboard from "./Dashboard";
import Login from "./Login";
import './App.css';
import { Inventory2, Receipt, Dashboard as DashboardIcon } from '@mui/icons-material';

function App() {
  const [user, setUser] = useState(null);
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const lowStockCount = 3;

  if (!user) return <Login setUser={setUser} />;

  // Menu options based on role
  const menuItems = user.Role === "Admin" 
    ? ["Stock", "Billing", "Dashboard","Logout"] 
    : ["Billing", "Dashboard","Logout"];

  return (
    <div className="app-container">

      {/* Header */}
      <div className="header">
        <h3>Welcome {user.Username} ({user.Role})</h3>
        {/* <button onClick={() => setUser(null)}>Logout</button> */}
      </div>

      {/* Navigation Menu */}
      <div className="menu-bar">
        {menuItems.map(item => (
          <div
            key={item}
            className={`menu-item ${activeMenu === item ? "active" : ""}`}
            onClick={() => setActiveMenu(item)}
          >
            {item === "Stock" && <Inventory2 style={{ verticalAlign: 'middle', marginRight: 5 }} />}
            {item === "Billing" && <Receipt style={{ verticalAlign: 'middle', marginRight: 5 }} />}
            {item === "Dashboard" && <DashboardIcon style={{ verticalAlign: 'middle', marginRight: 5 }} />}
            {item === "Logout"}
            {item}
            {item === "Stock" && lowStockCount > 0} 
          </div>
        ))}
      </div>

      {/* Display Active Section */}
      {activeMenu === "Stock" && user.Role === "Admin" && (
        <div className="card stock">
          <h4>
            <Inventory2 style={{ marginRight: 8 }} />
            Stock Management - 
            {lowStockCount > 0 && <span className="badge">{lowStockCount}</span>}
          </h4>
          <StockForm />
        </div>
      )}

      {activeMenu === "Billing" && (
        <div className="card billing">
          <h4>
            <Receipt style={{ marginRight: 8 }} />
            Billing
          </h4>
          <BillingForm />
        </div>
      )}
      {activeMenu === "Logout" && (
        <div className="card logout">          
          <button style={{ backgroundColor: '#f44336', color: 'white', border: 'none', position: 'relative'}} onClick={() => setUser(null)}>Logout</button>
        </div>
      )}
      {activeMenu === "Dashboard" && (
        <div className="card dashboard">
          <h4>
            <DashboardIcon style={{ marginRight: 8 }} />
            Dashboard
          </h4>
          <Dashboard />
        </div>
      )}
     

    </div>
  );
}

export default App;