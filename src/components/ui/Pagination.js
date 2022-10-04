import { useState, useEffect } from "react";
import styled from "styled-components";

const Pagination = ({ currentPage, totalPages, onClickPage }) => {
  const [pageArr, setPageArr] = useState([1]);

  useEffect(() => {
    let arr = [];
    for (var i = 1; i <= totalPages; i++) {
      arr.push(i);
    }
    setPageArr(arr);
  }, [totalPages]);

  return (
    <PaginationWrap>
      {pageArr.map((page) => {
        return (
          <span
            key={page}
            className={page === currentPage ? "current pageItem" : "pageItem"}
            onClick={() => {
              onClickPage(page);
            }}
          >
            {page}
          </span>
        );
      })}
    </PaginationWrap>
  );
};

const PaginationWrap = styled.div`
  .pageItem {
    margin: 0 5px;
    color: gray;
    cursor: pointer;
  }
  .pageItem.current {
    color: black;
    font-weight: bold;
  }
`;

export default Pagination;
