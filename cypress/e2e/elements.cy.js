/// <reference types="cypress" />

describe('Work with elements', () =>{
    before(() => { //Hook, função que é executada uma única vez antes de todos os testes serem executados
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
    beforeEach(() => { //Hook, função que é executada antes de cada teste ser executado
        cy.reload()
    })
    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...') // Verifica se existe o texto na página
    })

    it('Links', () => {
         cy.get('a').click()
         cy.reload() //Recarrega a página
         cy.get('#resultado').should('have.not.text', 'Voltou!')
         cy.contains('Voltar').click() // Localiza pelo texto
         cy.get('#resultado').should('have.text', 'Voltou!')
    })
    it('textFields', ()=> {
        cy.get('#formNome').type('Mike Figueiredo') //Insere informação em um txtBox
        cy.get('#formNome').should('have.value', 'Mike Figueiredo') // Dessa forma não funciona pois o texto está dentro de um input -> cy.get('#formNome').should('have.text', 'Mike Figueiredo') 
        cy.get('#elementosForm\\:sugestoes').type('textarea').should('have.value', 'textarea') //Utilizar duas barras antes de : para que o Cypress não tente interpretar o :
        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input').type('???')
        cy.get('[data-cy="dataSobrenome"]').type('Teste12345{backspace}{backspace}') // O backspace apaga o último caracter do dado
        cy.get('#elementosForm\\:sugestoes').clear().type('Erro{selectall}acerto', {delay:100}).should('have.value', 'acerto') // o clear limpa o campo
    })
    it('Radio button', () => {
        cy.get('#formSexoFem').click().should('be.checked') // Verifica se um radio button está setado (clicado)
        cy.get('#formSexoMasc').should('not.be.checked') // Verifica se um radio button não está setado (clicado)
        cy.get("[name='formSexo']").should('have.length', 2) // Verifica quantos elementos serão encontrados com esse name
    })
    it('Checkbox', () => {
        cy.get('#formComidaPizza').click().should('be.checked')
        cy.get('[name=formComidaFavorita]').click({multiple: true})
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })
    it('ComboBox', () => {
        cy.get('[data-test="dataEscolaridade"]').select('2o grau completo').should('have.value', '2graucomp') // O select seleciona a opção do comboBox para peencher o campo
        
        cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)
        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = []
            $arr.each(function() { // O function foi usado por causa do tihs, sempre que usar o tihs tem que ser function
                values.push(this.innerHTML) // Adiciona os valores dentro do objeto values
            })
            expect(values).to.include.members(['Superior', 'Mestrado'])
        })
        
    })
    it.only('ComboMultiplo', () => {
        cy.get('[data-testid="dataEsportes"]').select(['natacao', 'Corrida']) // No combo múltiplo deve-se utilizar o array para enviar os valores
        //cy.get('[data-testid="dataEsportes"]').should('have.value', ['natacao', 'Corrida'])
        //TO DO validar opções selecionadas do combo múltiplo
        cy.get('[data-testid="dataEsportes"]').then($el => {
            expect($el.val()).to.be.deep.equal(['natacao', 'Corrida'])
        })
    })
})