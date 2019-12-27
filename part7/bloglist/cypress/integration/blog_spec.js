

describe("Blog List App", function() {
  beforeEach(function() { 
    cy.request("POST", "http://localhost:3001/api/testing/reset")
    const user = {
      name: "tester",
      username: "tester",
      password: "testing"
    }
    cy.request("POST","http://localhost:3001/api/users",user)
    cy.visit("http://localhost:3000")  
  })
  describe("User Log in", function() {
    it("Login", function() {
      cy.contains("log in").click()
      cy.get("input:first").type("tester")
      cy.get("input:last").type("testing")
      cy.get("button").contains("Login").click()
      cy.contains("tester logged in")
    })
  })
  describe("When user logged in", function() {
    beforeEach(function() {
      cy.contains("log in").click()
      cy.get("input:first").type("tester")
      cy.get("input:last").type("testing")
      cy.get("button").contains("Login").click()
    })
    it("name of the user is shown", function() {
      cy.contains("tester logged in")
    })
    it("a new blog is created", function() {
      cy.contains("new blog").click()
      cy.get("#title").type("Title for testing")
      cy.get("#author").type("Author for testing")
      cy.get("#url").type("URL for testing")
      cy.contains("Create").click()
      cy.contains("Title for testing")
    })
  })
})