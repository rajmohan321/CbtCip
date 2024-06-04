import React from "react";
import ProductDetails from "../components/ProductDetails";

const ProductScreen = ({ match }) => {
  return (
    <div>
      <ProductDetails match={match} />
    </div>
  );
};

export default ProductScreen;
