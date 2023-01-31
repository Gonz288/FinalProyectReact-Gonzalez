import { useEffect } from "react";
import { useState } from "react";
import { getProductByKeyword } from "../../services/firebase";
import Asd from "./Asd";

function Search(){
    const [products, setProducts] = useState([]);
    let [keyword, setKeyword] = useState(null);

    const inputSearch = document.getElementById("input-search");

    if(inputSearch){
        inputSearch.addEventListener("keyup", () =>{
            keyword = inputSearch.value
            let keywordUpperCase = keyword.toLowerCase();
            setKeyword(keywordUpperCase);
        });
    }

    useEffect(() => {
        getProductByKeyword(keyword).then((response) => {setProducts(response)});
    }, [keyword]);

    return (
        <ul className="list-group">
            {keyword !== "" && products.length ? (
                products.map((item) => {
                    return <Asd id={item.id} key={item.id} item={item}/>;
                })):(
                    <li className="list-group-item">No products Found</li>
            )}
        </ul>
    );

}

export default Search;