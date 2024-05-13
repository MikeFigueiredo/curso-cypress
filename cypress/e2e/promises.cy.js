it('Sem testes ainda.', () => { })

/*
    1 - Função settimeout sem callback
        const getSomething = () => {
            setTimeout(() => {
                console.log('Fim do setTimeOut')
                return 11
            }, 1000)
        }

    2 - Função settimeout com callback
        const getSomething = callback => {
            setTimeout(() => {
                callback(12)
            }, 1000)
        }
        const system = () => {
            console.log('init')
            //const something = getSomething()
            getSomething(some => {
                console.log(`Something is ${some}`),
                console.log('end')
            })
            //console.log(`Something is ${something}`) 
            
        }
        system()
*/

/*
    Uma Promise em JavaScript é um objeto que representa a conclusão ou o fracasso eventual de uma operação assíncrona. Uma Promise pode estar em um dos três estados:
        Pending (Pendente): Estado inicial, antes que a operação seja concluída ou rejeitada.
        Fulfilled (Realizada): A operação foi concluída com sucesso, e o resultado está disponível.
        Rejected (Rejeitada): A operação falhou, e um motivo para a falha está disponível.
*/

const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13)
        }, 1000)
    })
}

const system = () => {
    console.log('init')
    //const something = getSomething()
    const prom = getSomething()
    prom.then(some => { // O then espera o prom ser resolvido para continuar
        console.log(`Something is ${some}`) 
    })
    //console.log(`Something is ${something}`) 
    
}
system()

