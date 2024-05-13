/// <reference types="cypress" />

/*describe('Work with popup', () => {
    it('Deve testar frame diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })
    it.only('Deve verificar que o popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen') //O as cria um apelido para o stub criado
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called') //O @ indica que o que estamos chamando é um apelido de algo criado
    })   
})*/

describe('With Links', () => {

    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Check popup url', () => {
        cy.contains('Popup2').should('have.prop', 'href').and('equal', 'https://wcaquino.me/cypress/frame.html')
    })

    it('Should access popup dinamically', () => { //Estratégia útil quando o link não é fixo, fica variando
        cy.contains('Popup2').then($a => {
            const href = $a.prop('href')
            cy.visit(href)
            cy.get('#tfield').type('Funciona')
        })
    })

    it('Should force link on same page', () => {
        cy.contains('Popup2').invoke('removeAttr', 'target').click()
    })

})