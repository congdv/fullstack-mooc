import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SimpleBlog from "./SimpleBlog";

test("render Content", () => {
  const blog = {
    title: "Render Content",
    author: "Render Author",
    likes: 3
  };

  const component = render(<SimpleBlog blog={blog}/>);

  expect(component.container).toHaveTextContent("Render Content");
  expect(component.container).toHaveTextContent("Render Author");
  expect(component.container).toHaveTextContent("blog has 3 likes");

});

test("Clicking like button", () => {
  const blog = {
    title: "Render Content",
    author: "Render Author",
    likes: 3
  };

  const mockHandler = jest.fn();

  const { getByText } = render(<SimpleBlog blog={blog} onClick={mockHandler}/>);

  const button = getByText("like");
  fireEvent.click(button);
  fireEvent.click(button);

  expect(mockHandler.mock.calls.length).toBe(2);
});