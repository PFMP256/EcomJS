import React from "react";
import { useSelector } from "react-redux";

export default function PurchaseItem({ title, price, quantity, productId }) {
  const products = useSelector((state) => state.products);
  const item1 = products?.data?.products.find(
    (productItem) => productItem.id === Number(productId)
  );
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
    </div>
  );
}
