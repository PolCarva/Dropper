import "./Item.css";
import { Link } from "react-router-dom";
import { useContext, useState, useEffect } from "react";
import { CarritoContext } from "../../context/CarritoContext";

const Item = ({ id, nombre, precio, img, stock }) => {
  const { agregarProducto } = useContext(CarritoContext);
  const [cantidad, setCantidad] = useState(1);
  const [pendingAddToCart, setPendingAddToCart] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (pendingAddToCart) {
      let timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress >= 100) {
            clearInterval(timer);
            return oldProgress;
          }
          return Math.min(100, oldProgress + 1);
        });
      }, 30);
      return () => clearInterval(timer);
    }
  }, [pendingAddToCart]);

  useEffect(() => {
    if (progress === 100) {
      handleAddToCart();
      setProgress(0);
    }
  }, [progress]);

  useEffect(() => {
    setProgress(0);
  }, [cantidad]);

  const handleAddToCart = () => {
    const item = { id, nombre, precio, img, stock };
    agregarProducto(item, cantidad);
    setCantidad(1);
    setPendingAddToCart(false);
  };

  const handleShowCounter = () => {
    setPendingAddToCart(true);
  };

  const handleIncrement = () => {
    if (cantidad < stock) {
      setCantidad(cantidad + 1);
    }
  };

  const handleDecrement = () => {
    if (cantidad > 1) {
      setCantidad(cantidad - 1);
    }
  };

  return (
    <div className={stock !== 0 ? "card item p-0" : "card item p-0 greyscale"}>
      <img src={img} className="card-img-top card-img-grid" alt={nombre} />
      <div className="card-body">
        <div className="row">
          <h5 className="card-title col-6">{nombre}</h5>
          <span className="stock col-6 text-end">Stock: {stock}</span>
        </div>
        <p className="card-text">$ {precio}</p>
        <div className="buttons row">
          {pendingAddToCart ? (
            <>
              <div className="col-12 d-flex justify-content-between">
                <button onClick={handleDecrement} className="btn btn-main w-33">
                  -
                </button>
                <span className="w-33 text-center">{cantidad}</span>
                <button onClick={handleIncrement} className="btn btn-main w-33">
                  +
                </button>
              </div>
              <div className="col-12">
                <div className="progress mt-2" style={{ height: "10px" }}>
                  <div
                    className="progress-bar bg-secondary"
                    role="progressbar"
                    style={{ width: `${progress * 2}%` }}
                    aria-valuenow={progress * 2}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="col-12 col-md-6 mt-3">
                <button
                  onClick={handleShowCounter}
                  className={
                    stock > 0 ? "btn btn-main w-100" : "btn w-100 disabled"
                  }
                >
                  <i className="bi-cart-fill me-1" />
                  ADD
                </button>
              </div>
              <div className="col-12 col-md-6 mt-3">
                <Link to={`/item/${id}`} className="btn outlined-btn w-100">
                  INFO
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Item;
