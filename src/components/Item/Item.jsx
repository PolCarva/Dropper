import "./Item.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";

const Item = ({ id, nombre, precio, img, stock }) => {
  const navigate = useNavigate();
  const { agregarProducto } = useContext(CarritoContext);

  const handleAddToCart = () => {
    const item = { id, nombre, precio, img, stock };
    agregarProducto(item, 1); // Agrega el producto al carrito con una cantidad de 1.
    navigate("/cart");
  };

  return (
    <div className="card item p-0">
      <img src={img} className="card-img-top card-img-grid" alt={nombre} />
      <div className="card-body">
        <div className="row">
          <h5 className="card-title col-6">{nombre}</h5>
          <span className="stock col-6 text-end">Stock: {stock}</span>
        </div>

        <p className="card-text">$ {precio}</p>
        <div className="buttons row">
          <div className="col-12 col-md-6">
            <button onClick={handleAddToCart} className="btn btn-main w-100 ">
              <i className="bi-cart-fill me-1" />
              ADD
            </button>
          </div>
          <div className="col-12 col-md-6 mt-2 mt-md-0">
            <Link to={`/item/${id}`} className="btn outlined-btn w-100">
              INFO
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Item;
