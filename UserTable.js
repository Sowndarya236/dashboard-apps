
import React, { useState } from "react";
import data from "../data/data.json";
import "../styles/UserTable.css";
import { useNavigate } from "react-router-dom";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const navigate = useNavigate();

  
  const filteredData = data.filter((item) => {
    const term = search.toLowerCase();
    return (
      item.id.toString().includes(term) ||
      item.name.toLowerCase().includes(term) ||
      item.email.toLowerCase().includes(term) ||
      item.body.toLowerCase().includes(term)
    );
  });

  
  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortField) return 0;

    const aValue = a[sortField];
    const bValue = b[sortField];

    let result = 0;

    if (typeof aValue === "number" && typeof bValue === "number") {
      result = aValue - bValue;
    } else {
      result = String(aValue).localeCompare(String(bValue));
    }

    return sortOrder === "asc" ? result : -result;
  });

  
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const startIndex = (page - 1) * pageSize;
  const currentData = sortedData.slice(startIndex, startIndex + pageSize);

  
  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  return (
    <div className="table-container">
      <div className="controls">
        <button onClick={() => handleSort("id")}>Sort Post ID</button>
        <button onClick={() => handleSort("name")}>Sort Name</button>
        <button onClick={() => handleSort("email")}>Sort Email</button>
        <input
          type="text"
          placeholder="Search name, email, comment"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>Post ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Comment</th>
          </tr>
        </thead>
        <tbody>
          {currentData.map((user) => (
            <tr
              key={user.id}
              className="clickable-row"
              onClick={() => navigate(`/profile/${user.id}`)}
            >
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.body.slice(0, 40)}...</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="pagination">
        <div>
          Page {page} of {totalPages}
        </div>
        <div>
          <button disabled={page === 1} onClick={() => setPage(page - 1)}>
            Prev
          </button>
          <button disabled={page === totalPages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
        <div>
          <select
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1); 
            }}
          >
            <option value={5}>5 / Page</option>
            <option value={10}>10 / Page</option>
            <option value={20}>20 / Page</option>
            <option value={50}>50 / Page</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default UserTable;
