import axios from "axios";

export const actions = {
  setProducts: "SET_PRODUCTS",
  setIsLoading: "SET_IS_LOADING",
  setProductsCart: "SET_PRODUCTS_CART"
};

export const setProducts = (products) => ({
  type: actions.setProducts,
  payload: products
});

export const setIsLoading = (isLoading) => ({
  type: actions.setIsLoading,
  payload: isLoading
});

export const setProductsCart = (productsCart) => ({
  type: actions.setProductsCart,
  payload: productsCart
});

const getConfig = () => ({
  headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
});

export const getProductsThunk = () => {
  return (dispatch) => {
    return axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/products")
      .then((res) => dispatch(setProducts(res.data)))
      .catch((err) => {
        console.log(err);
      });
  };
};

export const filterCategoryThunk = (id) => {
  return (dispatch) => {
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products?category=${id}`
      )
      .then((res) => dispatch(setProducts(res.data)));
  };
};

// export const filterHeadlineThunk = (headline) => {
//   return (dispatch) => {
//     dispatch(setIsLoading(true));
//     return axios
//       .get(
//         `https://news-app-academlo.herokuapp.com/news/?headline__icontains=${headline}`
//       )
//       .then((res) => dispatch(setNews(res.data)))
//       .finally(() => dispatch(setIsLoading(false)));
//   };
// };

export const filterTitleThunk = (title) => {
  return (dispatch) => {
    return axios
      .get(
        `https://ecommerce-api-react.herokuapp.com/api/v1/products?query=${title}`
      )
      .then((res) => dispatch(setProducts(res.data)));
  };
};

export const addProductToCartThunk = (product) => {
  return () => {
    return axios
      .post(
        "https://ecommerce-api-react.herokuapp.com/api/v1/cart",
        product,
        getConfig()
      )
      .then(() => {
        if (product.quantity > 1) {
          alert(`${product.quantity} products have been added to your cart`);
        } else {
          alert(`${product.quantity} product has been added to your cart`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
};

export const getProductsCartThunk = () => {
  return (dispatch) => {
    return axios
      .get("https://ecommerce-api-react.herokuapp.com/api/v1/cart", getConfig())
      .then((res) => dispatch(setProductsCart(res.data)))
      .catch((err) => {
        if (err.response.status === 404) {
          console.log("el carrito esta vacio");
        } else {
          console.log(err);
        }
      });
  };
};
