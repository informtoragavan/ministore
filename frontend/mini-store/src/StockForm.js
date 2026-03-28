// StockForm.js
import React, { useState } from "react";
import axios from "axios";

function StockForm() {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");

  const addProduct = async () => {
    await axios.post("http://localhost:5000/addProduct", {
      name,
      price,
      quantity
    });
    alert("Product Added");
  };

  const updateProduct = async () => {
    await axios.put("http://localhost:5000/updateProduct", {
      name,
      price,
      quantity
    });
    alert("Product Updated");
  };

  return (
    <div>
      <h2>Stock Management</h2>
      <input placeholder="Name" onChange={e => setName(e.target.value)} />
      <input placeholder="Price" onChange={e => setPrice(e.target.value)} />
      <input placeholder="Quantity" onChange={e => setQuantity(e.target.value)} />

      <br /><br />
      <button onClick={addProduct}>Add</button>
      <button onClick={updateProduct}>Update</button>
    </div>
  );
}

export default StockForm;