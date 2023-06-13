import { CarritoContext } from "../../context/CarritoContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const { carrito, vaciarCarrito, total, cantidadTotal } =
    useContext(CarritoContext);

  if (cantidadTotal === 0) {
    return (
      <div className="centered">
        <h2>No hay productos en el carrito</h2>
        <Link to="/">Ver Productos</Link>
      </div>
    );
  }
  return (
    <div className="col-11 m-auto centered">
      {carrito.map((producto) => (
        <CartItem key={producto.id} {...producto} />
      ))}
      <div className="col-6 m-auto text-center">
        <h3>Total Price: ${total.toFixed(2)}</h3>
        <h3>Total Items: {cantidadTotal}</h3>
        <button
          onClick={() => vaciarCarrito()}
          className="btn outlined col-4 me-1"
        >
          {" "}
          Clear Cart{" "}
        </button>
        <Link to="/checkout" className="btn btn-main col-5 ms-1">
          {" "}
          Go Checkout{" "}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
