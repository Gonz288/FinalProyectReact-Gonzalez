import "./itemcount.css";
import {useState} from "react";

function ItemCount({onAddToCart,stock}){
    const [count, setCount] = useState(1);

    function handleAdd(){
        if(count <= stock){
            setCount(count + 1);
        }
    }
    function handleSubstract(){
        setCount(count - 1);
    }
    
    return(
        <div>
            <button className="btn-addToCart" onClick={()=>onAddToCart(count)}>Add to Cart</button>
            <h5 className="d-inline-block">Amount:</h5>
            <button className="btn-substract" disabled={count === 1} onClick={handleSubstract}><i className="bi bi-dash"></i></button><h4>{count}</h4><button className="btn-add" onClick={handleAdd}><i className="bi bi-plus"></i></button>
        </div>
    );
}

export default ItemCount;