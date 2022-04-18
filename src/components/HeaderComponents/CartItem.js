import React from "react";
import { useSelector } from "react-redux";
import axios from "axios";

export default function CartItem({ title, price, quantity, productId }) {
  const products = useSelector((state) => state.products);
  const item1 = products?.data?.products.find(
    (productItem) => productItem.id === Number(productId)
  );
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  return (
    <div className="carrito__item">
      <img src={item1?.productImgs[2]} alt="reloj" />
      <div>
        <h3>{title}</h3>
        <p className="price">{`$${price}`}</p>
      </div>
      <div>
        <p>{quantity}</p>
      </div>
      <div>
        <span
          onClick={() => {
            axios.delete(
              `https://ecommerce-api-react.herokuapp.com/api/v1/cart/${productId}`,
              getConfig()
            );
          }}
          className="remove__item"
        >
          <i className="bx bx-trash"></i>
        </span>
      </div>
    </div>
  );
}
