import React,{useState} from 'react';
import axios from 'axios'

const ProductForm = (props) => {
    const [formInfo, setFormInfo] = useState({
        title: "",
        price: "",
        description: ""
    })
    const [formErrors, setFormErrors] = useState({
        title: "",
        price: "",
        description: ""
    })

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
        axios.post("http://localhost:8000/api/new/product", formInfo)
            .then(response=>{
                console.log("response when submit form", response)

                if(response.data.err){
                    setFormErrors(response.data.err.errors)
                } else{
                    props.setFormSubmitted(!props.FormSubmitted)
                    setFormInfo({
                        title: "",
                        price: "",
                        description: ""
                    })
                    setFormErrors({
                        title: "",
                        price: "",
                        description: ""
                    })
                }
            })
            .catch(err=>console.log("err", err))

    }

    return (
        <div>
            <form onSubmit={submitHandler}>
                <div className="form-group">
                    <label htmlFor="">Title: </label>
                    <input onChange={changeHandler} type="text" name="title" className="form-control" value={formInfo.title}></input>
                    <p className="text-danger">{formErrors.title?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Price: </label>
                    <input onChange={changeHandler} type="number" name="price" className="form-control" value={formInfo.price}></input>
                    <p className="text-danger">{formErrors.price?.message}</p>
                </div>
                <div className="form-group">
                    <label htmlFor="">Description: </label>
                    <input onChange={changeHandler} type="text" name="description" className="form-control" value={formInfo.description}></input>
                    <p className="text-danger">{formErrors.description?.message}</p>
                </div>
                <input type="submit" value="Create Product" className="btn btn-success mt-2"></input>
            </form>
        </div>
    );
};



export default ProductForm;