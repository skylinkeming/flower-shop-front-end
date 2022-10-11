import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";

const SearchInput = (props) => {
  const [searchKey, setSearchKey] = useState(
    props.saveSearchKey ? sessionStorage.getItem("searchKey") : ""
  );

  useEffect(() => {
    sessionStorage.setItem("searchKey", searchKey);
    window.addEventListener("keypress", (e) => {});
  }, [searchKey]);

  return (
    <SearchInputWrap>
      <div className="search">
        <input
          placeholder={props.placeholder}
          value={searchKey}
          onChange={(e) => {
            setSearchKey(e.target.value);
          }}
          onKeyPress={(e) => {
            if (e.key === "Enter" && searchKey) {
              props.handleClickSearch(searchKey);
            }
          }}
        />
        <span
          className="btn searchBtn"
          onClick={() => {
            if (!searchKey) {
              return;
            }
            props.handleClickSearch(searchKey);
          }}
        >
          搜尋
        </span>
        <span
          className="btn"
          onClick={() => {
            if (!searchKey) {
              return;
            }
            setSearchKey("");
            props.handleClearSearch();
          }}
        >
          清除搜尋結果
        </span>
      </div>
    </SearchInputWrap>
  );
};

const SearchInputWrap = styled.div`
  margin-bottom: 20px;
  .search {
    @media (max-width: 767px) {
      display: block;
    }
  }
  input {
    width: 300px;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 18px;
    border: 1px solid rgba(224, 224, 224, 1);
    @media (max-width: 767px) {
      margin-bottom: 10px;
    }
  }
  span.btn {
    border: 1px solid black;
    padding: 5px 10px;
    cursor: pointer;
    white-space: nowrap;
  }
  span.searchBtn.btn {
    white-space: nowrap;
    margin-right: 5px;
    @media (max-width: 767px) {
      margin-top: 10px;
    }
  }
`;

export default SearchInput;
