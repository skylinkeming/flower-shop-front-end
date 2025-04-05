import styled from "styled-components";

export default function SidebarMenu() {
  return (
    <StyledSidebarMenu>
      <div className="menuItem">行事曆</div>
      <div className="menuItem">訂單資料</div>
      <div className="menuItem">客戶資料</div>
      <div className="menuItem">商品資料</div>
    </StyledSidebarMenu>
  );
}

const StyledSidebarMenu = styled.div`
  background: white;
  height: 1110px;
  padding: 45px;
  padding-top:160px;
  font-size: 24px;
  box-sizing: border-box;
  // border-top-left-radius: 40px;
  // border-bottom-left-radius: 40px;
  background-color: rgb(25, 118, 210);
  color: white;
  gap:20px;
  display:flex;
  flex-direction:column;
  .menuItem {
    white-space:nowrap;
  }
`;
