/// <reference types="cypress" />

describe('Work with basic elements', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => {
        cy.reload()
    });
    it('Using Jquery selector', () => {
        cy.get(':nth-child(2) > :nth-child(1) > :nth-child(3) > input') // Caminho do Cypress
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input') // Caminho diminuindo o escopo pelas tags e restrições de filho direto, posição de índice e tag
        cy.get("[onclick*='Francisco']") //Caminho pelo onclick da tag
        cy.get("#tabelaUsuarios td:contains('Doutorado'):eq(0) ~ td:eq(3) > input") // Pegando o elemento utilizando o sibling (irmão), o ~ indica que é o irmão que precisa ser capturado
        cy.get("#tabelaUsuarios tr:contains('Doutorado'):eq(0) td:eq(6) input") //Buscando pela <tr>
    })
});