import React from "react"
import { render, waitForElement } from "@testing-library/react"
jest.mock("./services/blogs")
import App from "./App"


describe("<App />", () => {
  test("if no user logged, blogs are not rendered", async () => {
    const component = render(<App/>)
    component.rerender(<App/>)

    await waitForElement(
      () => component.getByText("login")
    )
    const blogs = component.container.querySelectorAll(".blog")

    expect(blogs.length).toBe(0)
  })

  test("when user logged in, blogs are render", async() => {
    // const user = {
    //   username: "tester",
    //   token: "12323232",
    //   name:"Donal Tester"
    // }

    // localStorageMock.setItem("loggedBlogListUser", JSON.stringify(user))
  })
})