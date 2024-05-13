///<reference types="cypress" />

describe('backend', () => {

    let token

    before(() => {
        cy.getToken('a@a', 'a')
            .then(tkn => {
                token = tkn
            })
    })

    beforeEach(() => {
        cy.resetRest()
    });
    
    it('Should create an account', () => {

        cy.request({
            method: 'POST',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: {
                Authorization: `JWT ${token}`
            },
            body: {
                nome: 'Conta via rest 11'
            }
        }).as('response')

        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
        })
        
    });

    it('Should update an account', () => {

        cy.request({
            method: 'GET',
            url: 'https://barrigarest.wcaquino.me/contas',
            headers: {
                Authorization: `JWT ${token}`
            },
            qs: {
                nome: 'Conta via rest 11'
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                url:`https://barrigarest.wcaquino.me/contas/${res.body[0].id}`,
                headers: {
                    Authorization: `JWT ${token}`
                },
                body: {
                    nome: 'Conta alterada via rest iê'
                }
            }).as('response')
    
            cy.get('@response').its('status').should('be.equal', 200)
        })

    });

    it('Should not create an account with same name', () => {

        cy.request({
            method: 'POST',
                url:`https://barrigarest.wcaquino.me/contas/`,
                headers: {
                    Authorization: `JWT ${token}`
                },
                body: {
                    nome: 'Conta mesmo nome'
                },
                failOnStatusCode: false //Define que o que estamos esperando é realmente um response de falha
        }).as('response')

        cy.get('@response').then(res => {
            console.log(res)
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })

    })

    it('Should create a transaction', () => {

        cy.request({
            method: 'POST',
                url:`https://barrigarest.wcaquino.me/transacoes/`,
                headers: {
                    Authorization: `JWT ${token}`
                },
                body: {
                    conta_id: '41058',
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'), //O add adiciona uma quantidade de dias a data atual
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'), //Gera a data atual, o format irá formatar a data para o padrão informado
                    descricao: 'desc',
                    envolvido: 'inter',
                    status: true,
                    tipo: 'REC',
                    valor: '123'
                }
        }).as('response')

        cy.get('@response').its('status').should('be.equal', 201)

    });

    it.only('Should get balance', () => { //Esse teste não utiliza o token na requisição pois está usando o token gerado no commands overwrite
        cy.request({
            method: 'GET',
                url:`https://barrigarest.wcaquino.me/saldo/`,
                headers: {
                    Authorization: `JWT ${token}`
                }
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta == 'Conta para saldo')
                saldoConta = c.conta
            })
            expect(saldoConta).to.be.equal('534.00')
        })
        //No curso ele inseriu uma movimentação e realizou o get balance novamente verificando se o saldo havia sido alterado
    })

    it('Should remove a transaction', () => {
        cy.request({
            method: 'GET',
                url:`https://barrigarest.wcaquino.me/transacoes/`,
                headers: {
                    Authorization: `JWT ${token}`
                },
                qs: {
                    descricao: 'Mvimentação para exclusão'
                }
        }).then(res => {
            cy.request({
                method: 'DELETE',
                url:`https://barrigarest.wcaquino.me/transacoes/${res.body.id}`,
                headers: {
                    Authorization: `JWT ${token}`
                }
            })
        }).its('status').should('to.be.equal', 204)
    });

});