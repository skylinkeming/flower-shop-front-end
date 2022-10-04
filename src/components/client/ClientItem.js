import { Navigate } from "react-router-dom";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { Config } from "../../util/Constants";

const ClientItem = (props) => {
  const {
    address,
    cellPhone,
    createdAt,
    imageUrl,
    name,
    note,
    orders,
    phone,
    updatedAt,
    _id,
    isSelected,
  } = props;

  const navigate = useNavigate();
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  //   const dateObj = new Date(date);
  //   const dateStr =
  //     dateObj.getFullYear() +
  //     "-" +
  //     (dateObj.getMonth() + 1) +
  //     "-" +
  //     dateObj.getDate();
  //   const timeStr =
  //     dateObj.getHours() +
  //     ":" +
  //     (dateObj.getMinutes() == 0 ? "00" : dateObj.getMinutes());

  return (
    <ClientItemWrap
      isSelected={isSelected}
      onClick={() => {
        navigate("/client/" + _id);
      }}
    >
      <span
        className="column checkbox"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Checkbox
          {...label}
          checked={isSelected}
          onChange={(e) => {
            props.handleTickCheckbox(e.target.checked);
          }}
        />
      </span>
      <div className="column name">
        <img
          alt="客戶頭像"
          src={
            imageUrl
              ? Config.url.API_URL + imageUrl
              : "/images/userIcon.png"
          }
        />
        {name}
      </div>
      <div className="column phone">{phone}</div>
      <div className="column cellPhone">{cellPhone}</div>
      <div className="column address">{address}</div>
    </ClientItemWrap>
  );
};

const ClientItemWrap = styled.div`
  display: flex;
  border-bottom: 1px solid rgba(224, 224, 224, 1);
  cursor: pointer;
  background-color: ${(props) => (props.isSelected ? "#f5f6f7" : "")};
  :hover {
    background-color: #f5f6f7;
  }
  .column {
    img {
      width: 30px;
      height: 30px;
      border: 1px solid lightgray;
      border-radius: 50%;
      margin: 0 5px;
      box-sizing: border-box;
    }
  }
`;

export default ClientItem;
