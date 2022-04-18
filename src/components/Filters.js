import React, { useEffect, useState } from "react";
import {
  getProductsThunk,
  filterCategoryThunk,
  filterTitleThunk
} from "../redux/actions";
import { useDispatch } from "react-redux";
import axios from "axios";

export default function Filters() {
  const dispatch = useDispatch();

  const [titleProduct, setTitleProduct] = useState();
  const [categories, setCategories] = useState();
  useEffect(() => {
    axios
      .get(
        "https://ecommerce-api-react.herokuapp.com/api/v1/products/categories/"
      )
      .then((res) => {
        setCategories(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const filterCategories = (id) => {
    id === "categories"
      ? dispatch(getProductsThunk())
      : dispatch(filterCategoryThunk(id));
  };

  const searchProduct = (title) => {
    setTitleProduct(title);
    dispatch(filterTitleThunk(title));
  };

  return (
    <section className="filter">
      <div className="grid">
        <form className="div">
          <label htmlFor="buscar">
            <span>
              <i className="bx bx-search"></i>
            </span>
          </label>
          <input
            type="text"
            onChange={(e) => searchProduct(e.target.value)}
            value={titleProduct}
            id="buscar"
            placeholder="Search products..."
          />
        </form>
        <div className="category">
          <select onChange={(e) => filterCategories(e.target.value)}>
            <option value="categories">All Products</option>
            {categories?.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </section>
  );
}
