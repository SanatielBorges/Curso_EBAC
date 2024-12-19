// <reference types="cypress" />

describe("Testando inclusão, alteração e remoção de contato", () => {
  // Visitar página antes de cada teste
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/");
  });

  it("Deve adicionar contato Sanatiel Borges", () => {
    cy.get('input[placeholder="Nome"]').type("Sanatiel Borges");
    cy.get('input[placeholder="E-mail"]').type("sanatiel.borges@example.com");
    cy.get('input[placeholder="Telefone"]').type("444444444");
    cy.get("button.adicionar").click();
    // Verificação adicional para confirmar que o contato foi adicionado corretamente
    cy.get("ul").contains("li", "Sanatiel Borges").should("be.visible");
    cy.get("ul")
      .contains("li", "sanatiel.borges@example.com")
      .should("be.visible");
    cy.get("ul").contains("li", "444444444").should("be.visible");
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
    cy.get('input[placeholder="Nome"]').clear().type("Tom Jerry");
    cy.get('input[placeholder="E-mail"]').clear().type("tom.jerry@example.com");
    cy.get('input[placeholder="Telefone"]').clear().type("987654321");
    cy.get("button.alterar").click();
    cy.wait(500); // Espera adicional para garantir que a alteração seja aplicada
    cy.get("ul").contains("li", "Tom Jerry").should("be.visible");
    // Verificação adicional para confirmar que o contato foi alterado corretamente
    cy.get("ul")
      .contains("li", "gian Souza", { timeout: 10000 })
      .should("not.exist");
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
    cy.contains("li", "Bruna Costa", { timeout: 15000 }).should("not.exist");
    // Verificação adicional para garantir que o contato foi removido corretamente
    cy.get("ul").contains("li", "Bruna Costa").should("not.exist");
  });
});
