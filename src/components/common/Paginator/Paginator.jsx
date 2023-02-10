import { useState } from "react";
import s from "./Paginator.module.css";

function Paginator({
  totalUsersCount,
  handlePageClick,
  pageSize = 20,
  currentPage = 1,
  portionSize = 20,
}) {
  const pagesCount = Math.ceil(totalUsersCount / pageSize);
  const pages = [];
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
      <button
        onClick={() => setCurrentPortion(currentPortion - 1)}
        disabled={currentPortion === 1}
      >
        &larr;
      </button>
      <span>
        Total pages: {totalPortions}, current page: {currentPortion}
      </span>
      <button
        onClick={() => setCurrentPortion(currentPortion + 1)}
        disabled={currentPortion === totalPortions}
      >
        &rarr;
      </button>
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
    </>
  );
}

export default Paginator;
