// Dashboard.js
import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/bills")
      .then(res => setBills(res.data));
  }, []);

  return (
    <div>
      <h2>Sales Dashboard</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Product</th>
            <th>Qty</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((b, i) => (
            <tr key={i}>
              <td>{b.ProductName}</td>
              <td>{b.Quantity}</td>
              <td>₹{b.Total}</td>
              <td>{new Date(b.Date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Dashboard;