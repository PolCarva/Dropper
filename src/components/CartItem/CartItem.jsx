import { useState, useEffect, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import "./CartItem.css";
import { Link } from "react-router-dom";

const CartItem = ({ item, cantidad }) => {
  const { eliminarProducto } = useContext(CarritoContext);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleteQuantity, setDeleteQuantity] = useState(1);
  const [animating, setAnimating] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(Date.now());

  useEffect(() => {
    const timer = setTimeout(() => {
      if (Date.now() - lastUpdate >= 5000) {
        setConfirmDelete(false);
      }
    }, 5000);
    return () => clearTimeout(timer); // cleanup on unmount
  }, [lastUpdate]);

  const handleClickDelete = () => {
    setConfirmDelete(true);
    setLastUpdate(Date.now());
  };

  const handleConfirmDelete = (event) => {
    event.stopPropagation(); // Stop the click event from propagating to the delete button

    if (deleteQuantity === cantidad) {
      setAnimating(true);
      setTimeout(() => {
        eliminarProducto(item.id, deleteQuantity);
        setDeleteQuantity(1); // Reset delete quantity
        setConfirmDelete(false); // Close confirm box
        setAnimating(false);
      }, 500);
    } else {
      eliminarProducto(item.id, deleteQuantity);
      setDeleteQuantity(1); // Reset delete quantity
      setConfirmDelete(false); // Close confirm box
    }
  };

  const incrementDeleteQuantity = () => {
    if (deleteQuantity < cantidad) {
      setDeleteQuantity(deleteQuantity + 1);
      setLastUpdate(Date.now());
    }
  };

  const decrementDeleteQuantity = () => {
    if (deleteQuantity > 1) {
      setDeleteQuantity(deleteQuantity - 1);
      setLastUpdate(Date.now());
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
            <span
              className={`text-danger p-3 position-absolute bottom-0 end-0`}
              onClick={handleClickDelete}
            >
              {confirmDelete ? (
                <div className="d-flex flex-column">
                  <div className="deleteCounter mb-2">
                    <button className="btn" onClick={decrementDeleteQuantity}>
                      -
                    </button>
                    <span className="fw-bold">{deleteQuantity}</span>
                    <button className="btn" onClick={incrementDeleteQuantity}>
                      +
                    </button>
                  </div>
                  <span
                    className="confirm-delete cursor-pointer btn-link"
                    onClick={handleConfirmDelete}
                  >
                    Confirm
                  </span>
                </div>
              ) : (
                <i className="bi bi-trash-fill cursor-pointer"></i>
              )}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
