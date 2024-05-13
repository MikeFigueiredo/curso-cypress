/// <reference types="cypress" />

describe('Using time', () => {
    before(() => {

        cy.visit('https://wcaquino.me/cypress/componentes.html')

    })

    it('Going back to the past', () => {

        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '16/12/2023')

        //cy.clock() // Função utilizada para sobreescrever a data que será controlada de forma sincronizada com o tick

        //cy.get('#buttonNow').click() 
        //cy.get('#resultado > span').should('contain', '16/12/2023')

        const dt = new Date(2012, 3, 10, 15, 23, 50) // Composta por -> Ano, mês, dia, hora, minuto e segundo (o mês é indexado no zero, então janeiro é 0)
        cy.clock(dt.getTime()) // Sintaxe para atribuir uma determinada data ao clock

        cy.get('#buttonNow').click() 
        cy.get('#resultado > span').should('contain', '10/04/2012')
    })

    it.only('Goes to the future', () => {
        
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').should('contain', '17027')
        cy.get('#resultado > span').invoke('text').should('gt', 1700304) //o gt no should pergunta se o texto invocado é maior do que o parâmetro passado dentro do should

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('lte', 0)
        cy.tick(5000) //Avança o tempo do clock (passa o tempo)
    });
});