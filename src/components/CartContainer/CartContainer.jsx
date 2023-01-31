import React , {useState} from "react";
import { useContext } from "react";
import { createOrder } from "../../services/firebase";
import { useCartContext } from "../../storage/cartContext";
import { userContext } from "../../storage/userContext";

function CartContainer(){
    const [orderId, setOrderId] = useState();
    const { cart,setCart, getTotalPriceInCart, removeItem, clear, productAdd, productSubstract} = useCartContext();
    const {user, logedin} = useContext(userContext);

    function handleCheckout() {
        if(logedin){
            const items = cart.map(({ id, price, title, count }) => ({
                id,
                price,
                title,
                count,
            }));      

            const order = {
                buyer: {
                    name: user,
                },
                items: items, // id, title, price, count
                total: getTotalPriceInCart(),
                date: new Date(),
            };
            async function sendOrder() {
                let id = await createOrder(order);
                setOrderId(id);
            }
            sendOrder();
        }else{
            alert("Please, login to finalize the purchase");
        }
    }

    if(orderId){ 
        let totalPrice = getTotalPriceInCart();
        let newCart = [];
        setCart(newCart);
        localStorage.setItem("cart", JSON.stringify(newCart)); 
        return (
            <div className="container mt-5">
                <h1>Thanks for your purchase</h1>
                <p className="fw-semibold fs-5">Date of your purchase:</p>
                <p><b>Purchase ID:</b> {orderId}</p>
                <p><b>Name: </b>{user}</p>
                <p><b>Total Price:</b> ${totalPrice}</p>
            </div>
        );
    }

    return (
        <div className="container mt-5 cart-container">
            <div className="table-responsive">
                <table className="table table-striped table-hover border-primary">
                    <thead className="text-center justify-content-center">
                        <tr className="table"><td colSpan="6" className="fs-4 fw-bold">Your Cart</td></tr>
                        <tr className="table" style={{background: "rgb(37, 200, 229)"}}>
                            <th scope="col">Product</th>
                            <th scope="col"></th>
                            <th scope="col">Amount</th>
                            <th scope="col">Delete Product</th>
                            <th scope="col">Subtotal</th>
                        </tr>
                    </thead>
                        <tbody className="text-center align-middle table-secondary">
                            {cart.length ? (
                                cart.map((item) =>(
                                    <tr key={item.id}>
                                        <td>{item.detail[0].toUpperCase() + item.detail.substring(1)}</td>
                                        <td> <img src={item.img} alt={item.title} className="img-fluid" width="75px" style={{minWidth: "40px"}} /> </td>
                                        <td width="150px">
                                            <button className="btn btn-danger btn-sm mx-2" onClick={()=>{productSubstract(item)}}>-</button>
                                            <h5 className="d-inline-block">{item.count}</h5>
                                            <button className="btn btn-primary btn-sm mx-2" onClick={()=>{productAdd(item)}}>+</button>
                                        </td>
                                        <td><button className="btn btn-danger btn-sm" onClick={()=>{removeItem(item.id)}}>x</button></td>
                                        <td><b>${item.price * item.count}</b></td>
                                    </tr>
                                ))
                            ):( 
                                <tr><td colSpan="5" className="fw-bold fs-4 fs-semibold">Your cart is empty</td></tr>
                            )}
                            <tr className="text-end fs-5"><td colSpan="6"><b>Price Total: ${getTotalPriceInCart()}</b></td></tr>
                        </tbody>
                </table>
                {cart.length ? (
                    <div className="text-end">
                        <button className="btn btn-danger btn-lg mx-5" onClick={()=>{clear()}}>Empty Cart</button>
                        <button className="btn btn-success btn-lg" onClick={handleCheckout}>Finalize Purchase</button>
                    </div>
                ):(<></>)}
            </div>
        </div>
    );
}

export default CartContainer;