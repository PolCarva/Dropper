import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";

const ItemDetail = ({ id, nombre, precio, img, stock, desc }) => {
  stock < 0 || isNaN(stock) ? (stock = 0) : (stock = stock);
  const [agregarCantidad, setAgregarCantidad] = useState(0);

  const { agregarProducto } = useContext(CarritoContext);

  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);

    const item = { id, nombre, precio, img, stock };

    // Controla el stock antes de agregar el producto al carrito
    if (cantidad > stock) {
      Swal.fire({
        icon: "info",
        title: "Not Enough Stock",
        text: `Only ${item.stock} units of this product are available. Adding ${item.stock} to your cart.`,
        timer: 3000,
        timerProgressBar: true,
      });
      agregarProducto(item, stock);
      return;
    }

    agregarProducto(item, cantidad);
  };

  return nombre ? (
    <section className="detailContainer col-11 m-auto align-items-center m-top">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top img-detail mb-5 mb-md-0"
              src={img}
              alt={nombre}
            />
          </div>
          <div className="col-md-6 mb-5">
            <div className="small mb-1 text-body-tertiary">Item Id: {id}</div>
            <h1 className="display-5 fw-bolder">{nombre}</h1>
            <div className="fs-5 mb-5">
              <span className="price">$ {precio}</span>
            </div>
            <p className="lead">{desc}</p>
            {agregarCantidad > 0 ? (
              <>
                <Link
                  to="/"
                  className="btn outlined-btn  col-11 col-md-5 m-md-auto mt-3"
                >
                  CONTINUE
                </Link>
                <Link
                  to={"/cart"}
                  className="btn btn-main col-11 col-md-5 ms-md-1 mt-3 mt-md-0"
                >
                  FINISH
                </Link>
              </>
            ) : (
              <ItemCount stock={stock} agregarProducto={manejadorCantidad} />
            )}
          </div>
        </div>
      </div>
    </section>
  ) : (
    <div className="centered text-center">
      <h2 className="">Item Not Found</h2>
      <br />
      <Link
        to={"/"}
        className="btn btn-main col-11"
      >Home</Link>
    </div>
  );
};

export default ItemDetail;
