/* eslint-disable jsx-a11y/anchor-is-valid */
import { Link } from "react-router-dom";
import "./footer.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faShirt, faHeadphones, faHamburger, faArrowRight} from "@fortawesome/free-solid-svg-icons";
function Footer(){
    return (
        <>
            <footer className="footer">
                <div className="container">
                    <div className="text-black">
                        <ul className="nav justify-content-end">
                            <li className="nav-item me-auto fs-5 fw-bold">Social Medias:</li>
                            <li className="nav-item mx-4">
                                <i className="bi bi-facebook fs-5"></i>
                            </li>
                            <li className="nav-item mx-4 fs-5">
                                <i className="bi bi-whatsapp fs-5" ></i>
                            </li>
                            <li className="nav-item mx-4">
                                <i className="bi bi-instagram fs-5"></i>
                            </li>
                            <li className="nav-item mx-4">
                                <i className="bi bi-twitter fs-5"></i>
                            </li>
                        </ul>
                        <hr className="border border-dark border-1 opacity-50"/>
                    </div>
                    <div className="row py-3">
                        <div className="col-lg-8">
                            <div className="contact-form">
                                <h4 className="text-black d-flex justify-content-center mb-4">Contact:</h4>
                                <div className="row mb-3">
                                    <div className="col">
                                        <label htmlFor="LastName" className="form-label fw-semibold mx-1">Full Name</label>
                                        <input type="text" className="form-control" name="lastname" placeholder="Full Name"/>
                                    </div>
                                    <div className="col">
                                        <label htmlFor="Email" className="form-label fw-semibold mx-1">Email</label>
                                        <input type="email" className="form-control" name="email" placeholder="example@gmail.com"/>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="exampleFormControlTextarea1" className="form-label fw-semibold mx-1">Message</label>
                                    <textarea className="form-control" id="message" rows="2" name="message" placeholder="Your Message"></textarea>
                                </div>
                                <button type="submit" className="btn btn-dark" name="submit">Send</button>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <h4 className="text-black d-flex justify-content-center mb-5">Categories:</h4>
                            <nav className="nav flex-column text-center">
                                <li className="nav-item">
                                    <Link to="/category/clothing" className="nav-link text-dark fs-5 fw-semibold mb-2"><FontAwesomeIcon icon={faArrowRight}/> <FontAwesomeIcon icon={faShirt}/> Clothing</Link>
                                </li>
                                <Link to="/category/technology" className="nav-link text-dark fs-5 fw-semibold mb-2"><FontAwesomeIcon icon={faArrowRight}/> <FontAwesomeIcon icon={faHeadphones}/> Technology</Link>
                                <Link to="/category/supermarket" className="nav-link text-dark fs-5 fw-semibold"><FontAwesomeIcon icon={faArrowRight}/> <FontAwesomeIcon icon={faHamburger}/> SuperMarket</Link>
                            </nav>
                        </div>
                    </div>
                </div>
            </footer>
            <div className='text-center text-white copy py-1'>
                © 2023 Copyright: E-commerce
            </div>
        </>
    );

}
export default Footer