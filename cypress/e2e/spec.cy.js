describe('My First Test', () => {
  it('Gets, types and asserts', () => {
    cy.visit('http://localhost:3000/#/')
cy.wait(1000)
    cy.contains('Dashboard').click()

    // Should be on a new URL which
    // includes '/commands/actions'
    cy.url().should('include', '/dashboard/bitcoin')
    cy.wait(1000)
    cy.contains('Ethereum').click()
    cy.url().should('include', '/dashboard/ethereum')
    cy.wait(1000)
    cy.contains('Dacxi').click()
    cy.url().should('include', '/dashboard/dacxi')
    cy.wait(1000)
    cy.contains('Luna').click()
    cy.url().should('include', '/dashboard/terra-luna-2')
    cy.wait(1000)
    cy.contains('Cosmos').click()
    cy.url().should('include', '/dashboard/cosmos')
    cy.wait(1000)

    // Get an input, type into it and verify
    // that the value has been updated
    cy.get('#input1')
      .type('litecoin')
      .type('{enter}')
      cy.wait(1000)
      cy.url().should('include', '/dashboard/litecoin')

    cy.get('#input2')
    .type('2020-05-20')
    cy.get('#histButton').click()
    cy.wait(1000)
    
    cy.get('#input2')
    .type('2020-08-19')
    cy.get('#histButton').click()
    cy.wait(1000)

    cy.get('#input1')
      .type('asdf')
      .type('{enter}')
      cy.wait(1000)
      cy.url().should('include', '/dashboard/asdf')

      cy.contains('Dacxi').click()
      cy.url().should('include', '/dashboard/dacxi')
      cy.wait(1000)

  })
})