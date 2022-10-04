import "./App.css";
import { Fragment } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import OrderList from "./components/order/OrderList";
import AddOrEditOrder from "./components/order/AddOrder";
import OrderDetail from "./components/order/OrderDetail";
import ClientList from "./components/client/ClientList";
import ClientProfile from "./components/client/ClientProfile";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import AddOrEditClient from "./components/client/AddOrEditClient";

function App() {
  return (
    <MainPageWrap>
      <Header />
      <Routes>
        <Route path="/" element={<OrderList />} />
        <Route path="/order" element={<OrderList />} />
        <Route path="/order/add-order" element={<AddOrEditOrder />} />
        <Route path="/order/edit-order/:orderId" element={<AddOrEditOrder />} />
        <Route path="/order/:orderId" element={<OrderDetail />} />
        <Route path="/client" element={<ClientList />} />
        <Route path="/client/add-client" element={<AddOrEditClient />} />
        <Route
          path="/client/edit-client/:clientId"
          element={<AddOrEditClient isEdit={true} />}
        />
        <Route path="/client/:clientId" element={<ClientProfile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </MainPageWrap>
  );
  // return <Counter />;
}

const MainPageWrap = styled.div`
  background-color: #e7ebf0;
  height: 100%;
  min-height: 100vh;
  padding-bottom: 50px;
`;

export default App;
