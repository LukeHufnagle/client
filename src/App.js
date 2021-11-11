import React,{useState} from 'react';
import './App.css';
import AllProducts from './components/AllProducts';
import ProductForm from './components/ProductForm';
import ProductInfo from './components/ProductInfo';
import EditProductForm from './components/EditProductForm';
import{
  BrowserRouter,
  Link,
  Switch,
  Route,
  useHistory
} from "react-router-dom"

function App() {
  const [formSubmitted, setFormSubmitted] = useState(false)

  return (
    <BrowserRouter>
    <div className="App container">
      <h1>Welcome to the Product Manager!</h1>
      <Link to="/" className="btn btn-dark">Home Page</Link>
      <Link to="/new" className="btn btn-secondary"> Create new Product!</Link>
      <Switch>
        <Route exact path = "/">
          <AllProducts formSubmitted={formSubmitted}></AllProducts>
        </Route>
        <Route exact path="/new">
          <ProductForm formSubmitted = {formSubmitted} setFormSubmitted={setFormSubmitted}></ProductForm>
        </Route>

        <Route exact path="/product/:id">
          <ProductInfo></ProductInfo>
        </Route>

        <Route exact path="/edit/:id">
          <EditProductForm></EditProductForm>
        </Route>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
