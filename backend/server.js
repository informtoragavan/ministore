// server.js
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { sql, config } = require("./db");

const app = express();
app.use(cors());
app.use(bodyParser.json());

sql.connect(config);

// ➕ Add Product
app.post("/addProduct", async (req, res) => {
    const { name, price, quantity } = req.body;

    await sql.query`
        INSERT INTO Products (Name, Price, Quantity)
        VALUES (${name}, ${price}, ${quantity})
    `;

    res.send("Product Added");
});

// 🔄 Update Product
app.put("/updateProduct", async (req, res) => {
    const { name, price, quantity } = req.body;

    await sql.query`
        UPDATE Products
        SET Price=${price}, Quantity=${quantity}
        WHERE Name=${name}
    `;

    res.send("Product Updated");
});


// Login API
app.post("/login", async (req, res) => {
    const { username, password } = req.body;

    const result = await sql.query`
        SELECT * FROM Users 
        WHERE Username=${username} AND Password=${password}
    `;

    if (result.recordset.length > 0) {
        res.json(result.recordset[0]);
    } else {
        res.status(401).send("Invalid credentials");
    }
});


// Get all products
app.get("/products", async (req, res) => {
    const result = await sql.query`SELECT * FROM Products`;
    res.json(result.recordset);
});

app.get("/bills", async (req, res) => {
    const result = await sql.query`SELECT * FROM Bills ORDER BY Date DESC`;
    res.json(result.recordset);
});

// 🧾 Billing
app.post("/bill", async (req, res) => {
    const { name, quantity } = req.body;

    const result = await sql.query`
        SELECT Price, Quantity FROM Products WHERE Name=${name}
    `;

    if (result.recordset.length === 0) {
        return res.send("Product not found");
    }

    const product = result.recordset[0];

    if (product.Quantity < quantity) {
        return res.send("Insufficient stock");
    }

    const total = product.Price * quantity;
    const Id = product.Id; 

    await sql.query`
        UPDATE Products
        SET Quantity = Quantity - ${quantity}
        WHERE Name=${name}
    `;

    await sql.query`
        INSERT INTO Bills (ProductName, Quantity, Total)
        VALUES (${name}, ${quantity}, ${total})
    `;

    res.json({ total, Id });
});

app.listen(5000, () => console.log("Server running on port 5000"));