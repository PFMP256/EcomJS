import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductsCartThunk } from "../../redux/actions";
import CartItem from "./CartItem";
import axios from "axios";
export default function Cart({ setIsCartOpen, isCartOpen }) {
  const productsCart = useSelector((state) => state.productsCart);

  const dispatch = useDispatch();
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  const user = {
    street: "Green St. 1456",
    colony: "Southwest",
    zipCode: 12345,
    city: "USA",
    references: "Some references"
  };
  useEffect(() => {
    dispatch(getProductsCartThunk());
  }, [isCartOpen, dispatch, productsCart]);

  return (
    isCartOpen && (
      <section className="carrito__overlay show">
        <div className="carrito show">
          <span
            onClick={() => {
              setIsCartOpen(!isCartOpen);
            }}
            className="close__carrito"
          >
            <i className="bx bx-x"></i>
          </span>
          {}
          <h1>Your Cart</h1>

          <div className="carrito__center">
            {productsCart.data?.cart.products.map((itemCart) => (
              <CartItem
                key={itemCart.productsInCart.id}
                title={itemCart.title}
                price={itemCart.price}
                quantity={itemCart.productsInCart.quantity}
                productId={itemCart.productsInCart.productId}
              />
            ))}
          </div>

          <div className="carrito__footer">
            <div
              onClick={() => {
                axios
                  .post(
                    "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
                    user,
                    getConfig()
                  )
                  .then(() => alert("thank you for your purchase"));
              }}
              className="btn addToCart"
            >
              Buy Now
            </div>
          </div>
        </div>
      </section>
    )
  );
}
