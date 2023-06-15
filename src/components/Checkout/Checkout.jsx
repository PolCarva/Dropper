import { useState, useContext } from "react";
import { CarritoContext } from "../../context/CarritoContext";
import { db } from "../../services/config";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";
import "./Checkout.css";

const Checkout = () => {
  const { carrito, vaciarCarrito } = useContext(CarritoContext);
  const { total } = useContext(CarritoContext);

  const [loading, setLoading] = useState(false);

  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirmacion, setEmailConfirmacion] = useState("");
  const [error, setError] = useState("");

  const formHandler = (e) => {
    e.preventDefault();

    if (total === 0) {
      setError("Cart is empty");
      return;
    }

    if (!nombre || !apellido || !telefono || !email || !emailConfirmacion) {
      setError("Please, complete all fields");
      return;
    }

    if (email !== emailConfirmacion) {
      setError("Emails do not match");
      return;
    }
    setLoading(true);

    const fecha = new Date();
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
      fecha: fecha,
    };

    addDoc(collection(db, "ordenes"), orden)
      .then((docRef) => {
        setLoading(false);

        carrito.forEach((prod) => {
          const productRef = doc(db, "productos", prod.item.id);
          updateDoc(productRef, {
            stock: prod.item.stock - prod.cantidad,
          });
        });

        vaciarCarrito();
        showModal(docRef);
      })
      .catch((err) => {
        setError("Error creating order");
        console.error(err);
        Swal.fire({
          title: "Error creating order",
          icon: "error",
        });
      });
  };
  const showModal = (docRef) => {
    const fecha = new Date();

    Swal.fire({
      title: "Thank You!",
      html: `Your order Id is: <br> <strong> ${docRef.id}</strong><br><small>${fecha.toDateString()}</small>`,
      icon: "success",
      confirmButtonText: '<a class="btn text-white" href="/"> Back to Home</a>',
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
  };

  return (
    <div className="m-top col-11 col-md-5 m-auto">
      <h2>Checkout:</h2>
      <div className="items-list text-center">
        <hr />
        {carrito.map((producto) => (
          <div key={producto.item.id}>
            <p>
              {producto.item.nombre} x {producto.cantidad}
            </p>
            <p>Unity Price: $ {producto.item.precio}</p>
            <hr />
          </div>
        ))}
      </div>
      <p className="text-center fw-bold">Total: $ {total.toFixed(2)}</p>
      <form onSubmit={formHandler} className="formulario pb-5">
        <div>
          <div className="mb-3">
            <label htmlFor="nombre">Name</label>
            <input
              type="text"
              id="nombre"
              className="form-control"
              value={nombre}
              onChange={(e) => {
                setNombre(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="apellido">Surname</label>
            <input
              type="text"
              id="apellido"
              value={apellido}
              className="form-control"
              onChange={(e) => {
                setApellido(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="telefono">Phone</label>
            <input
              type="text"
              id="telefono"
              className="form-control"
              value={telefono}
              onChange={(e) => {
                setTelefono(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              className="form-control"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="emailConfirmacion">Confirm Email</label>
            <input
              type="email"
              id="emailConfirmacion"
              value={emailConfirmacion}
              className="form-control"
              onChange={(e) => {
                setEmailConfirmacion(e.target.value);
              }}
            />
          </div>
        </div>
        {error && <p className="text-danger">{error}</p>}
        <div className="row">
          <button type="submit" className="btn-main btn col-6 m-auto">
            {loading ? (
              <div className="spinner-border spinner-border-sm" role="status"></div>
            ) : (
              "Checkout"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
