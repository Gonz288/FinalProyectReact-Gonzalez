import { getProductsByCategory } from "../../services/firebase";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import Product from "./Product";

function SliderProducts(props) {
    const [products, setProducts] = useState([]);
    const categoryId = props.categoryId;

    useEffect(() => {
        getProductsByCategory(categoryId).then((response) => {setProducts(response);})
    }, [categoryId]);

    const responsive = {
        superLargeDesktop:{
            breakpoint: {max: 4000, min:3000},
            items: 6
        },
        dekstop:{
            breakpoint: {max: 3000, min:1024},
            items: 5
        },
        laptop:{
            breakpoint: {max: 1024, min:768},
            items: 3
        },
        tablet:{
            breakpoint: {max: 768, min:464},
            items: 2
        },
        mobile:{
            breakpoint: {max: 464, min:0},
            items: 1
        },
    }

    return (
        <>
            <div className="row mt-5">
                <div className="col-6 mt-1">
                    <h3 className="title-carousel">{categoryId[0].toUpperCase() + categoryId.substring(1)}</h3>
                </div>
                <div className="col-6">
                    <Link to={`/category/${categoryId}`} className="nav-link text-end text-primary mt-3">See more Products</Link>
                </div>
            </div>
            <Carousel responsive={responsive}>
                {products.map((item) => {return <Product id={item.id} key={item.id} item={item}/>;})}
            </Carousel>
        </>
    );
}

export default SliderProducts;