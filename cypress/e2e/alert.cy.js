/// <reference types="cypress" />

describe('Work with alerts', () =>{
    before(() => { //Hook, função que é executada uma única vez antes de todos os testes serem executados
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => { //Hook, função que é executada antes de cada teste ser executado
        cy.reload()
    })
    it.only('Alert', () => {
       /* cy.get('#alert').click()
        cy.on('window:alert', msg => { // O on captura eventos que ocorrem na tela
            console.log(msg)
            expect(msg).to.be.equal('Alert Simples')
        }) */
        cy.clickAlert('#alert', 'Alert Simples')
    })
    it('Alert com mock', () => {
        const stub = cy.stub().as('alerta') // O "as" da um nome para o stub. O "stub" cria uma mock para  arâmetro que é passado no cy.on, substituindo a mensagem criada no IT(método de teste) acima
        cy.on('window:alert', stub)
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples') //calledWith verifica se o stub foi chamado com o parâmetro específico
        })
    })
    it('Confirm', () => {
        cy.on('window.confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Confirmado')
        })
        cy.get('#confirm').click()
    })
    it('Deny', () => {
        cy.on('window.confirm', msg => {
            expect(msg).to.be.equal('Confirm Simples')
            return false // Não funcionou igual ao curso
        })
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Negado')
        })
        cy.get('#confirm').click()
    })
    it('Prompt', () => {
        cy.window().then(win => {
            cy.stub(win, 'prompt').returns('42')
        })
        cy.on('window:confirm', msg => { // O prompt deve ser tratado de uma forma diferente
            expect(msg).to.be.equal('Era 42?')
        })

       cy.on('window:alert', msg => {
            expect(msg).to.be.equal(':D')
        })
        cy.get('#prompt').click()
    })
    //Com o form vazio, vai clicar em cadastrar, capturar a mensagem, depois vai preencher 
    //o nome com a mensagem, fazer o mesmo com o sobrenome e depois clicar no gênero do cadastro
    it('Desafio resolvido por mim', () => {
        cy.get('#formCadastrar', {timeout: 20000}).click()
        cy.on('window:alert', msg => {
            let nome = msg
            cy.get('#formNome').type(nome)
        })
        cy.get('#formCadastrar', {timeout: 20000}).click()
        cy.on('window:alert', msg => {
            let sobreNome = msg
            cy.get('[data-cy="dataSobrenome"]').type(sobreNome)
        })
        cy.get('#formSexoMasc', {timeout: 20000}).click()
        cy.get('#formCadastrar', {timeout: 20000}).click()
    })
    it('Desafio resolvido pelo professor', () => {
        //Cria o stub do alert
            const stub = cy.stub().as('alerta')
            cy.on('window:alert', stub)
        //Clica no botão e verifica se o alert chamado é o 'Nome eh obrigatorio'
        cy.get('#formCadastrar').click().then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))

        cy.get('#formNome').type('Wagner')
        cy.get('#formCadastrar').click().then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

        cy.get('[data-cy="dataSobrenome"]').type('Aquino')
        cy.get('#formCadastrar').click().then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))

        cy.get('#formSexoMasc').click()
        cy.get('#formCadastrar').click()

        cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

    })
})