import React, { useState } from "react";
import s from "./Paginator.module.css";

type PropsType = {
  totalUsersCount: number;
  handlePageClick: (page: number, pageSize: number) => void;
  pageSize: number;
  currentPage: number;
  portionSize?: number;
};

function Paginator({
  totalUsersCount,
  handlePageClick,
  pageSize = 20,
  currentPage = 1,
  portionSize = 20,
}: PropsType) {
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages: Array<number> = [];
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i);
  }

  const totalPortions = Math.ceil(pagesCount / portionSize);
  let [currentPortion, setCurrentPortion] = useState(
    Math.ceil(currentPage / portionSize)
  );
  const lesserPortionBorder = (currentPortion - 1) * portionSize;
  const biggerPortionBorder = currentPortion * portionSize + 1;

  return (
    <>
      <div className={s.setsWrapper}>
        <button
          className={s.pagesSetBtn}
          onClick={() => setCurrentPortion(currentPortion - 10)}
          disabled={currentPortion <= 10}
        >
          &#60;&#60;
        </button>
        <button
          className={s.pagesSetBtn}
          onClick={() => setCurrentPortion(currentPortion - 1)}
          disabled={currentPortion === 1}
        >
          &#60;
        </button>
        {/* <span className={s.setsText}>
          Total pages sets: {totalPortions}, current pages set: {currentPortion}
        </span> */}
        <ul className={s.pages}>
          {pages
            .filter(
              (page) => lesserPortionBorder < page && page < biggerPortionBorder
            )
            .map((page) => {
              return (
                <li key={page}>
                  <button
                    onClick={() => {
                      handlePageClick(page, pageSize);
                    }}
                    className={`${s.page} ${
                      page === currentPage && s.activePage
                    }`}
                  >
                    {page}
                  </button>
                </li>
              );
            })}
        </ul>
        <button
          className={s.pagesSetBtn}
          onClick={() => setCurrentPortion(currentPortion + 1)}
          disabled={currentPortion === totalPortions}
        >
          &#62;
        </button>
        <button
          className={s.pagesSetBtn}
          onClick={() => setCurrentPortion(currentPortion + 10)}
          disabled={currentPortion >= totalPortions - 10}
        >
          &#62; &#62;
        </button>
      </div>
    </>
  );
}

export default Paginator;
