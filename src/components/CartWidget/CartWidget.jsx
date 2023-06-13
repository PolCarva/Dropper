import { Link } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import "./CartWidget.css";

const CartWidget = () => {
  const {cantidadTotal} = useContext(CarritoContext)
  return (
    <Link to={"/cart"} className="cartWidget-container">
      <i className="bi-cart-fill me-1 fs-1 carro" />
      <strong className="carritoCount"> {cantidadTotal} </strong>
    </Link>
  );
};

export default CartWidget;
