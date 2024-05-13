/// <reference types="cypress" />

describe('Dinamic tests', () => {

    beforeEach(() => {

        cy.visit('https://wcaquino.me/cypress/componentes.html')

    });

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']

    foods.forEach((food) => { //Nesse exemplo, o forEach foi utilizado para percorrer o array, executando um teste diferente com cada um dos indíces do array
        it(`Cadastro com ${food}`, () => {
            cy.get('#formNome').type('Usuário') //O this refencia o que está sendo invocado, no caso, o userData
            cy.get('#formSobrenome').type('Qualquer')
            cy.get(`[name=formSexo][value=M]`).click()
            cy.get('#formComidaFavorita').contains(food)
            //cy.get(`[name=formComidaFavorita][value=${this.usuario.comida}`).click()
            //cy.get('#formEscolaridade').select(this.usuario.escolaridade)
            //cy.get('#formEsportes').select(this.usuario.esportes)
        });
    })

    it.only('Deve selecionar todos de uma vez utilizando o each', () => {
        cy.get('#formNome').type('Usuário') //O this refencia o que está sendo invocado, no caso, o userData
        cy.get('#formSobrenome').type('Qualquer')
        cy.get(`[name=formSexo][value=M]`).click()
        //cy.get('[name=formComidaFavorita]').click({multiple: true})
        cy.get('[name=formComidaFavorita]').each($el => { // O Each do Cypress imita o forEach do JS, percorre o elemento até encontrar todos os índices
           // $el.click() //Depreciado
           if($el.val() !== 'vegetariano') //val é uma função que verifica o valor passado
                cy.wrap($el).click()
        })
        cy.get('#formEscolaridade').select('Doutorado')
        cy.get('#formEsportes').select('Corrida')
        cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
    });

});