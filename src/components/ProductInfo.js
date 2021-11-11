import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router';
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const ProductInfo = () => {
    const {id} = useParams();
    const [productStats, setProductStats] = useState({})
    const history = useHistory();

    // GET PRODUCT INFO
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/product/${id}`)
        .then(response=>{
            console.log("response when getting one product", response)
            setProductStats(response.data.results)
        })
        .catch(err=>console.log("err", err))
    },[])

    const deleteProduct = ()=>{
        console.log("DELETE")
        axios.delete(`http://localhost:8000/api/product/delete/${id}`)
            .then(response=>{
                console.log("response after deletion", response)
                history.push("/")
            })
            .catch(err=>console.log("err", err))
    }

    return (
        <div>
            <h1>DETAILS ABOUT PRODUCT</h1>
            <h3>Name: {productStats.title}</h3>
            <h3>Price: {productStats.price}</h3>
            <h5>Description: {productStats.description}</h5>
            <button onClick={deleteProduct} className="btn btn-danger">Delete {productStats.title}</button>
        </div>
    );
};

export default ProductInfo;