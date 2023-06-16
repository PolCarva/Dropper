import { useState, createContext, useEffect } from "react";

export const CarritoContext = createContext({
  carrito: [],
  total: 0,
  cantidadTotal: 0,
});

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(
    JSON.parse(localStorage.getItem("carrito")) || []
  );
  const [total, setTotal] = useState(
    parseFloat(localStorage.getItem("total")) || 0
  );
  const [cantidadTotal, setCantidadTotal] = useState(
    parseInt(localStorage.getItem("cantidadTotal")) || 0
  );

  const agregarProducto = (item, cantidad) => {
    const productoExistente = carrito.find((prod) => prod.item.id === item.id);

    if (productoExistente) {
      // Si el producto ya está en el carrito, verifica si se puede añadir más
      if (productoExistente.cantidad + cantidad > item.stock) {
        const cantidadDisponible = item.stock - productoExistente.cantidad;
        if (cantidadDisponible > 0) {
          Swal.fire({
            title: "Not Enough Stock",
            text: `Only ${cantidadDisponible} more units of this product can be added. Adding ${cantidadDisponible} to your cart.`,
            timer: 2500,
            timerProgressBar: true,
          });
          agregarProducto(item, cantidadDisponible);
        } else {
          Swal.fire({
            title: "Not Stock",
            text: "You have reached the maximum quantity of this product.",
            timer: 2500,
            timerProgressBar: true,
          });
        }
        return;
      }

      const carritoActualizado = carrito.map((prod) => {
        if (prod.item.id === item.id) {
          return { ...prod, cantidad: prod.cantidad + cantidad };
        } else {
          return prod;
        }
      });
      setCarrito(carritoActualizado);
      setCantidadTotal((prev) => prev + cantidad);
      setTotal((prev) => prev + item.precio * cantidad);
    } else {
      // Si el producto no está en el carrito, verifica si hay stock suficiente
      if (cantidad > item.stock) {
        Swal.fire({
          title: "Not Enough Stock",
          text: `Only ${item.stock} units of this product are available. Adding ${item.stock} to your cart.`,
          timer: 2500,
          timerProgressBar: true,
        });
        agregarProducto(item, item.stock);
        return;
      }

      setCarrito((prev) => [...prev, { item, cantidad }]);
      setCantidadTotal((prev) => prev + cantidad);
      setTotal((prev) => prev + item.precio * cantidad);
    }
  };

  const eliminarProducto = (id) => {
    const productoEliminado = carrito.find((prod) => prod.item.id === id);
    const carritoActualizado = carrito.filter((prod) => prod.item.id !== id);
    setCarrito(carritoActualizado);
    setCantidadTotal((prev) => prev - productoEliminado.cantidad);
    setTotal(
      (prev) =>
        prev - productoEliminado.item.precio * productoEliminado.cantidad
    );
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    setCantidadTotal(0);
    setTotal(0);
  };

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
    localStorage.setItem("total", total.toString());
    localStorage.setItem("cantidadTotal", cantidadTotal.toString());
  }, [carrito, total, cantidadTotal]);

  return (
    <CarritoContext.Provider
      value={{
        carrito,
        agregarProducto,
        eliminarProducto,
        vaciarCarrito,
        total,
        cantidadTotal,
      }}
    >
      {children}
    </CarritoContext.Provider>
  );
};
