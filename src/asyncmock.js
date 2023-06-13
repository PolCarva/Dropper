const productos = [
  {
    nombre: "Dropper White Tee",
    precio: 18.99,
    id: "remera4",
    img: "/img/remera4.png",
    idCat: "shirts",
    stock: 14,
  },
  {
    nombre: "Way Too High Tee",
    precio: 24.99,
    id: "remera3",
    img: "/img/remera3.jpg",
    idCat: "shirts",
    stock: 7,
  },
  {
    nombre: "Dropped Angel",
    precio: 39.99,
    id: "hoodie3",
    img: "/img/hoodie3.png",
    idCat: "hoodies",
    stock: 12,
  },
  {
    nombre: "Fallen Short",
    precio: 28.99,
    id: "short1",
    img: "/img/short1.png",
    idCat: "shorts",
    stock: 3,
  },
  {
    nombre: "Falling Hoodie",
    precio: 59.99,
    id: "hoodie2",
    img: "/img/hoodie2.png",
    idCat: "hoodies",
    stock: 5,
  },
  {
    nombre: "PsycoDrop Hoodie",
    precio: 59.99,
    id: "hoodie1",
    img: "/img/hoodie1.png",
    idCat: "hoodies",
    stock: 4,
  },
];

export const getProductos = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productos);
    }, 1000);
  });
};

export const getUnProducto = (id) => {
  return new Promise((resolve) => {
    const producto = productos.find((prod) => prod.id === id);
    resolve(producto);
  }, 1000);
};

export const getProductosPorCategoria = (idCategoria) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const productosCategoria = productos.filter(
        (prod) => prod.idCat === idCategoria
      );
      resolve(productosCategoria);
    }, 1000);
  });
};
