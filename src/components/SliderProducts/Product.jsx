import { Link } from "react-router-dom";
import "./sliderproducts.css";

function Product(props) {
    const {title, price, img, detail, id, discount, stock} = props.item;
    return (
        <div className="card card-slider"style={{minHeight: "475px"}}>
            <picture>
                <img src={img} alt={title} className="img-fluid p-3 card-slider-img"/>
            </picture>
            <div className="card-body">
                <h5 className='card-title'>{detail[0].toUpperCase() + detail.substring(1)}</h5>
                {stock <= 5 && <h5 className="text-danger">Last ones Available!!</h5>}
                {discount ? <h5 className='text-success'> Discount: { discount }%</h5> : "" }
                <p className='card-text text-success fw-semibold fs-4'>${price}</p>
                <Link to={`/detail/${id}`}>
                    <button type="button" className="btn btn-see-more fw-semibold text-black">See More</button>
                </Link>
            </div>
        </div>
    );
}

export default Product;