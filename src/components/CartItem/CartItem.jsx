import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, cantidad }) => {
  const { eliminarProducto } = useContext(CarritoContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [animating, setAnimating] = useState(false);

  const handleDelete = () => {
    if (confirmDelete) {
      setAnimating(true);
      setTimeout(() => {
        eliminarProducto(item.id);
        setAnimating(false);
      }, 500); // Eliminar el producto después de 0.5 segundos
    } else {
      setConfirmDelete(true);
      setTimeout(() => {
        if (!confirmDelete) {
          setConfirmDelete(false); // Restablecer a false si no se confirma en 3 segundos
        }
      }, 3000); // 3 segundos
    }
  };

  return (
    <div
      className={`card mb-3 m-auto ${animating ? "animating" : ""}`}
      style={{ maxWidth: 540 }}
      key={item.id}
    >
      <div className="d-flex align-items-center">
        <div className="col-3">
          <img
            src={item.img}
            className="img-fluid rounded-start"
            style={{ maxHeight: "120px" }}
            alt={item.nombre}
          />
        </div>
        <div className="col-md-8">
          <div className="card-body col-8">
            <Link to={`/item/${item.id}`} className="card-title h5">
              {item.nombre}
            </Link>
            <p className="card-text">
              x{cantidad}
              <small className="text-body-secondary"> $ {item.precio}</small>
            </p>
            <button
              className={`text-danger btn p-3 position-absolute bottom-0 end-0 ${
                confirmDelete ? "confirm-delete btn-link" : ""
              }`}
              onClick={handleDelete}
            >
              {confirmDelete ? "Confirm" : <i class="bi bi-trash-fill"></i>}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
