import { useEffect, useState } from "react";
import { useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useTranslation } from 'react-i18next';
import config from "../../data/config.json"

function AddProduct() {
    const { t } = useTranslation();
    const [dbProducts, setDbProducts] = useState([]);
    const navigate = useNavigate();
    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();
    const activeRef = useRef();
    const {id} =useParams();
    dbProducts.find(element => element.id === Number(id));
   // const index = dbProducts.indexOf(dbProducts);
    const [idUnique, setIdUnique] = useState(true)

     // orginaalsed andmebaasi tooted, mida ma ei muuda kunagi
    const [categories, setCategories] = useState([]);


    useEffect(() => {
        fetch(config.productsDbUrl)
            .then(res => res.json())
            .then(json => setDbProducts(json));
            
        fetch(config.categoriesDbUrl)
            .then(res => res.json())
            .then(json => setCategories(json));


    }, []);
    
// t("product-added")
    const addProduct = () => {
        if (idRef.current.value === "") {
            toast.error("Id ei ole t2idetud")
        return;
        }
        if (nameRef.current.value === "") {
            toast.success(t("name-ref"), {
                "position": "bottom-right",
                "theme": "dark",
                "pauseOnHover": "pause"
            })
        return;
        }
        if (priceRef.current.value === "") {
            toast.error("Price ei ole t2idetud")
        return;
        }
        if (imageRef.current.value === "") {
            toast.error("Image ei ole t2idetud")
        return;
        }
        if (/^\S*$/.test(imageRef.current.value) === false) {
            toast.error("Pildi aadressile ei saa sisestada tühikuid");
            return; // funktsioonist ära enam edasi mine
        }
        if (categoryRef.current.value === "") {
            toast.error("Category ei ole t2idetud")
        return;
        }
        if (descriptionRef.current.value === "") {
            toast.error("Description ei ole t2idetud")
        return;
        }
        if (activeRef.current.value === "") {
            toast.error("Active ei ole t2idetud")
        return;
        }
        
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
            
        // Pean lisama API p2ringu kaudu andmebaasi
        //dbProducts[index] = newProduct;
        console.log(addProduct)
        
    };

    

    const checkIdUniqueness = () => {
        if (id === idRef.current.value) {
            setIdUnique(true);
            return; // <---- 2ra mine siit edasi selle funktsiooni sees
        }
        const found = dbProducts.find(element => element.id === Number(idRef.current.value) );
        if (found === undefined) {
            setIdUnique(true);
            // console.log("Leitud toode tyhjus - ei leidnud kedagi sellise ID-ga")
        } else {
            setIdUnique(false);
            // console.log("leidsin toote sellise ID-ga")
        }
    };




    return ( 
    <div>
        {  idUnique === false && <div>Sisestatud ID on m6ne teise tootega sama!</div>}
        <div>
        <label>ID</label> <br/>
        <input onChange={ checkIdUniqueness } ref={idRef}  type="number"/><br/>
        <label>Nimi</label> <br/>
        <input ref={nameRef}  type="text"/><br/>
        <label>Hind</label> <br/>
        <input ref={priceRef}  type="number"/><br/>
        <label>Pilt</label> <br/>
        <input ref={imageRef}  type="text"/><br/>
        <label>Kategooria</label> <br/>
        <select ref={categoryRef} >
            {categories.map(element => <option>{element.name}</option>)}
        </select> <br /> <br />
        {/* <input ref={categoryRef}  type="text"/><br/> */}
        <label>Kirjeldus</label> <br/>
        <input ref={descriptionRef}  type="text"/><br/>
        <label>Aktiivsus</label> <br/>
        <input ref={activeRef}  type="checkbox"/><br/>
        <button disabled={ idUnique === false } onClick={() => addProduct ()} >Lisa</button>
        </div>
        <ToastContainer/>
    </div> );
}

export default AddProduct;