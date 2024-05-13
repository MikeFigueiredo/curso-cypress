/// <reference types ="cypress" />
it('Equality', () => {
    const a = 1
    
    expect(a).equal(1) // Comparação simples
    expect(a, 'Deveria ser 1').equal(2) // Além da verificação, o comando possui uma mensagem de retorno caso o assert falhe
    expect(a).to.be.equal(3) // Forma completa e melhor legível de escrever a sentença de forma afirmativa
    expect(a).not.to.be.equal(1) // Forma completa e melhor legível de escrever a sentença de forma negativa
})
it('Truthy', () => {
    const a = true
    const b = null
    let c 

    expect(a).to.be.true
    expect(true).to.be.true
    expect(b).to.be.null
    expect(a).to.be.not.null
    expect(c).to.be.undefined
})
it('Object Equality', () => {
    const obj = {
        a: 1,
        b: 2
    }

    expect(obj).to.be.equal(obj)
    expect(obj).to.be.equal({a:1, b:2}) // Embora os objetos sejam iguais nessa declaração, o interpretador verá que eles são objetos 
        //distintos, então o retorno será falha, para solucionar, use o comando DEEP
    expect(obj).to.be.deep.equal({a: 1, b: 2}) // Também funciona só inserindo "eql" no lugar do to.be.deep.equal
    expect(obj).include({c: 5}) // Verificar se a propriedade informada existe dentro do objeto com o valor informado
    expect(obj).to.have.property('b') // Verificar se a propriedade informada existe dentro do objeto
    expect(obj).to.have.property('b', 2) // Verificar se a propriedade informada existe dentro do objeto com o valor informado
    expect(obj).to.not.be.empty //Verificar se um objeto não está vazio
    expect({}).to.be.empty //Verificar se um objeto está vazio
})
it('Arrays', () => {
    const array = [1, 2, 3]

    expect(array).to.have.members([1, 2, 3]) // Verificar se determinados membros existem dentro de um array (mesma estrutura)
    expect(array).to.include.members([1, 3]) // Verificar se determinados membros estão adicionados dentro de um array
    expect(array).to.not.be.empty //Verificar se um array não está vazio
    expect([]).to.be.empty //Verificar se um array está vazio
})
it('Types', () => {
    const num = 1
    const str = 'String'

    expect(num).to.be.a('number') // Verifica se o parâmetro passado é do tipo number
    expect(str).to.be.a('string') // Verifica se o parâmetro passado é do tipo string
    expect({}).to.be.an('object') // Verifica se o parâmetro passado é do tipo object
    expect([]).to.be.an('array') // Verifica se o parâmetro passado é do tipo array
})
it('String', () => {
    const str = 'String de teste'
    expect(str).to.be.equal('String de teste') // Verifica se o parâmetro passado é igual ao texto informado
    expect(str).length(15) // Verifica se o parâmetro passado possui 15 caracteres
    expect(str).to.contains('de') // Verificar se o parâmetro informado contém a stirng passada para comparar
    expect(str).to.match(/^String/) // Sintaxe para trabaçhar com regex
})
it.only('Numbers', () => {
    const number = 4
    const floatNumber = 5.2123

    expect(number).to.be.equal(4) 
    expect(number).to.above(3) // acima de 3?
    expect(number).to.below(7) // abaixo de 7?
    expect(floatNumber).to.be.equal(5.2123)
    expect(floatNumber).to.be.closeTo(5.2, 0.1) // Verificar se está próximo do número floatNumber com a precisão de 0.1
})