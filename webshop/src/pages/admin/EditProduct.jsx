import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import config from "../../data/config.json";

function EditProduct() {
    const {id} =useParams();
    const [dbProducts, setDbProducts] = useState([]); 
    const productsFound = dbProducts.find(element => element.id === Number(id));
    //const index = dbProducts.indexOf(productsFound);
    const navigate = useNavigate();

    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();
    const activeRef = useRef();

    const changeProduct = () => {
        const newProduct = {
            "id": Number(idRef.current.value),
            "name": nameRef.current.value,
            "price": Number(priceRef.current.value),
            "image": imageRef.current.value,
            "category": categoryRef.current.value,
            "description": descriptionRef.current.value,
            "active": activeRef.current.checked,
        }
        dbProducts.push(newProduct);
        fetch(config.productsDbUrl, {"method": "PUT", "body": JSON.stringify(dbProducts)})
            .then(() => navigate("/admin/maintain-products"));
        
    };

    // onClick={} <- pealevajutades paneb funktsiooni k2ima
    // onChange={} <- inputi sees muutuse korral paneb funktsiooni k2ima
    // .find() <- JavaScripti funktsionaalsus, mille abil leian yles

    const [idUnique, setIdUnique] = useState(true)

   
    

    useEffect(() => {
        fetch(config.productsDbUrl)
            .then(res => res.json())
            .then(json => setDbProducts(json));
    }, []);

    const checkIdUniqueness = () => {
        // if (id === idRef.current.value) {
        //     setIdUnique(true);
        //     return; // <---- 2ra mine siit edasi selle funktsiooni sees
        // }
        const found = dbProducts.find(element => element.id === Number(idRef.current.value) );
        if (found === undefined) {
            setIdUnique(true);
            // console.log("Leitud toode tyhjus - ei leidnud kedagi sellise ID-ga")
        } else {
            setIdUnique(false);
            // console.log("leidsin toote sellise ID-ga")
        }
    };

                // const result = productsFromFile.filter(element => element.id === Number(idRef.current.value) );
            // if (result.length === 0) {
            //   setIdUnique(true);
            // } else {
            //   setIdUnique(false);
            // }

            const [categories, setCategories] = useState([]);


            useEffect(() => {
                fetch(config.categoriesDbUrl)
                    .then(res => res.json())
                    .then(json => setDbProducts(json));

                fetch(config.categoriesDbUrl)
                    .then(res => res.json())
                    .then(json => setCategories(json));
        
        
            }, []);

    return ( 
    <div>
        { productsFound !== undefined && <div>
            {  idUnique === false && <div>Sisestatud ID on m6ne teise tootega sama!</div>}
        <label>ID</label> <br/>
        <input ref={idRef} onChange={ checkIdUniqueness } defaultValue={productsFound.id} type="number"/><br/>
        <label>Nimi</label> <br/>
        <input ref={nameRef} defaultValue={productsFound.name} type="text"/><br/>
        <label>Hind</label> <br/>
        <input ref={priceRef} defaultValue={productsFound.price} type="number"/><br/>
        <label>Pilt</label> <br/>
        <input ref={imageRef} defaultValue={productsFound.image} type="text"/><br/>
        <label>Kategooria</label> <br/>
        <select ref={categoryRef} defaultValue={productsFound.category} >
            {categories.map((element, i) => <option key={i} >{element.name}</option>)}
        </select> <br /> <br />
        {/* <input ref={categoryRef} defaultValue={productsFound.category} type="text"/><br/> */}
        <label>Kirjeldus</label> <br/>
        <input ref={descriptionRef} defaultValue={productsFound.description} type="text"/><br/>
        <label>Aktiivsus</label> <br/>
        <input ref={activeRef} defaultChecked={productsFound.active} type="checkbox"/><br/>
        <button disabled={ idUnique === false } onClick={changeProduct} >Muuda</button>
        </div>}

        { productsFound === undefined && <div>
            Toodet ei leitud
            </div>}
    </div> );
}

export default EditProduct;


// SingleProduct <---- kodus
// 1. App.js failis peab olema URLi taga kooloniga muutuja
// 2. Koht kust ma satun sinna lehele, seal peab olema <Link> ja saadetud
//      URLi, kooloni koha peale mingi muutuja (toote ID)
// 3. Failis kus tahan toodet kätte saada, seal useParams() (ka import)
// hooki abil võtan selle URLi muutuja kätte
// 4. Võtan kõik tooted (productsFromFile)
// 5. Otsin üles õige toote toodete seast .find() abil ja teisenda numriks URL-st saadud id
// 6. Kuva välja HTMLs
// 7. Tee dünaamiline väljakuvamine, kui ei leitud (  ütle "toodet ei leitud",
//        kui on leitud toode tühi  )


// AddProduct <---- kodus
// 8. 7x teen useRef()   ( ka import )    id, name, price, image, category, description, active
// 9. 7x teen label + input
// 10. 7x panen ref-i iga inputi sisse
// 11. Teen nupu ja seon ta mingi funktsiooniga
// 12. Seon ref-i kõik current.value-d kokku ühe muutuja sisse

// 13. AddProductis: teen productsFromFile.push()

// 14. EditProductis: teen 7x defaultValue
// 15. Otsin üles järjekorranumbri (ainult jr nr alusel muudan)
// 16. Muudan productsFromFile[j2rjekorraNumber] = seotud_ref_muutuja;