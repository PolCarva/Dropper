import "./ItemDetail.css";
import ItemCount from "../ItemCount/ItemCount";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { CarritoContext } from "../../context/CarritoContext";

const ItemDetail = ({ id, nombre, precio, img, stock }) => {
  const [agregarCantidad, setAgregarCantidad] = useState(0);

  const { agregarProducto } = useContext(CarritoContext);

  const manejadorCantidad = (cantidad) => {
    setAgregarCantidad(cantidad);
    const item = { id, nombre, precio };
    agregarProducto(item, cantidad);
    console.log(cantidad);
  };

  return (
    <section className="detailContainer col-11 m-auto align-items-center">
      <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 align-items-center">
          <div className="col-md-6">
            <img
              className="card-img-top img-detail mb-5 mb-md-0"
              src={img}
              alt={nombre}
            />
          </div>
          <div className="col-md-6">
            <div className="small mb-1 text-body-tertiary">Item Id: {id}</div>
            <h1 className="display-5 fw-bolder">{nombre}</h1>
            <div className="fs-5 mb-5">
              <span className="price">$ {precio}</span>
            </div>
            <p className="lead">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Praesentium at dolorem quidem modi. Nam sequi consequatur
              obcaecati excepturi alias magni, accusamus eius blanditiis
              delectus ipsam minima ea iste laborum vero?
            </p>
            {agregarCantidad > 0 ? (
              <Link to={"/cart"} className="btn btn-main">
                Finish Buying
              </Link>
            ) : (
              <ItemCount stock={stock} agregarProducto={manejadorCantidad} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItemDetail;
