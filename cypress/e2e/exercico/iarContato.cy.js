// <reference types="cypress" />

describe("Testando inclusão, alteração e remoção de contato", () => {
  // Visitar página antes de cada teste
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/");
  });

  it("Deve adicionar um novo contato", () => {
    cy.get('input[placeholder="Nome"]').type("Sanatiel Borges");
    cy.get('input[placeholder="E-mail"]').type("sanatiel.borges@example.com");
    cy.get('input[placeholder="Telefone"]').type("123456789");
    cy.get("button.adicionar").click();
    cy.get("ul").contains("li", "Sanatiel Borges").should("be.visible");
  });

  it("Deve alterar um contato existente", () => {
    cy.contains("li", "gian Souza", { timeout: 10000 }).should("be.visible");
    cy.get("ul")
      .contains("li", "gian Souza")
      .parent()
      .parent()
      .siblings()
      .find(".edit")
      .click();
    cy.get('input[placeholder="Nome"]').clear().type("gian Souza Jr.");
    cy.get('input[placeholder="E-mail"]').clear().type("gian.jr@example.com");
    cy.get('input[placeholder="Telefone"]').clear().type("987654321");
    cy.get("button.alterar").click();
    cy.get("ul").contains("li", "gian Souza Jr.").should("be.visible");
  });

  it("Deve remover um contato existente", () => {
    cy.contains("li", "Bruna Costa", { timeout: 10000 }).should("be.visible");
    cy.get("ul")
      .contains("li", "Bruna Costa")
      .parent()
      .parent()
      .siblings()
      .find(".delete")
      .click();
    cy.contains("li", "Bruna Costa").should("not.exist");
  });
});
