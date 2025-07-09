
import React, { useEffect, useState } from "react";
import CommentTable from "../components/CommentTable";
import Pagination from "../components/Pagination";
import "../styles/Dashboard.css";

const STORAGE_KEYS = {
  search: "comment_search",
  sortBy: "comment_sort_by",
  sortDir: "comment_sort_dir",
  pageSize: "comment_page_size",
  page: "comment_page"
};

const CommentsDashboard = () => {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = useState(localStorage.getItem(STORAGE_KEYS.search) || "");
  const [sortBy, setSortBy] = useState(localStorage.getItem(STORAGE_KEYS.sortBy) || "");
  const [sortDir, setSortDir] = useState(localStorage.getItem(STORAGE_KEYS.sortDir) || "");
  const [pageSize, setPageSize] = useState(Number(localStorage.getItem(STORAGE_KEYS.pageSize)) || 10);
  const [page, setPage] = useState(Number(localStorage.getItem(STORAGE_KEYS.page)) || 1);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then(res => res.json())
      .then(data => setComments(data));
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.search, search);
    localStorage.setItem(STORAGE_KEYS.sortBy, sortBy);
    localStorage.setItem(STORAGE_KEYS.sortDir, sortDir);
    localStorage.setItem(STORAGE_KEYS.pageSize, pageSize);
    localStorage.setItem(STORAGE_KEYS.page, page);
  }, [search, sortBy, sortDir, pageSize, page]);

  const filtered = comments.filter(c =>
    [c.name, c.email, c.body].some(field =>
      field.toLowerCase().includes(search.toLowerCase())
    )
  );

  const sorted = [...filtered].sort((a, b) => {
    if (!sortBy || !sortDir) return 0;
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (typeof valA === "number" && typeof valB === "number") {
      return sortDir === "asc" ? valA - valB : valB - valA;
    }

    return sortDir === "asc"
      ? valA.toString().localeCompare(valB.toString())
      : valB.toString().localeCompare(valA.toString());
  });

  const startIdx = (page - 1) * pageSize;
  const paginated = sorted.slice(startIdx, startIdx + pageSize);

  const handleSort = (column) => {
    if (sortBy === column) {
      const next = sortDir === "asc" ? "desc" : sortDir === "desc" ? "" : "asc";
      setSortDir(next);
      if (!next) setSortBy("");
    } else {
      setSortBy(column);
      setSortDir("asc");
    }
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-controls">
        <button onClick={() => handleSort("postId")}>Sort Post ID</button>
        <button onClick={() => handleSort("name")}>Sort Name</button>
        <button onClick={() => handleSort("email")}>Sort Email</button>
        <input
          type="text"
          placeholder="Search name, email, comment"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
      </div>
      <CommentTable
        comments={paginated}
        sortBy={sortBy}
        sortDir={sortDir}
        onSort={handleSort}
      />
      <Pagination
        total={filtered.length}
        page={page}
        pageSize={pageSize}
        onPageChange={setPage}
        onPageSizeChange={(size) => {
          setPageSize(size);
          setPage(1);
        }}
      />
    </div>
  );
};

export default CommentsDashboard;

