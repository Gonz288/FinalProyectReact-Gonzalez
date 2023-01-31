import React from "react";
import SliderProducts from "../components/SliderProducts/SliderProducts";
function HomePage(){
    return(
        <div className="container-xxl my-4">
            <SliderProducts categoryId="technology"/>
            <SliderProducts categoryId="clothing"/>
            <SliderProducts categoryId="supermarket"/>
        </div>
    )
}

export default HomePage;