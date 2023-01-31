import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import "./itemlist.css";

function Item(props) {

    const {title, price, img, detail, id, discount, stock} = props.item;

    return(
        <div className='col'>
            <div className="card card-item" style={{minHeight: "490px"}}>
                <img className="img-fluid p-2" src={img} alt={title}/>
                <div className='card-body'>
                    <h5 className='card-title'>{detail[0].toUpperCase() + detail.substring(1)}</h5>
                    {stock <= 5 && <h5 className="text-danger">Last ones Available!!</h5>}
                    {discount ? <h5 className='text-success'> Discount: { discount }%</h5> : "" }
                    <p className='card-text text-success fw-semibold fs-4'>${price}</p>
                    <Link to={`/detail/${id}`}>
                        <Button>See More</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Item;