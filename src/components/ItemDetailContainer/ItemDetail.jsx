import React from "react";
import ItemCount from "../ItemCount/ItemCount";
import "./itemdetail.css";
import { Link } from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCartArrowDown} from "@fortawesome/free-solid-svg-icons";

function ItemDetail({title,detail,img,price,isInCart,stockUpdated,onAddToCart}){
    return (
        <div className="container container-itemDetail">
            <div className="card">
                <div className="row">
                    <div className="col-sm-5 p-lg-5 p-sm-3 p-4">
                        <img className='img-fluid' src={img} alt={title}/>
                    </div>
                    <div className="col-sm-7 p-lg-5 p-sm-3 p-4">
                        <h3 className='card-title'>{detail}</h3>
                        <p className='card-text text-price'>${price}</p>
                        <hr/>
                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate facere praesentium nisi ea tenetur quasi repellat? Facere rerum id beatae reprehenderit quia similique doloremque dolores consequuntur suscipit. Commodi, sequi provident!</p>
                        <ItemCount stock={stockUpdated} onAddToCart={onAddToCart}/>
                        {isInCart ? (
                            <Link to="/cart"><button className="btn btn-info mx-2 mt-3"><FontAwesomeIcon icon={faCartArrowDown}></FontAwesomeIcon> Go to the Cart</button></Link>
                        ):(<p></p>)}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail;