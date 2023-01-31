import React, {useContext} from "react";
import { cartContext } from "../../storage/cartContext";
import "./navbar.css"
function CartWidget(){
    const context = useContext(cartContext);
    
    return(
        <>
            <img src="/img/cart.png" className="cart" alt="cart"/>
            <span className="cart-text fw-semibold">Cart</span>
            {context.getTotalItemsInCart}
        </>
    );
}

export default CartWidget;