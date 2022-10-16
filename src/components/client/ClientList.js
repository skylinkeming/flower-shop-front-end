import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchClients } from "../../features/client/clientSlice";
import Pagination from "../ui/Pagination";
import ClientItem from "./ClientItem";
import SearchInput from "../ui/SearchInput";
import Loading from "../ui/Loading";
import Checkbox from "@mui/material/Checkbox";
import { Config } from "../../util/Constants";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";

const ClientList = (props) => {
  const client = useSelector((state) => {
    return state.client;
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const [selectClients, setSelectClients] = useState([]);
  const [searchKey, setSearchKey] = useState("");
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    dispatch(
      fetchClients({
        page: page,
        searchKey: sessionStorage.getItem("clientSearchKey"),
      })
    );
  }, [page]);

  useEffect(() => {
    if (selectAll) {
      if (client.clientList) {
        setSelectClients(client.clientList.map((client) => client._id));
      }
    } else {
      setSelectClients([]);
    }
  }, [selectAll]);

  const deleteManyOrders = () => {
    let requestBody = {
      idArray: selectClients,
    };
    axios
      .delete(Config.url.API_URL + "/feed/clients/deleteManyClients", {
        data: requestBody,
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        clearSelect();
        dispatch(
          fetchClients({
            page: page,
            searchKey: sessionStorage.getItem("searchKey"),
          })
        );
      })
      .catch(axiosErrorHandler);
  };

  const clearSelect = () => {
    setSelectClients([]);
    setSelectAll(false);
  };

  return (
    <ClientListWrap>
      <main>
        <div className="pageTop">
          <div className="pageTitle">客戶資料</div>
          <div
            className="btn"
            onClick={() => {
              if (selectClients.length) {
                deleteManyOrders();
                return;
              }
              navigate("/client/add-client");
            }}
          >
            {selectClients.length ? "刪除客戶" : "新增客戶＋"}
          </div>
        </div>
        <div className="table">
          <div className="functionHeader">
            <SearchInput
              placeholder="請輸入客戶名稱.電話.手機或地址"
              keepClientSearchKey={true}
              handleClickSearch={(term) => {
                setSearchKey(term)
                dispatch(
                  fetchClients({
                    page: 1,
                    searchKey: term,
                  })
                );
              }}
              handleClearSearch={() => {
                setSearchKey("");
                dispatch(
                  fetchClients({
                    page: page,
                  })
                );
              }}
            />
          </div>
          <div className="tableHeader">
            <span
              className="column checkbox"
              onClick={(e) => {
                e.stopPropagation();
              }}
            >
              <Checkbox
                {...label}
                checked={selectAll}
                onChange={(e) => {
                  setSelectAll(!selectAll);
                }}
              />
            </span>
            <div className="column header name">客戶名稱</div>
            <div className="column header phone">電話</div>
            <div className="column header cellPhone">手機號碼</div>
            <div className="column header address">地址</div>
          </div>
          <div className="tableBody">
            <div className="clientList">
              {client.isLoading && <Loading />}
              {!client.isLoading &&
                client &&
                client.clientList.map((clientData) => (
                  <ClientItem
                    key={clientData.createdAt}
                    searchKey={searchKey}
                    {...clientData}
                    isSelected={selectClients.includes(clientData._id)}
                    handleTickCheckbox={(checked) => {
                      let updateList = [...selectClients];
                      if (checked) {
                        updateList.push(clientData._id);
                      } else {
                        updateList = updateList.filter(
                          (id) => id !== clientData._id
                        );
                      }
                      setSelectClients(updateList);
                    }}
                  />
                ))}
              {!client.isLoading &&
                client &&
                client.clientList.length === 0 && (
                  <div className="noData">查無資料</div>
                )}
            </div>
          </div>
          <div className="tableBottom">
            {client.totalPages && (
              <Pagination
                key={page}
                currentPage={page}
                totalPages={client.totalPages}
                onClickPage={(pageNum) => setPage(pageNum)}
              />
            )}
          </div>
        </div>
      </main>
    </ClientListWrap>
  );
};

const ClientListWrap = styled.div`
  display: flex;
  justify-content: center;
  background-color: #e7ebf0;
  height: 100%;
  width: 100%;
  .highlight {
    color:#36d7b7;
  }
  .pageTop {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 30px;
    .pageTitle {
      font-size: 30px;
    }
    .btn {
      border-radius: 10px;
      border: 1px solid lightgray;
      display: inline-block;
      padding: 5px 20px;
      font-size: 16px;
      cursor: pointer;
      transition: 0.3s;
      background: white;
      :hover {
        background: #d9fb19;
      }
    }
  }
  .table {
    background-color: white;
    border-radius: 10px;
    margin-top: 20px;
    min-height: 200px;
    max-height: 800px;
    overflow-x: scroll;
    overflow-y: hidden;
    box-shadow: inset 0 -2px 0 0 #cdcde6, inset 0 0 1px 1px #fff,
      0 1px 2px 1px rgba(30, 35, 90, 0.4);
    font-size: 18px;
    overflow: hidden;
    @media (max-width: 767px) {
      width: 375px;
    }
    .functionHeader {
      padding: 20px 0 0 20px;
    }
    .tableHeader {
      border-bottom: 2px solid rgba(224, 224, 224, 1);
      display: flex;
      align-items: center;
      white-space: nowrap;
      .column.name {
        justify-content: center;
      }
      .column.address {
        justify-content: center;
      }
    }
    .tableBody {
      height: 500px;
      overflow: auto;
      .clientList {
        min-height: 510px;
        .noData {
          text-align: center;
          padding: 100px 0px;
          font-size: 18px;
        }
      }
    }
    .tableBottom {
      height: 40px;
      padding: 0 20px;
      background: white;
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .column {
      padding: 10px 10px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .column.name {
      width: 200px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      justify-content: flex-start;
    }
    .column.phone {
      width: 140px;
      @media (max-width: 767px) {
        display: none;
      }
    }
    .column.cellPhone {
      width: 140px;
    }
    .column.address {
      min-width: 300px;
      justify-content: flex-start;
      @media (max-width: 767px) {
        display: none;
      }
    }
  }
`;

export default ClientList;
