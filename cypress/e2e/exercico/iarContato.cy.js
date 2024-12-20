describe("Testando inclusão, alteração e remoção de contato", () => {
  // Visitar página antes de cada teste
  beforeEach(() => {
    cy.visit("https://agenda-contatos-react.vercel.app/");
  });

  it("Deve adicionar um contato com nome aleatório", () => {
    const nomesAleatorios = [
      "Sanatiel Borges",
      "Tom Jerry",
      "Alice Bob",
      "Charlie Delta",
      "Eve Frank",
    ];
    const nomeAleatorio =
      nomesAleatorios[Math.floor(Math.random() * nomesAleatorios.length)];

    cy.get('input[placeholder="Nome"]').type(nomeAleatorio);
    cy.get('input[placeholder="E-mail"]').type(
      `${nomeAleatorio.toLowerCase().replace(" ", ".")}@example.com`
    );
    cy.get('input[placeholder="Telefone"]').type("444444444");
    cy.get("button.adicionar").click();
    // Verificação adicional para confirmar que o contato foi adicionado corretamente
    cy.get("ul").contains("li", nomeAleatorio).should("be.visible");
    cy.get("ul")
      .contains(
        "li",
        `${nomeAleatorio.toLowerCase().replace(" ", ".")}@example.com`
      )
      .should("be.visible");
    cy.get("ul").contains("li", "444444444").should("be.visible");
  });

  it("Deve alterar o segundo contato para um nome aleatório", () => {
    const nomesAleatorios = [
      "Tom Jerry",
      "Alice Bob",
      "Charlie Delta",
      "Eve Frank",
    ];
    const nomeAleatorio =
      nomesAleatorios[Math.floor(Math.random() * nomesAleatorios.length)];

    // Seleciona a segunda ocorrência da div
    cy.get("div.sc-beqWaB.eQdhbg.contato")
      .eq(1)
      .within(() => {
        cy.get(".edit").click();
      });
    // Altera os dados do contato para um nome aleatório
    cy.get('input[placeholder="Nome"]').clear().type(nomeAleatorio);
    cy.get('input[placeholder="E-mail"]')
      .clear()
      .type(`${nomeAleatorio.toLowerCase().replace(" ", ".")}@example.com`);
    cy.get('input[placeholder="Telefone"]').clear().type("987654321");
    cy.get("button.alterar").click();
    cy.wait(500); // Espera adicional para garantir que a alteração seja aplicada
    // Verifica se o contato foi alterado corretamente
    cy.get("div.sc-beqWaB.eQdhbg.contato")
      .eq(1)
      .within(() => {
        cy.contains("li", nomeAleatorio).should("be.visible");
        cy.contains(
          "li",
          `${nomeAleatorio.toLowerCase().replace(" ", ".")}@example.com`
        ).should("be.visible");
        cy.contains("li", "987654321").should("be.visible");
      });
  });

  it("Deve remover a terceira ocorrência da div contato", () => {
    // Seleciona a terceira ocorrência da div
    cy.get("div.sc-beqWaB.eQdhbg.contato")
      .eq(2)
      .within(() => {
        cy.get(".delete").click();
      });
    cy.wait(500); // Aumenta o tempo de espera para garantir que a remoção seja aplicada
  });
});
