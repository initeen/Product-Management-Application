const express = require("express")
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const cors = require("cors");
const { error } = require("console");


const db = mysql.createPool({
    host:"localhost",
    user: "root",
    password: "niteen",
    database: "productdb"
})

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));


app.get("/api/get", (req, res) => {
    const sqlGet = "SELECT * from products";
    db.query(sqlGet,(error, result)=>{
        res.send(result);
    });
});

app.post("/api/post",(req,res) => {
    const {product_name, product_quantity, product_price} = req.body;
    const sqlInsert = "INSERT INTO products (product_name, product_quantity, product_price) VALUES(?, ?, ?)";
    db.query(sqlInsert,[product_name, product_quantity, product_price],(error,result) => {
        if (error) {
            console.log(error);
        }
    });
});

app.delete("/api/remove/:product_id",(req,res) => {
    const {product_id} = req.params;
    const sqlRemove = "DELETE FROM products WHERE product_id = ?";
    db.query(sqlRemove, product_id,(error, result) => { 
        if(error){
            console.log(error);
        }
    });
});

app.get("/api/get/:product_id", (req,res)=>{
    const {product_id} = req.params;
    const sqlGet = "SELECT * FROM products WHERE product_id = ?";
    db.query(sqlGet,product_id,(error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.put("/api/update/:product_id", (req,res)=>{
    const {product_id} = req.params;
    const {product_name, product_quantity, product_price} = req.body;
    const sqlUpdate = "UPDATE products SET product_name = ?, product_quantity = ?, product_price = ? WHERE product_id = ?";
    db.query(sqlUpdate,[product_name, product_quantity, product_price, product_id],(error, result)=>{
        if(error){
            console.log(error);
        }
        res.send(result);
    });
});

app.listen(5000, ()=> {
    console.log("server is running on port 5000");
})