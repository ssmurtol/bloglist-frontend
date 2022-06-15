describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Anni',
      username: 'asdfg',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('log in to application')
  })
  it('Login form can be opened with correct credentials', function() {
    cy.get('input:first').type('asdfg')
    cy.get('input:last').type('salainen')
    cy.contains('login').click()

    cy.contains('Anni logged in')
  })
  it('Login fails with wrong credentials', function() {
    cy.get('input:first').type('aaaaa')
    cy.get('input:last').type('bbbbbb')
    cy.contains('login').click()

    cy.contains('wrong username or password')
  })
})