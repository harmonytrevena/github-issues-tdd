import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Issue from "../components/issue";

let container = null;
beforeEach(() => {
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

it("renders issue data", async () => {
  const fakeIssue = {
    url: "https://api.github.com/repos/facebook/create-react-app/issues/7971",
    id: 521713667,
    title: "A feature to use package.json imports in create-react-app.",
    body:
      "While making an atomic design pattern with create-react-app and a component driven folder structure, i want to use package.json imports to import my components in the app."
  };

  jest.spyOn(global, "fetch").mockImplementation(() =>
    Promise.resolve({
      json: () => Promise.resolve(fakeIssue)
    })
  );

  await act(async () => {
    render(<Issue issue={fakeIssue} />, container);
  });

  expect(container.querySelector("h2").textContent).toBe(fakeIssue.title);
  expect(container.querySelector("a").textContent).toBe(fakeIssue.url);
  expect(container.textContent).toContain(fakeIssue.body);

  global.fetch.mockRestore();
});