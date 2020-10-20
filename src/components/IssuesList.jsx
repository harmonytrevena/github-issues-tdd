import React, { useEffect, useState } from 'react';
// import Issue from './Issue';

const IssuesList = props => {
    const [issues, setIssues] = useState(null);

    async function fetchData(number) {
        const response = await fetch("https://api.github.com/repos/facebook/create-react-app/issues/" + number);
        setIssues(await response.json());
    }

    useEffect(() => {
        fetchData(props.number);
    }, [props.number]);

  if (!issues) {
    return "loading...";
  }

  return (
    <details>
      <summary>{issues.title}</summary>
      <summary>{issues.body}</summary>
    </details>
  );
}
  
export default IssuesList;
