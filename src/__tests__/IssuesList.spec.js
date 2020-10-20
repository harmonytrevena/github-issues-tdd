import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import IssuesList from "../components/IssuesList";

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders issue data", async () => {
  const fakeIssue = {
    title: "Github isn't working"
  };
  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeIssue)
    })
  );

  // Use the asynchronous version of act to apply resolved promises
  await act(async () => {
    render(<IssuesList issue="9834" />, container);
  });

  expect(container.querySelector("summary").textContent).toBe(fakeIssue.title);

  // remove the mock to ensure tests are completely isolated
  global.fetch.mockRestore();
});