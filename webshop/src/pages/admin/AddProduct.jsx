import { useState } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import productsFromFile from "../../data/products.json";

function AddProduct() {
    const idRef = useRef();
    const nameRef = useRef();
    const priceRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();
    const descriptionRef = useRef();
    const activeRef = useRef();
    const {id} =useParams();
    productsFromFile.find(element => element.id === Number(id));
    const index = productsFromFile.indexOf(productsFromFile);
    const [idUnique, setIdUnique] = useState(true)

    

    const addProduct = () => {
        const newProduct = {
            "id": Number(idRef.current.value),
            "name": nameRef.current.value,
            "price": Number(priceRef.current.value),
            "image": imageRef.current.value,
            "category": categoryRef.current.value,
            "description": descriptionRef.current.value,
            "active": activeRef.current.checked,
        }
        productsFromFile.push(newProduct);
        productsFromFile[index] = newProduct;
        console.log(addProduct)
        
    };

    

    const checkIdUniqueness = () => {
        if (id === idRef.current.value) {
            setIdUnique(true);
            return; // <---- 2ra mine siit edasi selle funktsiooni sees
        }
        const found = productsFromFile.find(element => element.id === Number(idRef.current.value) );
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
        <input ref={categoryRef}  type="text"/><br/>
        <label>Kirjeldus</label> <br/>
        <input ref={descriptionRef}  type="text"/><br/>
        <label>Aktiivsus</label> <br/>
        <input ref={activeRef}  type="checkbox"/><br/>
        <button disabled={ idUnique === false } onClick={() => addProduct ()} >Lisa</button>
        </div>
    </div> );
}

export default AddProduct;