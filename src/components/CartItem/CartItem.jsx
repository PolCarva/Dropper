import { useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import "./CartItem.css";
const CartItem = ({ item, cantidad }) => {
  const { eliminarProducto } = useContext(CarritoContext);
  return (
    <div className="card mb-3 m-auto" style={{ maxWidth: 540 }} key={item.id}>
      <div className="row g-0">
        <div className="col-md-4">
          <img src={item.img} className="img-fluid rounded-start" alt={item.nombre} />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h5 className="card-title">{item.nombre}</h5>
            <p className="card-text">
              x{cantidad}
              <small className="text-body-secondary ">
                 $ {item.precio}
              </small>
            </p>
            <button onClick={() => eliminarProducto(item.id)}>Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};
{
  /* <div>
      <h4>{item.nombre}</h4>
      <p>Cantidad: {cantidad}</p>
      <p>Precio: {item.precio}</p>
      <button onClick={() => eliminarProducto(item.id)}>
        Eliminar Producto
      </button>
    </div> */
}
export default CartItem;
