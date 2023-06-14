import "./ItemList.css";

import Item from "../Item/Item";

const ItemList = ({ productos }) => {
  productos.map((p) =>
    p.stock === NaN || p.stock < 0 ? (p.stock = 0) : (p.stock = p.stock)
  );
  const compararStock = (a, b) => {
    if (a.stock === 0 && b.stock !== 0) {
      return 1; // a va al final
    }
    if (a.stock !== 0 && b.stock === 0) {
      return -1; // a va al principio
    }
    return 0; // no se cambia el orden
  };
  return (
    <div className="contenedorProductos row">
      {productos.sort(compararStock).map((prod) => (
        <Item key={prod.id} {...prod} className="cardProducto" />
      ))}
    </div>
  );
};

export default ItemList;
