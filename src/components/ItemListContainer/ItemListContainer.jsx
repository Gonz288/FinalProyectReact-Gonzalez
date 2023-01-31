import { useState, useEffect } from "react";
import Item from "./Item";
import { getProducts } from "../../services/firebase";
import { getProductsByCategory } from "../../services/firebase";
import { useParams } from "react-router-dom";

function ItemListContainer(){
    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    let {categoryId} = useParams();

    useEffect(() => {
        if(!categoryId){
            getProducts()
            .then((response) => {setProducts(response);})
            .catch((error) => alert(error))
            .finally(() => setIsLoading(false)) 
        }
        else{
            getProductsByCategory(categoryId)
            .then((response) => {setProducts(response);})
            .finally(() => setIsLoading(false)) 
        }
    }, [categoryId]);

    return (
        <>
        {isLoading ?(
            <h4>Loading...</h4>
        ):(
            <>
                <div className="div-category mt-5 mb-5">
                    <h1 className="text-center">{categoryId[0].toUpperCase() + categoryId.substring(1)} Section</h1>
                </div>
                <div className="container-lg container-itemlist">
                    <div className="row row-cols-1 row-cols-lg-4 row-cols-md-3 row-cols-sm-2 g-4">
                        {products.map((item) => {
                            return <Item id={item.id} key={item.id} item={item}/>;
                        })}
                    </div>
                </div>
            </>
            )}
        </>
    );
}

export default ItemListContainer;