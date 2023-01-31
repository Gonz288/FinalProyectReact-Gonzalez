import React, {useState, useEffect, useContext} from "react";
import { getProductsById } from "../../services/firebase";
import {useParams} from "react-router-dom";
import ItemDetail from "./ItemDetail";
import { cartContext } from "../../storage/cartContext";

function ItemDetailContainer(){
    const [product, setProducts] = useState([{title: "loading", price:"-----"}]);
    const [isInCart, setIsInCart] = useState(false);

    let params = useParams();

    const {cart, addToCart} = useContext(cartContext);

    function handleAddToCart(count){
        let productCard = cart.find((item) => item.id === product.id)
        if(productCard){
            let totalCount = productCard.count + count
            addToCart({...product, count: totalCount});
        }else{
            setIsInCart(true);
            addToCart({...product, count: count});
        }
    }

    useEffect(()=>{
        getProductsById(params.itemid).then((response) =>{
            setProducts(response);
        }).catch((error) => alert(error));
    }, [params.itemid]);

    return (<ItemDetail
        isInCart={isInCart}
        onAddToCart={handleAddToCart} 
        title={product.title} 
        img={product.img} 
        price={product.price} 
        detail={product.detail}
        stockUpdated={product.stock}
    />);
}

export default ItemDetailContainer;