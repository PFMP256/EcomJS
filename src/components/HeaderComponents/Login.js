import React, { useState } from "react";
import axios from "axios";

export default function Login({ setIsLoginOpen, isLoginOpen }) {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [errorMessage, setErrorMessage] = useState();
  const login = (e) => {
    e.preventDefault();
    const credentials = { email, password };
    axios
      .post(
        `https://ecommerce-api-react.herokuapp.com/api/v1/users/login`,
        credentials
      )
      .then((res) => {
        localStorage.setItem("token", res.data.data.token);
        setErrorMessage("");
        setIsLoginOpen(false);
      })
      .catch((error) => setErrorMessage(error.response.data.message));
  };
  return (
    isLoginOpen && (
      <section className="carrito__overlay show">
        <div className="carrito show">
          <span
            onClick={() => {
              setIsLoginOpen(!isLoginOpen);
            }}
            className="close__carrito"
          >
            <i className="bx bx-x"></i>
          </span>

          {localStorage.getItem("token") ? (
            <div className="carrito__footer">
              <button
                className="clear__carrito btn"
                onClick={() => {
                  localStorage.setItem("token", "");
                  setIsLoginOpen(false);
                }}
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="carrito__center">
              <div className="login-box">
                <form onSubmit={login}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="password"
                  />
                  <p>{errorMessage}</p>
                  <input
                    className="clear__carrito btn"
                    type="submit"
                    value="Log In"
                  />
                </form>
              </div>
            </div>
          )}
        </div>
      </section>
    )
  );
}
