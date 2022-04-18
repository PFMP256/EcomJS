import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getProductsCartThunk } from "../redux/actions";
import { useDispatch } from "react-redux";
import { Cart, Login } from "./HeaderComponents";

export default function Header() {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const navigate = useNavigate();

  const dispatch = useDispatch();

  return (
    <>
      <nav className="nav">
        <div className="nav__center container">
          <Link to={`/`} className="nav__logo">
            <h1>
              ECOM <span>JS</span>
            </h1>
          </Link>
          <ul className="nav__list">
            <span
              onClick={() => {
                setIsLoginOpen(!isLoginOpen);
              }}
            >
              <i className="bx bxs-user"></i>
            </span>
            <span
              onClick={() => {
                if (localStorage.getItem("token")) {
                  navigate("/purchases");
                } else {
                  setIsLoginOpen(!isLoginOpen);
                }
              }}
            >
              <i className="bx bxs-box"></i>
            </span>
            <div
              onClick={() => {
                if (localStorage.getItem("token")) {
                  setIsCartOpen(!isCartOpen);
                  dispatch(getProductsCartThunk);
                } else {
                  setIsLoginOpen(!isLoginOpen);
                }
              }}
              className="carrito__icon"
            >
              <i className="bx bx-cart"></i>
            </div>
          </ul>
        </div>
      </nav>

      <Cart setIsCartOpen={setIsCartOpen} isCartOpen={isCartOpen} />

      <Login setIsLoginOpen={setIsLoginOpen} isLoginOpen={isLoginOpen} />
    </>
  );
}
