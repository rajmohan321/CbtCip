import React from "react";
import Cart from "../components/Cart";

const CartScreen = ({ match, location, history }) => {
  return (
    <div>
      <Cart match={match} location={location} history={history} />
    </div>
  );
};

export default CartScreen;
