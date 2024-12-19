// <reference types="cypress" />

describe("Testando inclusão, alteração e remoção de contato", () => {
  // Visitar página antes de cada teste
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/");
  });

  const adicionarContato = (nome, email, telefone) => {
    cy.get('input[placeholder="Nome"]').type(nome);
    cy.get('input[placeholder="E-mail"]').type(email);
    cy.get('input[placeholder="Telefone"]').type(telefone);
    cy.get("button.adicionar").click();
    cy.get("ul").contains("li", nome).should("be.visible");
  };

  it("Deve adicionar contatos iniciais", () => {
    const contatos = [
      {
        nome: "Roberta Marques",
        email: "roberta.marques@example.com",
        telefone: "123456789",
      },
      { nome: "gian Souza", email: "gian@example.com", telefone: "987654321" },
      {
        nome: "Bruna Costa",
        email: "bruna@example.com",
        telefone: "555555555",
      },
      {
        nome: "Carlos Oliveira",
        email: "carlos@example.com",
        telefone: "333333333",
      },
    ];

    contatos.forEach((contato) => {
      adicionarContato(contato.nome, contato.email, contato.telefone);
      // Verificação adicional para confirmar que o contato foi adicionado corretamente
      cy.get("ul").contains("li", contato.nome).should("be.visible");
      cy.get("ul").contains("li", contato.email).should("be.visible");
      cy.get("ul").contains("li", contato.telefone).should("be.visible");
    });
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
    cy.contains("li", "Bruna Costa").should("not.exist", { timeout: 10000 });
    // Verificação adicional para garantir que o contato foi removido corretamente
    cy.get("ul").contains("li", "Bruna Costa").should("not.exist");
  });
});
