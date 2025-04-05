import "./App.css";
import React, { Suspense, useEffect } from "react";
import styled from "styled-components";
import { Routes, Route } from "react-router-dom";
import OrderList from "./components/order/OrderList";
import AddOrEditOrder from "./components/order/AddOrder";
import OrderDetail from "./components/order/OrderDetail";
// import ClientList from "./components/client/ClientList";
import ClientDetail from "./components/client/ClientDetail";
import Header from "./components/layout/Header";
import Login from "./components/auth/Login";
import SignUp from "./components/auth/SignUp";
import AddOrEditClient from "./components/client/AddOrEditClient";
import ScheduledOrder from "./components/scheduledOrder/ScheduledOrder";
import Schedule from "./components/schedule/Schedule";
import SidebarMenu from "./components/layout/SidebarMenu";



const ClientList = React.lazy(() => import("./components/client/ClientList"));

function App() {
  useEffect(() => {
    document.title = '花店訂單管理系統';
  }, [])
  return (
    <MainPageWrap>
      <Header />
      {/* <SidebarMenu /> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<ScheduledOrder />} />
          <Route path="/calendar" element={<Schedule />} />
          <Route path="/scheduledOrder" element={<ScheduledOrder />} />
          <Route path="/order" element={<OrderList />} />
          <Route path="/order/add-order" element={<AddOrEditOrder />} />
          <Route path="/order/edit-order/:orderId" element={<AddOrEditOrder />} />
          <Route path="/order/:orderId" element={<OrderDetail />} />
          <Route path="/client" element={<Suspense fallback={<div>Loading...</div>}><ClientList /></Suspense>} />
          <Route path="/client/add-client" element={<AddOrEditClient />} />
          <Route
            path="/client/edit-client/:clientId"
            element={<AddOrEditClient isEdit={true} />}
          />
          <Route path="/client/:clientId" element={<ClientDetail />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

      </div>
    </MainPageWrap>
  );
  // return <Counter />;
}

const MainPageWrap = styled.div`
  // display:flex;
  background-color: #e7ebf0;
  height: 100%;
  width:100%;
  min-height: 100vh;
  padding-bottom: 50px;
  .container {
    // padding:20px;
    // padding-top:40px;
  }
`;

export default App;
