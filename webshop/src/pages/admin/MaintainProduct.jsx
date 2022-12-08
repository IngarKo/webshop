import config from "../../data/config.json";
import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';

function MaintainProduct() {
    const [products, setProducts] = useState([]);
    const searchedProduct = useRef();
    const { t } = useTranslation();

    const [dbProducts, setDbProducts] = useState([]); // orginaalsed andmebaasi tooted, mida ma ei muuda kunagi
    

    useEffect(() => {
        fetch(config.productsDbUrl)
            .then(res => res.json())
            .then(json => {
                setProducts(json);
                setDbProducts(json);
            });
    }, []);

    const deleteProduct = (product) => {
        const dbIndex = dbProducts.findIndex(element => element.id === product.id)
        dbProducts.splice(dbIndex,1);
        const index = products.findIndex(element => element.id === product.id);
        products.splice(index,1);
        setProducts(products.slice());
        fetch(config.productsDbUrl, {
            "method": "PUT",
             "body": JSON.stringify(dbProducts)
            }
            ).then(() =>
            toast.success(t("product-deleted"), {
                "position": "bottom-right",
                "theme": "dark",
                "pauseOnHover": "pause"
            }));
    };

    const searchFromProducts = () => {
       const result = dbProducts.filter(element => element.name.includes(searchedProduct.current.value));
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
                <button onClick={() => deleteProduct(element)} >x</button>
                <Link to={"/admin/edit-product/" + element.id}>
                <button>Muuda</button>
                </Link>
                <ToastContainer />
                </div>)}
    </div> );
}

export default MaintainProduct;