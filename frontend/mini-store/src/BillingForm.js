// BillingForm.js (Improved)
import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem } from "@mui/material";
import jsPDF from "jspdf"; 

function BillingForm() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState("");
  const [quantity, setQuantity] = useState(0);
  const [productId, setProductId] = useState("");
  const [price, setPrice] = useState(0);   // ✅ price state
  const [total, setTotal] = useState(0);
  const [billno, setBillno] = useState(0);

  useEffect(() => {
    axios.get("http://localhost:5000/products")
      .then(res => setProducts(res.data));
  }, []);

  const generateBill = async () => {
    const res = await axios.post("http://localhost:5000/bill", {
      name,
      quantity
    });

    if (res.data.total) {
      //setTotal(res.data.total);
      setBillno(res.data.Id);
      setTotal(res.data.total);
      console.log("Price set to:", res.data.Id);
      console.log("Price set to:", res.data.total);
    } else {
      alert(res.data);
    }
  };

  // ✅ PDF FUNCTION HERE
  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.text("Mini Mart Store", 20, 20);
    doc.text(`Cash Bill no: ${billno}`, 20, 30);
    doc.text(`Product: ${name}`, 20, 40);
    doc.text(`Quantity: ${quantity}`, 20, 50);
    doc.text(`Price: ₹${price}`, 20, 60);
    doc.text(`Total: ₹${total}`, 20, 70);

    doc.save("bill.pdf");

    setPrice(0); // Reset price after generating PDF
    setQuantity(0); // Reset quantity after generating PDF
    setTotal(0); // Reset total after generating PDF
  };

  // ✅ When product changes
  const handleProductChange = async (e) => {
    const id = e.target.value;
    setProductId(id);

    const product = await products.find(p => p.Id === id);

    console.log("Selected Product:", product); // ✅ Debugging log

    if (product) {
      setName(product.Name);
      setPrice(product.Price);   // ✅ set price here
      console.log("Price set to:", product.Name); // ✅ Debugging log
    }
  };

  return (
    <div>
      <h2>Billing</h2>

      <TextField
        select
        label="Select Product"
        fullWidth
        value={productId}
        onChange={handleProductChange}
      >
        {products.map(p => (
          <MenuItem key={p.Id} value={p.Id}>
            {p.Name}
          </MenuItem>
        ))}
      </TextField>

      <br /><br />
      <label>Price: ₹{price}</label>
      <br /><br />

      <TextField
        label="Quantity"
        type="number"
        fullWidth
        onChange={(e) => setQuantity(e.target.value)}
      />

      <br /><br />

      <Button variant="contained" onClick={generateBill}>
        Generate Bill
      </Button>

      <h3>Total: ₹{total}</h3>

      {/* ✅ USE BUTTON HERE */}
      {total && (
        <button onClick={downloadPDF}>
          Download PDF
        </button>
      )}    
    </div>
  );
}

export default BillingForm;