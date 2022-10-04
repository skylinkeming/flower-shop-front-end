import styled from "styled-components";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Fragment, useEffect, useState } from "react";
import { logout } from "../../features/auth/authSlice";

const Header = () => {
  const authData = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [page, setPage] = useState("");

  //   history.listen((location, action) => {
  //     // location is an object like window.location
  //     console.log(action, location.pathname, location.state)
  // });

  //todo: 用url change來改變page


  const getClassName = (linkName) => {
    // return
    if (linkName === page) {
      return "navItem current";
    }
    return "navItem";
  };

  return (
    <HeaderWrap>
      <Link
        className={getClassName("clients")}
        to="/client"
        onClick={() => setPage("clients")}
      >
        客戶資料
      </Link>
      <Link
        className={getClassName("orders")}
        to="/order"
        onClick={() => setPage("orders")}
      >
        訂單資料
      </Link>
      <Link
        className={getClassName("add-order")}
        to="/order/add-order"
        onClick={() => setPage("add-order")}
      >
        新增訂單
      </Link>
      {!localStorage.getItem("userName") && (
        <Fragment>
          <Link
            className={getClassName("login")}
            to="/login"
            onClick={() => setPage("login")}
          >
            登入
          </Link>
          <Link
            className={getClassName("sign-up")}
            to="/signup"
            onClick={() => setPage("sign-up")}
          >
            加入會員
          </Link>
        </Fragment>
      )}
      {localStorage.getItem("userName") && (
        <Fragment>
          <div
            className="navItem"
            onClick={() => {
              dispatch(logout());
            }}
          >
            登出
          </div>
          <span className="loginStatus">{"Hi, " + localStorage.getItem("userName")}</span>
        </Fragment>
      )}
      <div className="navItem"></div>
    </HeaderWrap>
  );
};

const HeaderWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgb(25, 118, 210);
  font-size: 20px;
  color: white;
  height: 45px;
  .navItem {
    margin: 0 20px;
    font-size: 20px;
    cursor: pointer;
    text-decoration: none;
    :visited {
      color: white;
    }
  }
  .navItem.current {
    border-bottom: 2px solid;
    box-sizing: border-box;
    font-weight: 900;
  }
  .loginStatus {
    white-space: nowrap;
    position: absolute;
    right: 200px;
  }
`;

export default Header;
