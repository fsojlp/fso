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