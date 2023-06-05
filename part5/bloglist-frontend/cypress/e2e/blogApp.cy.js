/* eslint-disable no-undef */
describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  })
  it('Login form is shown', function() {
    // eslint-disable-next-line no-undef
    cy.visit('')
    // eslint-disable-next-line no-undef
    cy.contains('Log in to application')
  })
})

describe('Login', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
  })
  it('succeeds with correct credentials', function() {
    const user = {
      username: 'test1',
      name: 'test1',
      password: 'asdf1234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })
  it('fails with wrong credentials', function() {
    cy.get('#Username').type('test1')
    cy.get('#Password').type('wrong')
    cy.get('#login-button').click()

    cy.get('.error')
      .should('contain', 'Wrong credentials')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid')
  })
})