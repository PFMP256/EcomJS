import React, { useEffect, useState } from "react";
import { Header } from "../components";
import axios from "axios";
import { useDispatch } from "react-redux";
import { getProductsThunk } from "../redux/actions";
import { PurchaseItem } from "../components";
export default function Purchases() {
  const [purchasesUser, setPurchasesUser] = useState();
  const getConfig = () => ({
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
  });
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/purchases",
        getConfig()
      )
      .then((res) => {
        setPurchasesUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);
  return (
    <>
      <Header />
      <section className=" show">
        <div style={{ marginTop: "50px" }} className="carrito show">
          <div className="carrito__center">
            {purchasesUser?.data.purchases[0].cart.products.map(
              (itemPurchase) => (
                <PurchaseItem
                  key={itemPurchase.productsInCart.id}
                  title={itemPurchase.title}
                  price={itemPurchase.price}
                  quantity={itemPurchase.productsInCart.quantity}
                  productId={itemPurchase.productsInCart.productId}
                />
              )
            )}
          </div>
        </div>
      </section>
    </>
  );
}
