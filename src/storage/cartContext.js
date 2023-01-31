import {createContext, useContext, useState} from "react";
import { useDeepCopy } from "../hooks/useDeepCopy";
import Swal from 'sweetalert2'

export const cartContext = createContext({cart: []});

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
});
export function CartProvider(props){
    const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
    let newCart = useDeepCopy(cart);

    function addToCart(productAddToCart){
        let isInCart = cart.find((itemInCart) => itemInCart.id === productAddToCart.id);
        if(isInCart){
            let newProduct = cart.find((item) => item.id === productAddToCart.id)
            let newProductIndex = cart.findIndex((item) => item.id === productAddToCart.id);
            newProduct.count = productAddToCart.count;
            cart.splice(newProductIndex,1,newProduct);
            setCart(cart);
            localStorage.setItem("cart", JSON.stringify(cart));
            Toast.fire({
                icon: 'success',
                title: `You have added ${productAddToCart.count} ${productAddToCart.title} in total to the cart`
            });
        }else{
            newCart.push(productAddToCart)
            setCart(newCart);
            localStorage.setItem("cart", JSON.stringify(newCart));
            Toast.fire({
                icon: 'success',
                title: `You have added ${productAddToCart.count} ${productAddToCart.title} to the cart`
            });
        }
    }

    function removeItem(idProduct){    
        Swal.fire({
            title: 'Are you sure you want to remove this product from the cart?',
            icon:'question',
            showDenyButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                let newCart = cart.filter((item) => item.id !== idProduct);
                setCart(newCart);
                localStorage.setItem("cart", JSON.stringify(newCart));    
                Toast.fire({
                    icon: 'success',
                    title: 'Product successfully removed'
                });
            }
        })
    }

    function clear(){
        Swal.fire({
            title: 'Are you sure you want to remove all products from the cart?',
            icon:'question',
            showDenyButton: true,
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                let newCart = [];
                setCart(newCart);
                localStorage.setItem("cart", JSON.stringify(newCart));    
                Toast.fire({
                    icon: 'success',
                    title: 'Products successfully removed'
                });
            }
        })
    }

    function getTotalPriceInCart(){
        let totalPrice = 0;
        for(const item of cart){
            totalPrice = totalPrice + (item.count * item.price)
        }
        return totalPrice;
    }

    function productAdd(productAddToCart){
        if(productAddToCart.count <= productAddToCart.stock){
            let newProduct = cart.find((item) => item.id === productAddToCart.id)
            let newProductIndex = cart.findIndex((item) => item.id === productAddToCart.id);
            newProduct.count += 1;
            cart.splice(newProductIndex,1,newProduct);
            let newArray = [].concat(cart);
            setCart(newArray);
            localStorage.setItem("cart", JSON.stringify(newArray));
        }
    }

    function productSubstract(productAddToCart){
        if(productAddToCart.count > 1){
            let newProduct = cart.find((item) => item.id === productAddToCart.id)
            let newProductIndex = cart.findIndex((item) => item.id === productAddToCart.id);
            newProduct.count -= 1;
            cart.splice(newProductIndex,1,newProduct);
            let newArray = [].concat(cart);
            setCart(newArray);
            localStorage.setItem("cart", JSON.stringify(newArray));
        }
    }

    return (
        <cartContext.Provider 
            value={{
                cart,
                setCart, 
                addToCart,
                getTotalPriceInCart, 
                removeItem,
                clear,
                productAdd,
                productSubstract,
            }}>
            {props.children}
        </cartContext.Provider>
    )
}

export function useCartContext(){
    return useContext(cartContext);
}