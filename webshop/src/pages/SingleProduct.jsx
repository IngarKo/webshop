import { useParams } from "react-router-dom";
import productsFromFile from "../data/products.json";
import "../css/SingleProduct.css";

function SingleProduct() {
    const {id} = useParams();
    const productsFound = productsFromFile.find(element => element.id === Number(id));
    


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