/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsContas'

describe('Should test at a functional level', () => {
    before(() => { //Acessa a página e executa o login
        cy.login('a@a', 'a')
        //cy.visit('https://barrigareact.wcaquino.me')
        //cy.get(loc.LOGIN.USER).type('a@a')
        //cy.get(loc.LOGIN.PASSWORD).type('a')
        //cy.get(loc.LOGIN.BTN_LOGIN, {timeout: 60000}).click()
        //cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
    })

    beforeEach(() => {
        //cy.get(loc.MENU.HOME) // CRIAR A HOME NOS LOCATORS
        cy.resetApp()
    });

    it('Should create an account', () => {
        cy.acessarMenuConta()
        cy.inserirConta('Teste de cadastro')
        cy.get(loc.MESSAGE).should('contain', 'Conta inserida com sucesso')
    })
    it('Should update an account', () => {
        cy.acessarMenuConta()
        cy.get(':nth-child(1) > :nth-child(2) > .fa-edit') //Locator muito fraco, no curso ele usou xpath que está descontinuado
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {
        cy.acessarMenuConta()

        cy.get(loc.CONTAS.NOME).type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {
        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

    it('Should get balance', () => {
        //Utilizou XPATH
    })
    it('Should remove a transaction', () => {
        //Utilizou XPATH
    })
})