/// <reference types="cypress" />

describe('Esperas', () => {
    before(() => { //Hook, função que é executada uma única vez antes de todos os testes serem executados
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => {
        cy.reload()
    })
    it('Deve aguardar elemento estar disponível', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funcionou')
    })
    it('Deve fazer retrys', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('exist').should('not.exist') // O cypress irá realizar retentativas até o tempo estourar e a assertiva/get serem negativos
    })
    it('Uso do find', () => {
        //cy.get('#buttonList').click()
        //cy.get('#lista li').find('span').should('contain', 'Item 1') // O find procura um elemento que foi previamente filtrado pelo locator
       // cy.get('#lista li').find('span').should('contain', 'Item 2')
        //cy.get('#lista > :nth-child(1) > span')
        //cy.get('#lista > :nth-child(2) > span')
        cy.get('#buttonListDOM').click()
        cy.get('#lista li').find('span').should('contain', 'Item 1') // O find procura um elemento que foi previamente filtrado pelo locator
        cy.get('#lista li').find('span').should('contain', 'Item 2')
    })
    it('Uso do timeout', () => {
        cy.get('#buttonDelay').click()
        cy.wait(5000) // Causa uma pausa no sistema, não deve ser utilizado, só em casos extremos, sempre usar o parâmetro timeout
        cy.get('#novoCampo').should('exist')
        //cy.get('#novoCampo', {timeout: 1000}).should('exist') // O parâmetro timeout determina em quantos milissegundos o get deve ocorrer
    })
    it('Click retry', () => {
        cy.get('#buttonCount').click().click().should('have.value', '111') 
    })
    it.only('Should vs Then', () => { 
        //Diferença 1 - O Then ele aguarda que a busca(get) fosse finalizada para executar o comando, o should fica sendo executado ao longo da espera
        //Diferença 2 - O should ignora o que está dentro do return, ele sempre retorna o elemento que recebeu, no Then eu posso controlar isso com o return
        //Diferença 3 - o cy.get não funciona dentro de uma arrow function escrita com o should porque o should fica retentando e isso deixa o get maluco
        cy.get('#buttonListDOM').click()
        //cy.get('#lista li span').debug()
        cy.get('#lista li span').then($el => {
            expect($el).to.have.length(1)
        })
        cy.get('#buttonListDOM').should($el =>{
            expect($el).to.have.length(1)
            return 2
        }).and('have.id', 'buttonListDOM')
    })
})