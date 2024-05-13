// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import loc from './locators'

//Os Commands funcionam como as funções na programação, servem para criar blocos de códigos específicos para serem reutilizados

Cypress.Commands.add('clickAlert', (locator, message) => { 
    cy.get(locator).click()
    cy.on('window:alert', msg => {
        expect(msg).to.be.equal(message)
    })
})

Cypress.Commands.add('login', (user, passwd) => {
    cy.visit('https://barrigareact.wcaquino.me')
    cy.get(loc.LOGIN.USER).type(user)
    cy.get(loc.LOGIN.PASSWORD).type(passwd)
    cy.get(loc.LOGIN.BTN_LOGIN, {timeout: 60000}).click()
    cy.get(loc.MESSAGE).should('contain', 'Bem vindo')
})

Cypress.Commands.add('resetApp', () => {
    cy.get(loc.MENU.SETINGS).click()
    cy.get(loc.MENU.RESET).click()
})

Cypress.Commands.add('getToken', (user, password) => {
    cy.request({
        method: 'POST',
        url: 'https://barrigarest.wcaquino.me/signin',
        body: {
            email: user,
            redirecionar: false,
            senha: password
        }
    }).its('body.token')
        .should('not.be.empty')
            .then(token => {
                Cypress.env('token', token) //Armazena uma variável de ambiente no Cypress
                return token
            })
})

Cypress.Commands.add('resetRest', () => {
    cy.getToken('a@a', 'a').then(token => {
        cy.request({
            method: 'get',
            url: 'https://barrigarest.wcaquino.me/reset',
            headers: {
                Authorization: `JWT ${token}`
            }
        }).its('status').should('be.equal', 200)
    })
    
})

Cypress.Commands.overwrite('request', (originalFunction, ...options) => { //O overwrite sobreescreve uma função já existente
    if(options.length == 1){
        if(Cypress.env('token')) {
           options[0].headers = {
                Authorization: `JWT ${Cypress.env('token')}`
            }
        }
    }

    return originalFunction(...options)
})