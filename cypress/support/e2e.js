// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')


/*
    Ordem de prioridade na captura de elementos
        1 - data-cy
        2 - data-test
        3 - data-testid
        4 - id
        5 - class
        6 - tag
        7 - attributes
        8 - nth-child

    Cypress.SelectorPlayground.defaults({ // Define a ordem de priorização das buscas
        selectorPriority: ['data-cy', 'data-test', 'data-testid', 'id', 'class', 'tag', 'attributes', 'nth-child']
    })

*/
