import { Filters, Product, Header } from "../components";
import React from "react";

export default function Home() {
  return (
    <>
      <Header />
      <Filters />
      <Product />
    </>
  );
}
