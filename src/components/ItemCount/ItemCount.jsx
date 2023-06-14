import React from "react";
import { useState } from "react";

const ItemCount = ({ stock, agregarProducto }) => {
  const [count, setCount] = stock > 0 ? useState(1) : useState(0);

  const incrementar = () => {
    if (count < stock) {
      setCount(count + 1);
    }
  };

  const decrementar = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  const validateCount = (e) => {
    const value = e.target.value;
    if (value === "") {
      setCount(value);
    } else {
      const intValue = parseInt(value);
      if (intValue < 1) {
        setCount(1);
      } else if (intValue > stock) {
        setCount(stock);
      } else {
        setCount(intValue);
      }
    }
  };

  const validateOut = (e) => {
    if (e.target.value === "") {
      setCount(1);
    }
  };

  return (
    <div className="d-flex">
      <button
        className={stock !== 0 ? "btn btn-main me-2" : "btn disabled me-2"}
        onClick={decrementar}
      >
        {" "}
        -{" "}
      </button>

      <input
        className={
          stock !== 0
            ? "form-control text-center me-3"
            : "form-control text-center me-3 disabled"
        }
        id="inputQuantity"
        type="text"
        value={count}
        onChange={validateCount}
        onBlur={validateOut}
      />
      <button
        className={stock !== 0 ? "btn btn-main me-2" : "btn disabled me-2"}
        onClick={incrementar}
      >
        {" "}
        +{" "}
      </button>
      <button
        className={
          stock !== 0
            ? "btn outlined-btn flex-shrink-0 text-uppercase color-main col-4"
            : "btn outlined-btn flex-shrink-0 text-uppercase color-main col-4 disabled"
        }
        type="button"
        onClick={() => {
          agregarProducto(count);
        }}
      >
        <i className="bi-cart-fill me-1" />
        ADD
      </button>
    </div>
  );
};

export default ItemCount;
