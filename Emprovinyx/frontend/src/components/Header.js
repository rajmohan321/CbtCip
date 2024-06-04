import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userActions";

const Header = () => {
  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header>
      <nav>
        <Link to="/">EmporifyX</Link>
        <div>
          <Link to="/cart">Cart</Link>
          {userInfo ? (
            <div>
              <span>{userInfo.name}</span>
              <button onClick={logoutHandler}>Logout</button>
            </div>
          ) : (
            <Link to="/login">Sign In</Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
