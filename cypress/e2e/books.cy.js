describe("Books website testing", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
    cy.contains("Books list").should("be.visible");
  });

  it("Log in with valid data", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать ").should("be.visible");
  });

  it("Log in with empty email", () => {
    cy.login(" ", "test");
    cy.get("#mail")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Log in with empty password", () => {
    cy.login("test@test.com", "");
    cy.get("#pass")
      .then(($el) => $el[0].checkValidity())
      .should("be.false");
  });

  it("Should add books", () => {
    cy.login("test@test.com", "test");
    cy.addBook("Капитал", "К.Маркс");
    cy.contains("Капитал").should("be.visible");
  });

  it("Should add book to favourite", () => {
    cy.login("test@test.com", "test");
    cy.addBook("Незнайка на Луне", "Н.Носов");
    cy.contains("Add to favorite").click();
    cy.contains("Delete from favorite").should("be.visible");
  });

  it("Download checking", () => {
    cy.login("test@test.com", "test");
    cy.addBook("Сказка о попе и работнике его Балде", "А.С.Пушкин");
    cy.contains("Сказка о попе и работнике его Балде").click();
    cy.contains("Dowload book").should("be.visible");
  });
});
