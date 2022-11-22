import productsFromFile from "../data/products.json"
import Button from "react-bootstrap/Button"
import { useTranslation } from 'react-i18next';
function HomePage() {
    const { t } = useTranslation();

    const addToCart = () => {
            // pange localStoragesse v6i sessionStorage nagu eesti keelses
            let cartLS = sessionStorage.getItem("cart")
    };


    const sortAZ = () => {

    };

    const sortZA = () => {
        
    };

    const sortPriceAsc = () => {
        
    };

    const sortPriceDesc = () => {
        
    };

    const filterByCategory = () => {

    };

    return ( 
    <div>
        <button onClick={sortAZ}>{t("sort-az")}</button>
        <button onClick={sortZA}>Sorteeri Z-A</button>
        <button onClick={sortPriceAsc}>Sorteeri hind kasvavalt</button>
        <button onClick={sortPriceDesc}>Sorteeri hind kahanevalt</button>
        <div>{productsFromFile.lenght}</div>
        {/* kategooriad peavad siia tulema tynaamiliselt */}
        <button>motorcycles</button>
        <button>motors</button>
        <div></div>
        {productsFromFile.map(element => 
            <div>
                <img className="pilt" src={element.image} alt="" />
                <div>{element.name}</div>
                <div>{element.price}</div>
                <Button >{t("add-to-cart")}</Button>
            </div>)}
    </div> );
}

export default HomePage;