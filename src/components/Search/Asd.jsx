import {Link} from "react-router-dom";
function Asd(props) {
    const {title,img,id} = props.item;
    return(
        <>
            <Link to={`/detail/${id}`}>
                <li className="list-group-item">
                    <img src={img} alt={title} height="40px"/>
                    <span className="mx-2">{title[0].toUpperCase() + title.substring(1)}</span>
                </li>
            </Link>
        </>
    );
}

export default Asd;