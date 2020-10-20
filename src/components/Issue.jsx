import React from "react";

const Issue = ({ issue }) => (
  <>
    <h2>{issue.title}</h2>
    <p>
      <a href={issue.url}>{issue.url}</a>
    </p>
    <p>{issue.body}</p>
  </>
);
export default Issue;