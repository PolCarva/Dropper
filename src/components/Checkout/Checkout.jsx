import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { db } from "../../services/config";
import { collection, addDoc } from "firebase/firestore";
import "./Checkout.css";

const Checkout = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const { total } = useContext(CarritoContext);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");
  const [ordenId, setOrdenId] = useState("");

  const formHandler = (e) => {
    e.preventDefault();
    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Please, complete all fields");
      return;
    }

    if (email !== emailConfirmacion) {
      setError("Emails do not match");
      return;
    }

    const orden = {
      items: carrito.map((prod) => ({
        id: prod.item.id,
        nombre: prod.item.nombre,
        cantidad: prod.cantidad,
      })),
      total: carrito.reduce(
        (total, prod) => total + prod.item.precio * prod.cantidad,
        0
      ),
      nombre,
      apellido,
      telefono,
      email,
    };

    addDoc(collection(db, "ordenes"), orden)
      .then((docRef) => {
        setOrdenId(docRef.id);
        vaciarCarrito();
      })
      .catch((err) => {
        setError("Error creating order");
        console.error(err);
      });
  };

  return (
    <div className="centered">
      <h2>Checkout</h2>
      <div className="items-list">
        {carrito.map((producto) => (
          <div key={producto.item.id} className="form-group">
            <p>
              {producto.item.nombre} x {producto.cantidad}
            </p>
            <p>Unity Price: $ {producto.item.precio}</p>
            <hr />
          </div>
        ))}
      </div>
      <p>Total: $ {total}</p>
      <form onSubmit={formHandler} className="formulario">
        <div>
          <label htmlFor="">Nombre</label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => {
              setNombre(e.target.value);
            }}
          />

          <label htmlFor="">Apellido</label>
          <input
            type="text"
            value={apellido}
            onChange={(e) => {
              setApellido(e.target.value);
            }}
          />

          <label htmlFor="">Telefono</label>
          <input
            type="text"
            value={telefono}
            onChange={(e) => {
              setTelefono(e.target.value);
            }}
          />

          <label htmlFor="">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />

          <label htmlFor="">Confirmar Email</label>
          <input
            type="email"
            value={emailConfirmacion}
            onChange={(e) => {
              setEmailConfirmacion(e.target.value);
            }}
          />
        </div>
        {error && <p className="text-danger">{error}</p>}
        <button type="submit">Checkout</button>
      </form>
      {ordenId && <strong>Thank you! Your Order Is: {ordenId}</strong>}
    </div>
  );
};

export default Checkout;
