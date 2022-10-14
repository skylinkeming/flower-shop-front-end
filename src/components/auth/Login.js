import { useEffect, useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/auth/authSlice";

const Login = (props) => {
  const dispatch = useDispatch();
  const emailInput = useRef(null);
  const passwordInput = useRef(null);
  let navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("keypress", keyPressEvent);

    return () => {
      window.removeEventListener("keypress", keyPressEvent);
    };
  }, []);

  const keyPressEvent = (e) => {
    if (e.key === "Enter") {
      clickLoginBtn();
    }
  };

  const clickLoginBtn = async () => {
    if (!emailInput.current.value) {
      alert("請輸入E-mail");
      return;
    }
    if (!passwordInput.current.value) {
      alert("請輸入密碼");
      return;
    }
    if (passwordInput.current.value.length < 6) {
      alert("密碼需至少6位數");
      return;
    }
    const res = await dispatch(
      login({
        email: emailInput.current.value,
        password: passwordInput.current.value,
      })
    );
    if (res.payload.status === 200) {
      localStorage.setItem("userId", res.payload.data.userId);
      if (sessionStorage.getItem("beforeLoginUrl")) {
        window.location.href = sessionStorage.getItem("beforeLoginUrl");
      } else {
        navigate("/order");
      }
    }
  };

  return (
    <LoginWrap>
      <main>
        <div className="title">會員登入</div>
        <div className="email inputDiv">
          <span className="label">電子信箱</span>
          <input type="email" ref={emailInput} />
        </div>
        <div className="password inputDiv">
          <span className="label">密碼</span>
          <input type="password" ref={passwordInput} />
        </div>
        <div className="btnArea">
          <div className="btn" onClick={clickLoginBtn}>
            登入
          </div>
          <div
            className="btn"
            onClick={() => {
              navigate("/signup");
            }}
          >
            註冊
          </div>
        </div>
      </main>
    </LoginWrap>
  );
};

const LoginWrap = styled.div`
  display: flex;
  justify-content: center;
  padding-top: 100px;
  .title {
    margin-bottom: 50px;
    font-size: 30px;
    text-align: center;
  }
  .inputDiv {
    margin-bottom: 20px;
    .label {
      width: 100px;
      text-align: right;
      margin-right: 10px;
      display: inline-block;
      font-size: 20px;
    }
    input {
      border-radius: 5px;
      width: 200px;
      height: 40px;
      font-size: 20px;
      padding: 0 10px;
      box-sizing: border-box;
      border: 1px solid gray;
    }
  }
  .btnArea {
    margin-top: 35px;
    text-align: center;
    .btn {
      display: inline-block;
      border: 1px solid;
      border-radius: 10px;
      padding: 10px 20px;
      margin-right: 30px;
      font-size: 20px;
      cursor: pointer;
      background: white;
      transition: 0.3s;
      :hover {
        background-color: rgb(25, 118, 210);
        color: white;
      }
    }
  }
`;

export default Login;
