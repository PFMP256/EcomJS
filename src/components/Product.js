import React from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { getProductsThunk } from "../redux/actions";
import { useDispatch, useSelector } from "react-redux";

export default function Product() {
  const dispatch = useDispatch();

  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductsThunk());
  }, [dispatch]);

  return (
    <section className="productos">
      <div className="productos__center">
        {products.data?.products.map((item) => (
          <Link key={item.id} to={`/products/${item.id}`} className="producto">
            <div className="image__container">
              <img src={item.productImgs[2]} alt={item.title} />
            </div>
            <div style={{ color: "#000" }} className="producto__footer">
              <h1 style={{ fontSize: "19px" }}>{item.title}</h1>
              <div style={{ fontSize: "15px" }} className="price">
                {item.price}
              </div>
            </div>
            <div className="bottom"></div>
          </Link>
        ))}
      </div>
    </section>
  );
}
