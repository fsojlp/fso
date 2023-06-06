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

/*describe('Login', function() {
  beforeEach(function() {
    cy.visit('')
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'test1',
      name: 'test1',
      password: 'asdf1234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
  })
  it('succeeds with correct credentials', function() {
    cy.get('#Username').type('test1')
    cy.get('#Password').type('asdf1234')
    cy.get('#login-button').click()
    cy.contains('test1 has logged in')
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
})*/

describe.only('When logged in', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      username: 'test1',
      name: 'test1',
      password: 'asdf1234'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/login`, { 'username': 'test1', 'password': 'asdf1234' })
      .then(response => {
        window.localStorage.setItem('loggedBloglistAppUser', JSON.stringify(response.body))
        cy.visit('')
      })
  })
  it('A blog can be created', function() {
    cy.get('#newNote').click()
    cy.get('#Title').type('test1')
    cy.get('#Author').type('author1')
    cy.get('#Url').type('url1')
    cy.get('#createNote').click()
  })
  it('A blog can be liked', function() {
    cy.get('#newNote').click()
    cy.get('#Title').type('test1')
    cy.get('#Author').type('author1')
    cy.get('#Url').type('url1')
    cy.get('#createNote').click()
    cy.get('#showDetails').click()
    cy.get('#Like').click()
  })
  it('A blog can be removed', function() {
    cy.get('#newNote').click()
    cy.get('#Title').type('test1')
    cy.get('#Author').type('author1')
    cy.get('#Url').type('url1')
    cy.get('#createNote').click()
    cy.get('#showDetails').click()
    cy.get('#RemoveClick').click().then(() => {
      cy.on('window:confirm', cy.stub().returns(false))
    })
  })
})