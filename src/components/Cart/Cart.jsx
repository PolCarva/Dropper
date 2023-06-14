import { CarritoContext } from "../../context/CarritoContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const { carrito, vaciarCarrito, total, cantidadTotal } =
    useContext(CarritoContext);

  const handleClearCart = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-main)",
      cancelButtonColor: "#d33",
      confirmButtonText: "Clear cart",
    }).then((result) => {
      if (result.isConfirmed) {
        vaciarCarrito();
      }
    });
  };
  if (cantidadTotal === 0) {
    return (
      <div className="centered d-flex flex-column text-center">
        <h2 className="mb-4">Your cart is empty</h2>
        <Link to="/" className="btn btn-main col-md-6 col-11 m-auto">
          See Products
        </Link>
      </div>
    );
  }
  return (
    <div className="col-11 m-top m-auto">
      {carrito.map((producto) => (
        <CartItem key={producto.item.id} {...producto} />
      ))}
      <div className="col-11 col-md-6 m-auto text-center mt-4">
        <h3>Total Price: ${total.toFixed(2)}</h3>
        <h3 className="mb-4">Total Items: {cantidadTotal}</h3>
        <button
          onClick={() => handleClearCart()}
          className="btn outlined col-md-4 col-11 me-1 mb-0 mb-md-5 text-danger"
        >
          {" "}
          Clear Cart{" "}
        </button>
        <Link
          to="/checkout"
          className="btn btn-main col-11 mt-3 mt-md-0 col-md-6 p-md-4 pt-md-2 pb-md-2 mb-5"
        >
          {" "}
          Go Checkout{" "}
        </Link>
      </div>
    </div>
  );
};

export default Cart;
