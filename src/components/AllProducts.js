import React, {useState, useEffect} from 'react';
import axios from 'axios'
import {Link} from "react-router-dom"

const AllProducts = (props) => {
    // GET ALL PRODUCTS
    const [allProducts, setAllProducts] = useState([])
    const [deleteToggle, setDeleteToggle] = useState(false)
    useEffect(()=>{
        axios.get("http://localhost:8000/api/products")
        .then(response=>{
            console.log("Response to getting all ninjas", response)
            setAllProducts(response.data.results)
        })
        .catch(err=>console.log("err", err))

    },[props.formSubmitted, deleteToggle])

    const deleteProduct = (e, id)=>{
        console.log("DELETE", id)
        axios.delete(`http://localhost:8000/api/product/delete/${id}`)
        .then(response=>{
            console.log("response after deletion", response)
            setDeleteToggle(!deleteToggle)
        })
        .catch(err=>console.log("err", err))
    }
    return (
        <div>
            <h2>Here are all the products!</h2>
            {
                allProducts.map((product, i)=>{
                    return(
                        <div key={i}>
                            <hr></hr>
                            <h3>Name of product:<Link to = {`/product/${product._id}`}>{product.title}</Link></h3>
                            <p>Price: {product.price}</p>
                            <p>Description: {product.description}</p>
                            <button onClick={(e)=>deleteProduct(e, product._id)} className="btn btn-danger">Delete {product.title}</button> | <Link to={`/edit/${product._id}`} className="btn btn-primary">Edit {product.title}</Link>
                            <hr></hr>
                        </div>
                    )
                })
            }
        </div>
    );
};




export default AllProducts;