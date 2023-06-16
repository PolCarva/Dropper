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
    <div className="row align-items-center justify-content-center">
      <div
        className={
          stock !== 0
            ? "d-flex mb-4 mb-md-0 col-12 col-md-8 justify-content-between justify-content-md-center"
            : "d-flex mb-4 mb-md-0 col-12 col-md-8 disabled justify-content-between justify-content-md-center"
        }
      >
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
      </div>

      <div className="col-12 col-md-4">
        <button
          className={
            stock !== 0
              ? "btn outlined-btn mt-4 mt-md-0 text-uppercase color-main w-100"
              : "btn outlined-btn mt-4 mt-md-0 text-uppercase color-main w-100 disabled"
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
    </div>
  );
};

export default ItemCount;
