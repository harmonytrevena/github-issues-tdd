import React, { Component } from "react";
import { loadData } from "../utils/loadData";
import Issue from "./issue";

class IssueList extends Component {
  state = {
    issues: []
  };

  async componentDidMount() {
    const issues = await loadData(
      `https://api.github.com/repos/facebook/create-react-app/issues`
    );

    this.setState({
      issues
    });
  }

  render() {
    const { issues } = this.state;

    return (
      <ul>
        {issues.map(issue => (
          <Issue key={issue.id} issue={issue} />
        ))}
      </ul>
    );
  }
}

export default IssueList;
