import { useRef } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import productsFromFile from "../../data/products.json";

function MaintainProduct() {
    const [products, setProducts] = useState(productsFromFile);
    const searchedProduct = useRef();


    const deleteProduct = (i) => {
        productsFromFile.splice(i,1);
        setProducts(productsFromFile.slice());
    };

    const searchFromProducts = () => {
       const result = productsFromFile.filter(element => element.name.includes(searchedProduct.current.value));
       setProducts(result);
    };

    return ( 
    <div>
        <input ref={searchedProduct} onChange={searchFromProducts} type="text" />
        <div>{products.length} tk</div>
        {products.map((element, index) =>
            <div key={element.id}>
                <img src={element.image} alt="" />
                <div>{element.id}</div>
                <div>{element.name}</div>
                <div>{element.price}</div>
                <div>{element.image}</div>
                <div>{element.category}</div>
                <div>{element.description}</div>
                <div>{element.active}</div>
                <button onClick={() => deleteProduct(index)} >x</button>
                <Link to={"/admin/edit-product/" + element.id}>
                <button>Muuda</button>
                </Link>
                </div>)}
    </div> );
}

export default MaintainProduct;