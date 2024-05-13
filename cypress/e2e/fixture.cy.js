/// <reference types="cypress" />

describe('Fixtures é uma forma de popular o teste com dados previamente configurados', () => {
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    it('Get data form fixture file', function () {
        cy.fixture('userData').as('usuario').then(() => { //Cria uma fixture com o arquivo que foi configurado "userData"
            cy.get('#formNome').type(this.usuario.nome) //O this refencia o que está sendo invocado, no caso, o userData
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            cy.get(`[name=formSexo][value=${this.usuario.sexo}]`).click()
            cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}`).click()
            cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            cy.get('#formEsportes').select(this.usuario.esportes)
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
        })
    });
});