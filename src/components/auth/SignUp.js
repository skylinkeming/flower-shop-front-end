import { useRef } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Config } from "../../util/Constants";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";

const SignUp = (props) => {
  let navigate = useNavigate();
  const nameInput = useRef(null);
  const emailInput = useRef(null);
  const passwordInput = useRef(null);

  const signUp = () => {
    if (!nameInput.current.value) {
      alert("請填入名字");
      return;
    }
    if (!emailInput.current.value) {
      alert("請填入E-mail");
      return;
    }
    if (!emailInput.current.value.includes("@")) {
      alert("請書輸入正確格式的E-mail");
      return;
    }
    if (!passwordInput.current.value) {
      alert("請填入密碼");
      return;
    }

    fetch(Config.url.API_URL + "/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: nameInput.current.value,
        email: emailInput.current.value,
        password: passwordInput.current.value,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        alert(result.message);
        navigate("/login");
      })
      .catch((err) => {
        axiosErrorHandler(err);
        console.log(err);
      });
  };

  return (
    <SignUpWrap>
      <main>
        <div className="title">加入會員</div>
        <div className="email inputDiv">
          <span className="label">名字</span>
          <input type="text" ref={nameInput} />
        </div>
        <div className="email inputDiv">
          <span className="label">電子信箱</span>
          <input type="email" ref={emailInput} />
        </div>
        <div className="password inputDiv">
          <span className="label">密碼</span>
          <input type="password" ref={passwordInput} />
        </div>
        <div className="btnArea">
          <div className="btn" onClick={signUp}>
            立即註冊
          </div>
        </div>
      </main>
    </SignUpWrap>
  );
};

const SignUpWrap = styled.div`
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
      margin-right: 10px;
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

export default SignUp;
