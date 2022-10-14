import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import Checkbox from "@mui/material/Checkbox";
import ScrollDialog from "../ui/ScrollDialog";
import styled from "styled-components";
import SearchInput from "../ui/SearchInput";
import Loading from "../ui/Loading";
import { Config } from "../../util/Constants";
import { axiosErrorHandler } from "../../util/axiosErrorHandler";

const SelectClient = (props) => {
  const [condition, setCondition] = useState({
    page: 1,
    searchKey: "",
  });
  const [targetClient, setTargetClient] = useState(
    props.defaultClient ? props.defaultClient : { _id: "" }
  );
  const [clientList, setClientList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const label = { inputProps: { "aria-label": "Checkbox demo" } };

  useEffect(() => {
    fetchClients();
  }, [condition]);

  const fetchClients = async () => {
    try {
      if (condition.page === 1) {
        setIsLoading(true);
      } else {
        setIsLoadingMore(true);
      }
      const response = await axios.get(
        Config.url.API_URL +
          "/feed/clients?page=" +
          condition.page +
          (condition.searchKey ? "&searchKey=" + condition.searchKey : "")
      );
      setTotalPages(response.data.totalPages);
      if (condition.page === 1) {
        setClientList(response.data.clients);
        setIsLoading(false);
      } else {
        setClientList((clients) => [...clients, ...response.data.clients]);
        setIsLoadingMore(false);
      }
    } catch (err) {
      // alert(e.response.data.message);
      axiosErrorHandler(err);
    }
  };

  return (
    <ScrollDialog
      title={"選擇客戶"}
      btnText={targetClient._id ? "選擇其他客戶" : "選擇客戶"}
      handleClickConfirm={() => {
        if (!targetClient._id) {
          return;
        }
        props.handleConfirmClient(targetClient);
      }}
      handleScrollToBottom={(e) => {
        if (condition.page >= totalPages) {
          return;
        }
        let prevState = { ...condition };
        setCondition({
          page: prevState.page + 1,
          searchKey: prevState.searchKey,
        });
      }}
    >
      <SelectClientWrap>
        <SearchInput
          placeholder="請輸入客戶名稱.電話.手機或地址"
          handleClickSearch={(term) => {
            setTargetClient({ _id: "" });
            setCondition({
              page: 1,
              searchKey: term,
            });
          }}
          handleClearSearch={() => {
            setTargetClient({ _id: "" });
            setCondition({
              page: 1,
              searchKey: "",
            });
          }}
        />
        <div className="list">
          <div className="item header">
            <span className="checkbox col"></span>
            <span className="name col">客戶名稱</span>
            <span className="address col">地址</span>
            <span className="phone col">電話</span>
          </div>
          {isLoading && <Loading />}
          {!isLoading &&
            clientList.map((clientData, idx) => (
              <div
                className={
                  clientData._id === targetClient._id ? "item selected" : "item"
                }
                key={idx}
                onClick={() => {
                  if (targetClient._id === clientData._id) {
                    setTargetClient({ _id: "" });
                  } else {
                    setTargetClient(clientData);
                  }
                }}
              >
                <span className="checkbox col">
                  <Checkbox
                    {...label}
                    checked={clientData._id === targetClient._id}
                  />
                </span>
                <span className="name col">{clientData.name}</span>
                <span className="address col">{clientData.address}</span>
                <span className="phone col">{clientData.phone}</span>
              </div>
            ))}
          {isLoadingMore && <div className="loadingMore">讀取中...</div>}
        </div>
      </SelectClientWrap>
    </ScrollDialog>
  );
};

const SelectClientWrap = styled.div`
  font-size: 18px;
  .search {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    color: black;
    @media (max-width: 767px) {
      display: block;
    }
  }
  .header {
    :hover {
      background: initial;
      cursor: initial;
    }
    .col {
      color: black;
    }
  }
  .item.selected {
    background-color: #f5f6f7;
  }
  .item.header {
    :hover {
      background: initial;
    }
  }
  .item {
    border-bottom: 1px solid rgba(224, 224, 224, 1);
    padding: 5px;
    cursor: pointer;
    display: flex;
    align-items: center;
    :hover {
      background-color: #f5f6f7;
    }
    .col {
      padding: 0 5px;
      display: inline-block;
      overflow: hidden;
      display: inline-block;
      text-overflow: ellipsis;
    }
    .col.checkbox {
      width: 48px;
      padding: 0 5px;
    }
    .col.name {
      width: 100px;
      max-width: 100px;
    }
    .col.phone {
      max-width: 100px;
      width: 100px;
    }
    .col.address {
      width: 250px;
      max-width: 250px;
      @media (max-width: 767px) {
        display: none;
      }
    }
  }
  .loadingMore {
    text-align: center;
    padding: 10px;
    color: #1976d2;
  }
`;

export default SelectClient;
