import "./ItemList.css";

import Item from "../Item/Item";

const ItemList = ({ productos }) => {
  return (
    <div className="contenedorProductos row">
      {productos.map((prod) => (
        <Item key={prod.id} {...prod} className="cardProducto"/>
      ))}
    </div>
  );
};

export default ItemList;
