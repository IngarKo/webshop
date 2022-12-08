import { useRef, useState } from "react";
import { useEffect } from "react";
import config from "../../data/config.json"

function MaintainCategories() {
    const [categories, setCategories] = useState([]);
    const categoryRef = useRef();

    useEffect(() => {
        fetch(config.categoriesDbUrl)
        .then(res => res.json())
        .then(json => setCategories(json || []));
    }, []);

    const addCategory = () => {
        categories.push({"name" : categoryRef.current.value});
        fetch(config.categoriesDbUrl, {"method": "PUT", "body": JSON.stringify(categories)});
        categoryRef.current.value = "";
        setCategories(categories.slice());
    };

    const deleteCategory = (index) => {
        categories.splice(index,1)
        fetch(config.categoriesDbUrl, {"method": "PUT", "body": JSON.stringify(categories)});
        setCategories(categories.slice());
    };

    
    

    return ( 
    <div>
        <label>Kategooria nimi</label> <br />
        <input ref={categoryRef} type="text" /> <br />
        <button onClick={addCategory} >Sisesta</button>
        {categories.map((element, index) =>
        <div key={index} >
            {element.name}
            <button onClick={() => deleteCategory(index)}> X </button>
        </div>
        )}
    </div> );
}

export default MaintainCategories;