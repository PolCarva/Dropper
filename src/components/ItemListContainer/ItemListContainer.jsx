import { useState, useEffect } from "react";
import ItemList from "../ItemList/ItemList";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "../../services/config";
import StockReloader from "../StockReloader/StockReloader";

const ItemListContainer = () => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { idCategoria } = useParams();

  const getProductos = () => {
    const misProductos = idCategoria
      ? query(collection(db, "productos"), where("idCat", "==", idCategoria))
      : collection(db, "productos");

    setIsLoading(true);

    getDocs(misProductos)
      .then((res) => {
        const nuevosProductos = res.docs.map((doc) => {
          let data = doc.data();
          isNaN(data.stock) || data.stock < 0
            ? (data.stock = 0)
            : (data.stock = data.stock);
          return { id: doc.id, ...data };
        });
        setProductos(nuevosProductos);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProductos();
  }, [idCategoria]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <ItemList productos={productos} /> <StockReloader onReload={getProductos} />
        </>
      )}
    </>
  );
};

export default ItemListContainer;