/// <reference types="cypress" />

import loc from '../../../support/locators'
import '../../../support/commandsContas'
import buildEnv from '../../../support/buildEnv'

describe('Should test at a functional level', function () {

    beforeEach(() => {  //Executa antes de cada teste
        buildEnv()
        cy.login('a@a', 'a')
    });

    after(() => { //Executa após o teste
        cy.clearLocalStorage()
    })

    it('Should create an account', () => {
        
        cy.intercept(
            'https://barrigarest.wcaquino.me/contas',
            {
                method: 'POST',
                response: 'fixture:movimentacaoSalva' //Indica que é uma fixture
            }
        ).as('pegarConta')

        cy.acessarMenuConta()
        
    })
    it('Should update an account', () => {

        cy.intercept(
            'https://barrigarest.wcaquino.me/contas',
            {
                method: 'GET',
                response: [
                    {
                        id: 1,
                        nome: 'Carteira',
                        visivel: true,
                        usuario_id: 1
                    }
                ]
            }
        ).as('contas')

        cy.intercept(
            'https://barrigarest.wcaquino.me/contas/**', //O ** substitui o ID que precisa ser passado, passando qualquer ID na url
            {
                method: 'PUT',
                response: [
                    {
                        id: 1,
                        nome: 'Conta de teste alterada',
                        visivel: true,
                        usuario_id: 1
                    }
                ]
            }
        ).as('pegarContaAlterada')
        
        cy.acessarMenuConta()
        cy.get(':nth-child(1) > :nth-child(2) > .fa-edit') //Locator muito fraco, no curso ele usou xpath que está descontinuado
        cy.get(loc.CONTAS.NOME).clear().type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'Conta atualizada com sucesso!')
    })

    it('Should not create an account with same name', () => {

        cy.intercept(
            'https://barrigarest.wcaquino.me/contas',
            {
                method: 'POST',
                response: [
                    {
                        error: 'Já existe uma conta com esse nome!',
                        status: 400
                    }
                ]
            }
        ).as('pegarContaMesmoNome')

        cy.acessarMenuConta()
        cy.get(loc.CONTAS.NOME).type('Conta alterada')
        cy.get(loc.CONTAS.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'code 400')
    })

    it('Should create a transaction', () => {

        cy.intercept(
            'https://barrigarest.wcaquino.me/transacoes',
            {
                method: 'POST',
                response: {
                    id: 31433,
                    descricao: 'asdadad',
                    envolvido: 'asdadad',
                    usuario_id: 1,
                    conta_id: 42069
                    //Terminar o objeto

                }
            }
        )

        //Utilizar outro intercept para pegar quantas LI necessitar

        cy.get(loc.MENU.MOVIMENTACAO).click()
        cy.get(loc.MOVIMENTACAO.DESCRICAO).type('Desc')
        cy.get(loc.MOVIMENTACAO.VALOR).type('123')
        cy.get(loc.MOVIMENTACAO.INTERESSADO).type('Inter')
        cy.get(loc.MOVIMENTACAO.CONTA).select('Conta para movimentacoes')
        cy.get(loc.MOVIMENTACAO.STATUS).click()
        cy.get(loc.MOVIMENTACAO.BTN_SALVAR).click()
        cy.get(loc.MESSAGE).should('contain', 'sucesso')
    })

    it.only('Should validate data send to create an account', () => {
        
        cy.intercept(
            'https://barrigarest.wcaquino.me/contas',
            {
                method: 'POST',
                response: {
                    id: 1,
                    nome: 'Conta de teste',
                    visivel: true,
                    usuario_id: 1
                },
                onRequest: req => {
                    expect(req.request.body.nome).to.be.empty //Validando campos dentro da requisição, se está preenchido ou não
                    expect(req.request.headers).to.have.property('Authorization')
                }
            }
        ).as('pegarContaEValidarDados')

        cy.acessarMenuConta()
        
    })

    it('Should test responsiveness', () => {
        cy.viewport(500, 700) //Define a dimensão da tela que o teste será executado
        cy.viewport('iphone-5') //Define a dimensão de um celular específico que o teste será executado
        //As verificações vem após o redimensionamento
    });

    it('Rodar pela linha de comando', () => {
        //Npx Cypress run
        //
    })
})