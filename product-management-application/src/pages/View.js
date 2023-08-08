import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import "./View.css";

const View = () => {
    const [product, setProduct] = useState({});

    const { product_id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${product_id}`)
            .then((resp) => setProduct({ ...resp.data[0] }));

    }, [product_id]);
    return (
        <div style={{ marginTop: "150px" }}>
             <h2>Product Management Application</h2>
            <div className="card">
                <div className="card-header">
                    <p><b>Product details</b></p>
                </div>
                <div className="container">
                    <strong>Product Id: </strong>
                    <span><b>{product_id}</b></span>
                    <br />
                    <br />

                    <strong>Product Name: </strong>
                    <span><b>{product.product_name}</b></span>
                    <br />
                    <br />

                    <strong>Product Quantity: </strong>
                    <span><b>{product.product_quantity}</b></span>
                    <br />
                    <br />

                    <strong>Product Price: </strong>
                    <span><b>{product.product_price}</b></span>
                    <br />
                    <br />

                    <Link to="/">
                        <div className="btn btn-edit">Go Back</div>
                    </Link>
                </div>

            </div>

        </div>
    )
}

export default View