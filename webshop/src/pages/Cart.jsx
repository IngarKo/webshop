import { useEffect ,useState } from "react";
import { useTranslation } from 'react-i18next';
import "../css/Cart.css";


function Cart() {
    const { t } = useTranslation();
    const [cart, setCart] = useState(JSON.parse(sessionStorage.getItem ("cart")) || []);
    const [parcelMachines, setParcelMachines] = useState([]);
    
    

    useEffect(() => { // useEffect tuleb panna siis, kui lehele tulles tehakse koheselt API p2ring fetch() abil
        fetch("https://www.omniva.ee/locations.json")
            .then(res => res.json())
            .then(json => setParcelMachines(json));

    console.log("v6tan iga kord andmebaasist")
        
    }, []);
    
    
    // siin v6tke eesti keelsest ja kuvage v2lja sessionStorage-s

        const removeFromCart = (index) => {
            cart.splice(index, 1);
            setCart(cart.slice());
            sessionStorage.setItem("cart", JSON.stringify([cart]))

        };
    
    // const addToCart = (index) => {
    //     cart.push(index);
    //     setCart(cart.slice());
    //     sessionStorage.setItem("cart", JSON.stringify(cart));
    // };

    const emptyCart = () => {
        setCart([]);
        sessionStorage.setItem("cart", JSON.stringify([1,2]));
    

    };
    const calculateCartSum = () => {
        let sum = 0;
        cart.forEach(element => sum = sum + element.product.price * element.quantity);
        return sum.toFixed(2);
        

    };

    // dynaamika: kui ostukorv on tyhi, siis
    // tyhjenda numm, kogust, kogusumma ei n2idata

    // kui ostukorv on tyhi, siis pange ilus pilt  eqq

    const decreaseQuantity = (index) => {
        cart[index].quantity = cart[index].quantity -1;
        if (cart[index].quantity === 0) {
            removeFromCart(index);
        }
        setCart(cart.slice());
        sessionStorage.setItem("cart", JSON.stringify(cart));

    };
    const increaseQuantity = (index) => {
        cart[index].quantity = cart[index].quantity +1;
        setCart(cart.slice());
        sessionStorage.setItem("cart", JSON.stringify(cart));
        
    };

    const pay = () => {
        const paymentUrl = "https://igw-demo.every-pay.com/api/v4/payments/oneoff"

        const paymentData = {
            "api_username": "92ddcfab96e34a5f",
            "account_name": "EUR3D1",
            "amount": calculateCartSum(),
            "order_reference": Math.random()*9999999,
            "nonce": Math.random()*9999999+ new Date(),
            "timestamp": new Date(),
            "customer_url": "https://proov-html.web.app/"
        };

        const headersData = {
            "Authorization": "Basic OTJkZGNmYWI5NmUzNGE1Zjo4Y2QxOWU5OWU5YzJjMjA4ZWU1NjNhYmY3ZDBlNGRhZA==",
            "Content-Type": "application/json"
        };

        fetch(paymentUrl, {
            "method": "POST", 
            "body": JSON.stringify(paymentData), 
            "headers": headersData
        })
        .then(res => res.json())
        .then(json => window.location.href = json.payment_link)
    };

    return ( 
    <div>
        <div className="cart-top" >
        { cart.length > 0 && <div className="empty" onClick={emptyCart} >{t("empty-cart")} <img className="empty-cart" src="/empty-set.png" alt=""/></div> } 
        { cart.length >= 2 && <div>You have {cart.length} items in your cart.</div>}
        { cart.length === 1 && <div>You have 1 item in your cart.</div>}
        </div>
        { cart.length === 0 && <div>Your cart is empty.</div>  }
        { cart.length === 0 && <img className="emptyCart" src="/empty-cart.png" alt="" />}
        <div>

        
            {cart.map((element, index) =>
        <div className="product" key={index}>
            <img className="image" src={element.product.image} alt="" />
            <div className="name" >{element.product.name}</div>
            <div className="price" >{element.product.price.toFixed(2)} $</div>
            <img className="eur"  src="/euro.png" alt="" />
            <div className="quantity">
            <img className="button" onClick={() =>decreaseQuantity(index)}  src="/minus.png" alt="" />
            <div>{element.quantity} {t("tk")}</div>
            <img className="button" onClick={() =>increaseQuantity(index)} src="/plus.png" alt="" />

            </div>
            <div className="sum">{(element.product.price * element.quantity).toFixed(2)} </div>
            <img className="eur"   src="/euro.png" alt="" />
            
            
            <img  className="button" onClick={() => removeFromCart(index)} src="/delete.png" alt="" />
            
            

        </div>
        
        )}
        <div>
            <button onClick={pay} >Maksma</button>
        </div>
        </div>
        <select>
            {parcelMachines
            .filter(element => element.A0_NAME === "EE")
            .map((element, index) =>
             <option key={index}>
                {element.NAME}
                </option>)}
        </select>
        <div  >
        
       
        { cart.length > 0 && <div className="cart-bottom"  >Total price {calculateCartSum()} <img className="eur" src="/euro.png" alt="" /> </div>}
        </div>
        
    </div> );
}
/* className="cart-bottom" */
export default Cart;