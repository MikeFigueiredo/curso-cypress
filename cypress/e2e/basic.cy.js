/// <reference types="cypress" />

describe('Cypress basic', () =>{
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html') // Acessa uma página web
       // const title = cy.title()    - Não deve ser utilizado dessa forma devido a necessidade de assíncronismo
       // console.log(title)          - Não deve ser utilizado dessa forma devido a necessidade de assíncronismo

       let syncTitle

       //Desafio - Imprimir o title no console e escrever o title em um campo de texto
        cy.title().then(title => {
            console.log(title)
            cy.get('#formNome').type(title)
            syncTitle = title
        })


       cy.pause() // Pausa a execução até que o executor do teste libere o processamento na ferramenta.

       cy.title().should('to.be.equal', 'Campo de Treinamento') // O should funciona como o expect, uma sintaxe diferente para uma assertiva
       cy.title().should('contain', 'Campo').debug // O debug fornece mais detalhes sobre determinado ponto.
       cy.title().should('to.be.equal', 'Campo de Treinamento').should('contain', 'Campo') // O Should pode ser encadeado, vários em uma sentença
       cy.title().should('to.be.equal', 'Campo de Treinamento').and('contain', 'Campo') // O and pode ser usado como substituto a partir do segundo should
    })

    it('Should find and interact with an element', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html') // Acessa uma página web
        cy.get('#buttonSimple').click() //buscar um elemento na página
        cy.get('#buttonSimple').should('have.value', 'Obrigado!') // Verifica se o elemento possui determinado valor
    })
})

