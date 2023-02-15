// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const PORT= 8080
Cypress.Commands.add('login', ({ kayttajanimi, salasana }) => {
  cy.request('POST', `http://localhost:${PORT}/api/login`, {
    kayttajanimi, salasana
  }).then(({ body }) => {
    localStorage.setItem('loggedBlogAppUser', JSON.stringify(body))
    cy.visit(`http://localhost:${PORT}`)
  })
})
Cypress.Commands.add('createBlog', ({ title, author, url, likes }) => {
  cy.request({
    url: `http://localhost:${PORT}/api/blogs`,
    method: 'POST',
    body: { 'title': title, 'author': author, 'url':url, 'likes': likes },
    headers: {
      'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogAppUser')).token}`
    }
  })

  cy.visit(`http://localhost:${PORT}`)
})