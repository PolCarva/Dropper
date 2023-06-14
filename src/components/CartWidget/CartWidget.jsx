import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import "./CartWidget.css";

const CartWidget = () => {
  const { cantidadTotal } = useContext(CarritoContext);
  const [animationClass, setAnimationClass] = useState("");

  useEffect(() => {
    if (cantidadTotal !== 0) {
      setAnimationClass("animate-cart");
      setTimeout(() => {
        setAnimationClass("");
      }, 3000);
    }
  }, [cantidadTotal]);

  return (
    <Link to={"/cart"} className={`cartWidget-container ${animationClass}`}>
      <i className="bi-cart-fill me-1 fs-1 carro" />
      <strong className="carritoCount"> {cantidadTotal} </strong>
    </Link>
  );
};

export default CartWidget;
