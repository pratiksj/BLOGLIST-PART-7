describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    cy.visit("http://localhost:3000");

    const username = "Laxmi";
    const password = "123";
    // axios
    //   .post("/api/users", {
    //     username,
    //     name,
    //     password,
    //   })
    //   .then((response) => {
    //     console.log(response.data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    cy.request("POST", "http://localhost:3003/api/users", {
      username,
      password,
    });
  });

  it("Login form is shown", () => {
    cy.contains("Log into application");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("Laxmi");
      cy.get("#password").type("123");
      cy.get("#login-button").click();

      cy.contains("logged in");
    });

    // it("fails with wrong credentials", function () {
    //   cy.get("#username").type("testuser");
    //   cy.get("#password").type("testpssword");
    //   cy.get("#login-button").click();

    //   //cy.get(".notification").should("have.css", "color", "rgb(255, 0, 0)");
    //   //cy.contains("wrong credentials");
    // });
  });

  describe("When logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("#username").type("Laxmi");
      cy.get("#password").type("123");
      cy.get("#login-button").click();
      //cy.contains("new blog").click();
      // cy.get("#title").type("fkjsdlkafjdlskf");
      // cy.get("#author").type("sudsfjsdkjkdesh");
      // cy.get("#Url").type("adad.com");
      // cy.get("#submit").click();
    });

    it("A blog can be created", () => {
      cy.contains("new blog").click();
      cy.get("#title").type("tesla project");
      cy.get("#author").type("author");
      cy.get("#Url").type("www.com");
      cy.get("#submit").click();
      cy.contains("tesla project");
    });

    it("user can like a blog", () => {
      cy.contains("view").click();
      cy.contains("like").click();
      cy.contains("1");
    });

    it("user can delete a blog", () => {
      cy.contains("new blog").click();
      cy.get("#title").type("kathmandu");
      cy.get("#author").type("kathmanduieif");
      cy.get("#Url").type("amit.com");
      cy.get("#submit").click();

      cy.contains("view").click();
      cy.contains("remove").click();
      cy.contains("kathmandu").should("not.exist");
    });

    it.only("the blogs are ordered according to likes ", () => {
      cy.contains("new blog").click();
      cy.get("#title").type("something");
      cy.get("#author").type("somethingmore");
      cy.get("#Url").type("someting.com");
      cy.get("#submit").click();

      // adding exact text to cy.contains() to make sure that it wont match the text of the notification
      // cy.contains("something somethingmore").contains("view").click();
      // cy.get(".blog").contains("something").contains("view").click();
      cy.get(".blog").should("contain", "something");
      cy.get(".blog").contains("something").contains("view").click();
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "1");
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "2");
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "3");
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "4");

      cy.contains("Hide").click();

      cy.contains("new blog").click();
      cy.get("#title").type("something1");
      cy.get("#author").type("somethingmore1");
      cy.get("#Url").type("someting1.com");
      cy.get("#submit").click();
      cy.contains("something1 somethingmore1").contains("view").click();
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "1");
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "2");
      cy.get("#likeButton").click();
      cy.get("#like").should("contain", "3");

      cy.get(".blog").eq(0).should("contain", "something somethingmore");
      cy.get(".blog").eq(1).should("contain", "something1 somethingmore1");
    });
  });
});
