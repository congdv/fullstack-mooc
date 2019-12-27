import React from "react"
import { render, fireEvent } from "@testing-library/react"
import Blog from "./Blog"

test("render Content", () => {
  const blog = {
    title: "Render Content",
    author: "Render Author",
    likes: 3
  }

  const component = render(<Blog blog={blog}/>)
  const div = component.container.querySelector(".invisibility")

  expect(component.container).toHaveTextContent("Render Content")
  expect(div).toHaveStyle("display: none")

})

test("When click blog post", () => {
  const blog = {
    title: "Render Content",
    author: "Render Author",
    likes: 3
  }
  const component = render(<Blog blog={blog}/>)
  const togglableButton = component.container.querySelector(".togglable")
  fireEvent.click(togglableButton)

  const div = component.container.querySelector(".invisibility")

  expect(div).not.toHaveStyle("display: none")
})
