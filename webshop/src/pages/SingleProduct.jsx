import { useParams } from "react-router-dom";
import config from "../data/config.json"
import "../css/SingleProduct.css";
import { useEffect, useState } from "react";

function SingleProduct() {
    const [dbProducts, setDbProducts] = useState([]); 
    const {id} = useParams();
    const productsFound = dbProducts.find(element => element.id === Number(id));
    
    

    useEffect(() => {
        fetch(config.productsDbUrl)
            .then(res => res.json())
            .then(json => setDbProducts(json));
    }, []);


    return ( 
    <div>
        {productsFound !== undefined && <div >
            <img className="singleProductimg" src={productsFound.image} alt="" />
            <div>
            <div>{productsFound.id}</div>
            <br />
            <div>{productsFound.name}</div>
            <br />
            <div>{productsFound.price}</div>
            <br />
            <div>{productsFound.category}</div>
            <br />
            <div>{productsFound.description}</div>
            </div>
            { productsFound === undefined && <div>Toodet ei leitud</div>}
            </div>}
    </div> );
}

export default SingleProduct;