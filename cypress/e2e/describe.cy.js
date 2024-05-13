/// <reference types="cypress"/>

it('A external test...', () => { // Teste externo

})


describe('Shold group tests...', () => { // Grupo de testes
    it('A internal test...', () => { // Teste interno

    })
    describe('Group more specific tests...', ()=> { // Sub Grupo dentro do grupo
        it.skip('A internal specific test...', () => { // Teste interno do sub grupo, com o skip não será executado

        })
    })
})