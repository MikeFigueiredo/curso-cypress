/// <reference types="cypress" />

describe('Helpers', () => {
    it('Wrap', () => {
        const obj = { nome: 'User', idade: 20}
        expect(obj).to.have.property('nome')
        cy.wrap(obj).should('have.property', 'nome') // O Wrap encapsula o objeto para que o Cypress possa utilizar, com o should, por exemplo

        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').then($el => {
            $el.val('funciona via jquery')
        })

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(10)
            }, 500)
        })

        cy.get('#buttonSimple').then(() => console.log('Encontrei o primeiro botão'))
        //promise.then(num => console.log(num)) //Sempre deixar o Cypress resolver as Promises e a sequência de processamento
        cy.wrap(promise).then(retorno => console.log(retorno)) // O wrap consegue resolver uma promise
        cy.get('#buttonSimple').then(() => console.log('Encontrei o segundo botão'))
    })
    it('Its..', () => { // O Its serve para referênciar as propriedades ds objetos
        const obj = { nome: 'User', idade: 20}
        cy.wrap(obj).should('have.property', 'nome', 'User')
        cy.wrap(obj).its('nome').should('be.equal', 'User')
        const obj2 = {nome: 'User', idade: 20, endereco: {rua: 'Rua do 8'}}
        cy.wrap(obj2).its('endereco').should('have.property', 'rua')
        cy.wrap(obj2).its('endereco').its('rua').should('contain', '8')
    })
    it.only('Invoke', () => {
        const getValue = () => 1
        const soma = (a, b) => a + b 
        cy.wrap({funcao: getValue}).invoke('funcao').should('be.equal', 1)
        cy.wrap({funcao: soma}).invoke('funcao', 5, 5).should('be.equal', 10)
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#formNome').invoke('val', 'Texto via Invoke')
    })
})