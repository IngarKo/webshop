
import config from "../data/config.json"
import Button from "react-bootstrap/Button"
import { useTranslation } from 'react-i18next';
import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";

function HomePage() {
    const { t } = useTranslation();
    const [products, changeProducts] = useState([]); // mida n2idatakse v2lja
    const [dbProducts, setDbProducts] = useState([]); // orginaalsed andmebaasi tooted, mida ma ei muuda kunagi
    

    useEffect(() => {
        fetch(config.productsDbUrl)
            .then(res => res.json())
            .then(json => {
                changeProducts(json);
                setDbProducts(json);
            });
    }, []);

                                // VANA: [{id: 1, name: "Nobe", price: 12, ...}, {id: 1, name: "Nobe", price: 12, ...}, {id: 1, name: "Nobe", price: 12, ...}]
                    // UUS: [{"product": {id: 1, name: "Nobe", price: 12, ...}, "quantity": 2}]
                    // VANA: [toode1, toode1, toode1, toode2, toode2, toode2, toode2, toode2, toode2]
                    // UUS: [{"product": toode1, "quantity": 3}, {"product": toode2, "quantity": 6}]
                    //            {id: 1, name: "Nobe", price: 12, ...}
                    const addToCart = (productClicked) => {
                        let cartLS = sessionStorage.getItem("cart");
                        cartLS = JSON.parse(cartLS) || [];
                        // kui ei leita üles ja ma otsin tema järjekorranumbrit, siis tulem on -1
                        const index = cartLS.findIndex( element => element.product.id === productClicked.id );
                        if (index >= 0) {
                        // tooted[3] = "Midagi_muud";
                        // kogus = kogus + 1; <--- muutis küll, aga ei muutnud HTMLi
                        // muudaKogus(kogus + 1); <--- muutis HTMLi
                        cartLS[index].quantity = cartLS[index].quantity + 1;
                        } else {
                        cartLS.push({"product": productClicked, "quantity": 1});
                        }
                        cartLS = JSON.stringify(cartLS);
                        sessionStorage.setItem("cart", cartLS);
                        toast.success(t("product-added"), {
                            "position": "bottom-right",
                            "theme": "dark",
                            "pauseOnHover": "pause"
                        });
                    }
                    

                const sortAZ = () => {
                    products.sort((a,b) => a.name.localeCompare(b.name));
                    changeProducts(products.slice());
                    
                

                    //     vaja teha: useState, mis võtab algväärtuse products-st
                    // järgmiseks sorteerida
                    // ja siis useState funktsiooni abil väärtusi siin lehel muuta

                    // tavaline sort ei tööta, peab kasutama (a,b) =>

                };

                const sortZA = () => {
                    products.sort((a,b) => b.name.localeCompare(a.name));
                    changeProducts(products.slice());
                    
                    
                };

                const sortPriceAsc = () => {
                    products.sort((a,b) => a.price - b.price);
                    changeProducts(products.slice());
                    
                    
                };

                const sortPriceDesc = () => {
                    products.sort((a,b) => b.price - a.price);
                        changeProducts(products.slice());

                };

                const filterByCategory = (i) => {
                    const outcome = dbProducts.filter(element => element.category.match (i));
                    changeProducts(outcome);
                    return
                };

                const categories = [...new Set (dbProducts.map(element => element.category))];


               
    return ( 
    <div>
        
        <button onClick={() => sortAZ ()}>{t("sort-az")}</button>
        <button onClick={() => sortZA ()}>{t("sort-za")}</button>
        <button onClick={() => sortPriceAsc ()}>{t("sort-price-as")}</button> 
        <button onClick={() => sortPriceDesc ()}>{t("sort-price-des")}</button>
        <div>{products.length}</div>
        {/* kategooriad peavad siia tulema dünaamiliselt (.map() abil) */}
        {/* {products.map((element, index) => 
            <div key={index}>
                
                
                
            </div>)} */}
        { categories.map((element, i) => <button key={i} onClick={() => filterByCategory (element)} >{t(element)}</button>) }
        
        <div></div>
        {products.map((element, index) => 
            <div key={index}>
                <Link to={"/product/" + element.id}>
                <img  className="pilt" src={element.image} alt="" />
                </Link>
                <div>{element.name}</div>
                <div>{element.price}</div>
                
                
                <Button onClick={() =>addToCart(element)} >{t("add-to-cart")}</Button>
            </div>)}
            <ToastContainer />
    </div> );
}

export default HomePage;