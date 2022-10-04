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
          className="btn search"
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
  input {
    width: 300px;
    padding: 5px 10px;
    border-radius: 5px;
    margin-right: 10px;
    font-size: 18px;
    border: 1px solid rgba(224, 224, 224, 1);
  }
  span.btn {
    border: 1px solid black;
    padding: 5px 10px;
    cursor: pointer;
  }
  span.search.btn {
    margin-right: 5px;
  }
`;

export default SearchInput;
