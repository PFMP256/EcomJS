import "./styles.css";
import { HashRouter, Routes, Route } from "react-router-dom";
import { Home, Products, Purchases } from "./pages";
import { useEffect } from "react";
import { getProductsThunk, getProductsCartThunk } from "./redux/actions";
import { useDispatch } from "react-redux";

export default function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProductsThunk());
    dispatch(getProductsCartThunk());
  }, [dispatch]);

  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products/:id" element={<Products />} />
        <Route path="/purchases" element={<Purchases />} />
      </Routes>
    </HashRouter>
  );
}
