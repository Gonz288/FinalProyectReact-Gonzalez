import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css";
import './App.css';
import NavBar from './components/NavBar/NavBar';
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import HomePage from "./pages/HomePage";
import PageNotFound from "./pages/PageNotFound";
import { CartProvider } from "./storage/cartContext";
import CartContainer from "./components/CartContainer/CartContainer";
import Footer from "./components/Footer/Footer";
import {UserProvider } from "./storage/userContext";

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
        <CartProvider>
          <NavBar/>
          <Routes>
            <Route path="/home" element={<HomePage/>}/>
            <Route path="/category/:categoryId" element={<ItemListContainer/>}/>
            <Route path="/detail/:itemid" element={<ItemDetailContainer/>}/>
            <Route path="/cart" element={<CartContainer/>}/>
            <Route path="*" element={<PageNotFound/>}/>
          </Routes>
        </CartProvider>
        <Footer></Footer>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
