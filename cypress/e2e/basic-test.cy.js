describe('My First Test', () => {
  
  beforeEach(() => {
    cy.visit('http://localhost:3000/');
  });

  it('Access homepage', () => {
    cy.visit('http://localhost:3000/#/')
    cy.wait(1000)
});
    

it('Access Dashboard', () => {
cy.contains('Dashboard').click()
    cy.url().should('include' , '/dashboard/bitcoin')
    cy.wait(1000)
})


it('Access Tabs', () => {
cy.contains('Dashboard').click()
    cy.url().should('include' , '/dashboard/bitcoin')
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
})

it('Search a Valid Coin', () => {
  cy.contains('Dashboard').click()
      cy.url().should('include' , '/dashboard/bitcoin')
      cy.wait(1000)
      cy.get('#input1')
      .type('litecoin')
      .type('{enter}')
      cy.wait(1000)
      cy.url().should('include', '/dashboard/litecoin')
  })

it('Search an Invalid Coin', () => {
  cy.contains('Dashboard').click()
      cy.url().should('include' , '/dashboard/bitcoin')
      cy.wait(1000)
      cy.get('#input1')
      .type('asdf')
      .type('{enter}')
      cy.wait(1000)
      cy.url().should('include', '/dashboard/asdf')
  })

it('Get Historical Price Data', () => {
  cy.contains('Dashboard').click()
      cy.url().should('include' , '/dashboard/bitcoin')
      cy.wait(1000)
      cy.get('#input2')
      .type('2020-05-20')
      cy.get('#histButton').click()
      cy.wait(1000)
      
      cy.get('#input2')
      .type('2020-08-19')
      cy.get('#histButton').click()
      cy.wait(1000)
      
  })





})   
  


  



  //     cy.contains('Dacxi').click()
  //     cy.url().should('include', '/dashboard/dacxi')
  //     cy.wait(1000)


