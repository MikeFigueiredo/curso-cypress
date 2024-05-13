it('nada agora',function(){})

/*

    1 - Declaração de função

        function soma (a, b){
            return a + b
        }

    2 - Declaração de função armazenando em uma const

        const soma = function (a, b){
            return a + b
        }

    3 - Declaração de função arrow

        const soma = (a, b) => {
            return a + b
        }

    4 - Declaração de função arrow com retorno implícito

        const soma = (a, b) => a + b

    5 - Declaração de função arrow com retorno implícito utilizando um único parâmetro

        const soma = a => a + a

*/

const soma = (a, b) => a + b
console.log(soma(1,8))