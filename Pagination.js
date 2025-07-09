
import React from "react";
import "../styles/Pagination.css";

const Pagination = ({ total, page, pageSize, onPageChange, onPageSizeChange }) => {
  const totalPages = Math.ceil(total / pageSize);
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, total);

  return (
    <div className="pagination-container">
      <span className="pagination-info">
        {start}-{end} of {total} items
      </span>

      <div className="pagination-controls">
        <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
          {"<"}
        </button>
        <button className="active" disabled>
          {page}
        </button>

        <button onClick={() => onPageChange(page + 1)} disabled={page === totalPages}>
          {">"}
        </button>
      </div>

      <div className="pagination-dropdown">
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
        >
          <option value={10}>10 / Page</option>
          <option value={20}>20 / Page</option>
          <option value={50}>50 / Page</option>
          <option value={100}>100 / Page</option>
        </select>
        <span className="dropdown-icon">▼</span>
      </div>
    </div>
  );
};

export default Pagination;
