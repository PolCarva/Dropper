import { useState, useContext } from "react";
import { db } from "../../services/config";
import { getDocs, doc, collection, writeBatch } from "firebase/firestore";
import { CarritoContext } from "../../context/CarritoContext";
import "./StockReloader.css";

const StockReloader = ({ onReload }) => {
  const [loading, setLoading] = useState(false);

  const { vaciarCarrito } = useContext(CarritoContext);

  const setProductStockToRandom = async () => {
    setLoading(true);
    const productCollectionRef = collection(db, "productos");

    const productSnapshot = await getDocs(productCollectionRef);

    const batch = writeBatch(db);

    const zeroStockIndex = Math.floor(
      Math.random() * productSnapshot.docs.length
    );

    productSnapshot.docs.forEach((product, index) => {
      const productRef = doc(db, "productos", product.id);

      let stock;
      if (index === zeroStockIndex) {
        stock = 0;
      } else {
        stock = Math.floor(Math.random() * (50 - 5 + 1)) + 5;
      }

      batch.update(productRef, { stock: stock });
    });

    return batch
      .commit()
      .then(() => {
        console.log(
          "All products stock updated successfully with one product having 0 stock"
        );
        setLoading(false);
        onReload();
        vaciarCarrito();
      })
      .catch((err) => {
        console.error("Error updating stock:", err);
        setLoading(false);
      });
  };

  return (
    <button
      className="btn position-absolute resetStock"
      onClick={setProductStockToRandom}
    >
      <i className={`bi bi-arrow-clockwise ${loading ? "rotating" : ""}`}></i>{" "}
      Reset Stock
    </button>
  );
};

export default StockReloader;
