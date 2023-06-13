import "./Item.css";
import { Link } from "react-router-dom";

const Item = ({ id, nombre, precio, img, stock }) => {
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
            <Link to={`/item/${id}`} className="btn btn-main w-100 ">
            <i className="bi-cart-fill me-1" />

              ADD
            </Link>
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
