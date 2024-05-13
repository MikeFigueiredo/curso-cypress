/// <reference types="cypress" />

describe('Work with iframes', () => {
    it('Deve preencher campo de texto - Componentes', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.get('#frame1').then(iframe =>{
            const body = iframe.contents().find('body') //Contents captura o que contém dentro do elemento, o find encontra um elemento, no caso, uma tag
            cy.wrap(body).find('#tfield').type('Funcionou').should('have.value', 'Funcionou') // O body reotrnado pelo iframe n]ao é gerenciável pelo cypress, então o wrap é necessário
        })
    })
    it('Deve testar frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })
})