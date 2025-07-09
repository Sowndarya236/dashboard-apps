import React from "react";
import "../styles/commentTable.css";

const CommentTable = ({ comments, sortBy, sortDir, onSort }) => {
  const renderSortIcon = (col) => {
    if (sortBy !== col) return "⇅";
    return sortDir === "asc" ? "↑" : sortDir === "desc" ? "↓" : "⇅";
  };

  return (
    <table className="comment-table">
      <thead>
        <tr>
          <th onClick={() => onSort("postId")}>Post ID {renderSortIcon("postId")}</th>
          <th onClick={() => onSort("name")}>Name {renderSortIcon("name")}</th>
          <th onClick={() => onSort("email")}>Email {renderSortIcon("email")}</th>
          <th>Comment</th>
        </tr>
      </thead>
      <tbody>
        {comments.map((comment) => (
          <tr key={comment.id}>
            <td>{comment.postId}</td>
            <td>{comment.name}</td>
            <td>{comment.email}</td>
            <td className="comment-cell">{comment.body}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CommentTable;


