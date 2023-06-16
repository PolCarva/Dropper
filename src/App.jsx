import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import ItemDetailContainer from "./components/ItemDetailContainer/ItemDetailContainer";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CarritoProvider } from "./context/CarritoContext";
import Cart from "./components/Cart/Cart";
import Checkout from "./components/Checkout/Checkout";
import { Link } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <CarritoProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route
              path="/categoria/:idCategoria"
              element={<ItemListContainer />}
            />
            <Route path="/item/:idItem" element={<ItemDetailContainer />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route
              path="*"
              element={
                <div className="centered text-center">
                  <h1>
                    <span className="fw-bold fontLarge">404</span>
                    <br /> Page Not Found
                  </h1>
                  <br />
                  <Link to={"/"} className="btn btn-main col-11">
                    Home
                  </Link>
                </div>
              }
            />
          </Routes>
        </CarritoProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
