import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "../components";
import {
  getProductsThunk,
  addProductToCartThunk,
  getProductsCartThunk
} from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Products() {
  const { id } = useParams();
  const [similarItem, setSimilarItem] = useState({});
  const [counterItem, setCounterItem] = useState(1);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const item1 = products?.data?.products.find(
    (productItem) => productItem.id === Number(id)
  );

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (item1)
      axios
        .get(
          `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${item1?.category.id}`
        )
        .then((res) => setSimilarItem(res.data));
  }, [item1, dispatch]);

  const addProduct = () => {
    const product = {
      id: +id,
      quantity: counterItem
    };
    dispatch(addProductToCartThunk(product));
    dispatch(getProductsCartThunk());
  };

  return (
    <>
      <Header />
      <main className="container detalles" id="detalles">
        <article className="detalle-grid">
          <img src={item1?.productImgs[2]} alt="" className="img-fluid" />
          <div className="detalles-content">
            <h3>{item1?.title}</h3>
            <p className="price">
              <b>Price: </b> {item1?.price}
            </p>
            <p className="description">
              <b>Description: </b>
              <span>{item1?.description}</span>
            </p>

            <div className="bottom">
              <div className="btn__group">
                <div onClick={addProduct} className="btn addToCart">
                  Add To Cart
                </div>
              </div>
              <div></div>
              <span
                onClick={() =>
                  counterItem <= 1
                    ? setCounterItem(1)
                    : setCounterItem(counterItem - 1)
                }
              >
                <i className="bx bxs-left-arrow"></i>
              </span>
              <p>{counterItem}</p>
              <span onClick={() => setCounterItem(counterItem + 1)}>
                <i className="bx bxs-right-arrow"></i>
              </span>
            </div>
          </div>
        </article>
      </main>
      <section className="products-by-product-grid">
        {similarItem.data?.products.map((items) => {
          if (items.id !== item1.id) {
            return (
              <Link
                to={`/products/${items.id}`}
                className="producto"
                key={items.id}
                onClick={() => {
                  if ("detalles") {
                    let anchorElement = document.getElementById("detalles");
                    if (anchorElement) {
                      anchorElement.scrollIntoView();
                    }
                  }
                }}
              >
                <div className="image__container">
                  <img src={items.productImgs[2]} alt="" />
                </div>
                <div style={{ color: "#000" }} className="producto__footer">
                  <h1 style={{ fontSize: "19px" }}>{items.title}</h1>
                  <div style={{ fontSize: "15px" }} className="price">
                    {items.price}
                  </div>
                </div>
                <div className="bottom"></div>
              </Link>
            );
          }
        })}
      </section>
    </>
  );
}
