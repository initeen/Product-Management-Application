import React, { useState, useEffect } from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import "./CreateAndUpdate.css";
import axios from 'axios';
import { toast } from 'react-toastify';

const initialSate = {
    product_name: "",
    product_quantity: "",
    product_price: ""
};

const CreateAndUpdate = () => {

    const [state, setState] = useState(initialSate);
    const { product_name, product_quantity, product_price } = state;
    const history = useHistory();
    const { product_id } = useParams();

    useEffect(() => {
        axios.get(`http://localhost:5000/api/get/${product_id}`)
            .then((response) => setState({ ...response.data[0] }));
    }, [product_id]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!product_name || !product_quantity || !product_price) {
            
        } else {
            if (!product_id) {
                axios.post("http://localhost:5000/api/post", {
                    product_name,
                    product_quantity,
                    product_price
                }).then(() => {
                    setState({ product_name: "", product_quantity: "", product_price: "" });
                })
                    .catch((err) => toast.error(err.response.data));
                } else {
                axios.put(`http://localhost:5000/api/update/${product_id}`, {
                    product_name,
                    product_quantity,
                    product_price
                }).then(() => {
                    setState({ product_name: "", product_quantity: "", product_price: "" });
                })
                    .catch((err) => toast.error(err.response.data));
                }
            setTimeout(() => history.push("/"), 500);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setState({ ...state, [name]: value });
    };
    return (
        <div style={{ marginTop: "100px" }}>
            <form style={{
                margin: "auto",
                padding: "15px",
                maxWidth: "405px",
                alignContent: "center"
            }}
                onSubmit={handleSubmit}
            >
                <h2>Product Management Application</h2>
                <label htmlfor="product_name"><b>Product Name</b></label>
                <input
                    type='text'
                    id='product_name'
                    name='product_name'
                    placeholder='Product Name'
                    value={product_name || ""}
                    onChange={handleInputChange}
                />

                <label htmlfor="product_quantity"><b>Product Quantity</b></label>
                <input
                    type='text'
                    id='product_quantity'
                    name='product_quantity'
                    placeholder='Product Quantity'
                    value={product_quantity || ""}
                    onChange={handleInputChange}
                />

                <label htmlfor="product_price"><b>Product Price</b></label>
                <input
                    type='text'
                    id='product_price'
                    name='product_price'
                    placeholder='Product Price'
                    value={product_price || ""}
                    onChange={handleInputChange}
                />
                <input type="submit" value= "Save"/>
                <Link to="/">
                    <input type="button" value="Go Back" />
                </Link>
            </form>
        </div>
    )
}

export default CreateAndUpdate