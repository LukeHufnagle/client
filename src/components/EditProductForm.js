import React,{useState, useEffect} from 'react';
import {useParams} from 'react-router';
import axios from 'axios'
import {useHistory} from 'react-router-dom'

const EditProductForm = (props) => {
    const {id} = useParams();
    const [formInfo, setFormInfo] = useState({
        title: "",
        price: "",
        description: ""
    })
    const history = useHistory()
    useEffect(()=>{
        axios.get(`http://localhost:8000/api/product/${id}`)
        .then(response=>{
            console.log("response when getting one product", response)
            setFormInfo(response.data.results)
        })
        .catch(err=>console.log("err", err))
    },[])

    // Change handler for updating formInfo object
    const changeHandler = (e)=>{
        // console.log("CHANGE")
        setFormInfo({
            ...formInfo,
            [e.target.name]: e.target.value
        })
    }

    // Submit handler for form to save inputed data
    const submitHandler = (e)=>{
        e.preventDefault()
        axios.put(`http://localhost:8000/api/product/update/${id}`, formInfo)
            .then(response=>{
                console.log("RESPONSE", response)
                history.push("/")
            })
            .catch(err=>console.log("err",err))
        
    }

    return (
        <div>
            <h5>Edit the product!</h5>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="">Title: </label>
                    <input onChange={changeHandler} type="text" name="title" className="form-control" value={formInfo.title}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="">Price: </label>
                    <input onChange={changeHandler} type="number" name="price" className="form-control" value={formInfo.price}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="">Description: </label>
                    <input onChange={changeHandler} type="text" name="description" className="form-control" value={formInfo.description}></input>
                </div>
                <input type="submit" value="Update Product" className="btn btn-success mt-2"></input>
            </form>
        </div>
    );
};



export default EditProductForm;