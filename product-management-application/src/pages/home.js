import React from 'react';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import "./home.css";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    },[]);

    const deleteProduct = (product_id) => {
        if(window.confirm("Are you sure to delete this product?")){
            axios.delete(`http://localhost:5000/api/remove/${product_id}`);
            setTimeout(()=> loadData(),500);
        }
    };
    return (
        <div style={{ marginTop: "150px" }}>
             <h2>Product Management Application</h2>
           <Link to ="/createProduct">
           <button className='btn btn-product'>Add Product</button>
           </Link>
            <table className="styled-table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>ProductID</th>
                        <th style={{ textAlign: "center" }}>ProductName</th>
                        <th style={{ textAlign: "center" }}>ProductQuantity</th>
                        <th style={{ textAlign: "center" }}>ProductPrice</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.product_id}>
                                <th scope='row'>{index + 1}</th>
                                <td>{item.product_name}</td>
                                <td>{item.product_quantity}</td>
                                <td>{item.product_price}</td>
                                <td>
                                    <Link to={`/update/${item.product_id}`}>
                                        <button className='btn btn-edit'>Edit</button>
                                    </Link>
                                    <button className='btn btn-delete' onClick={()=>deleteProduct(item.product_id)}>Delete</button>
                                    <Link to={`/view/${item.product_id}`}>
                                        <button className='btn btn-view'>View</button>
                                    </Link>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>

        </div>
    )
}

export default Home