import React from "react";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
    const navigate = useNavigate();

    setTimeout(
        () => {
            navigate("/home")
        }, 2000
    )
    
    return (
        <div className="container mt-5 text-center">
            <h1 className="fs-1">Page not Found</h1>
            <small className="fw-semibold fs-3 mt-3">You will be redirected to the homePage...</small>
        </div>
    );
}

export default PageNotFound;