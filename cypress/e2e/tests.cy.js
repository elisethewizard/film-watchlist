/// <reference types="cypress" />

import '../fixtures/search-page-1.json'
import '../fixtures/search-page-2.json'
import '../fixtures/id-1.json'
import '../fixtures/id-2.json'

beforeEach(() => {
    cy.visit('/')
})

it('navlinks have correct text and url', () => {
    cy.get('nav a').should('have.length', 2)
    cy.get('nav a')
        .first()
        .should('be.visible')
        .and('have.text', 'Find your film')
        .and('have.attr', 'href', '/')
    cy.get('nav a')
        .last()
        .should('be.visible')
        .and('have.text', 'My Watchlist')
        .and('have.attr', 'href', '/watchlist')
})

it('placeholders are displayed correctly', () => {
    cy.get('.results-placeholder-cont')
        .should('be.visible')
        .and('have.text', 'Start exploring')

    cy.visit('/watchlist')
    cy.get('.results-placeholder-cont')
        .should('be.visible')
        .and('include.text', 'Your watchlist is looking a little empty...')
    cy.get('.results-placeholder-cont a')
        .should('have.text', `Let's add some movies!`)
        .and('have.attr', 'href', '/')
})

it('should be able to type a query, and clear it', () => {
    cy.get('input#searchbar-input')
        .type('some query')
        .should('have.value', 'some query')
    cy.get('.clear-btn').click()
    cy.get('input#searchbar-input').should('not.have.value')
})

context('with search results', () => {
    beforeEach(() => {
        // stubbing
        cy.intercept('GET', '**/api/search/some%20query/1', { fixture: '/search-page-1.json' }).as('getPage1')
        cy.intercept('GET', '**/api/search/some%20query/2', { fixture: '/search-page-2.json' }).as('getPage2')
        cy.intercept('GET', '**/api/id/*', { fixture: '/id-2.json' })
        cy.intercept('GET', '**/api/id/1', { fixture: '/id-1.json' }).as('getFilm1')
        cy.intercept('GET', '**/api/id/10', { fixture: '/id-2.json' }).as('getFilm10')
        cy.intercept('GET', '**/api/id/20', { fixture: '/id-2.json' }).as('getFilm20')
    
        // clear potential previous input
        cy.get('.clear-btn').click()
    
        cy.get('input#searchbar-input').type('some query')
        cy.get('.search-btn').click()
    })

    it('should be able to submit query and get matching results', () => {
        // checking loading text + correct url
        cy.get('.loading').should('contain.text', 'Searching')
        cy.wait('@getPage1').its('request.url').should('include', '/api/search/some%20query/1')
        cy.get('.loading').should('contain.text', 'Loading films')
        cy.wait('@getFilm10').its('request.url').should('include', '/api/id/10')
    
        // making sure correct results are displayed
        cy.get('.list-cont').children().should('have.length', 10)
        cy.get('.list-cont li h1').first().should('have.text', 'Title 1')
        cy.get('.list-cont li h1').last().should('have.text', 'Title 2')
    })

    context('after results are loaded', () => {
        beforeEach(() => {
            cy.wait('@getFilm10')
        })
    
        context('after clicking add', () => {
            beforeEach(() => {
                cy.get('.list-cont li').first().getByRole('button').click()
            })
    
            it('should be able to add a film to watchlist', () => {
                // button text should change to remove
                cy.get('.list-cont li').first().getByRole('button').should('have.text', 'Remove')
    
                // id should be saved to localStorage
                cy.getAllLocalStorage().then((result) => {
                    const storedValues = Object.values(result)[0]
                    expect(storedValues).to.deep.equal({
                        'watchlist': '["1"]'
                    })
                })
            })
    
            it('should be able to remove a film', () => {
                cy.get('.list-cont li').first().getByRole('button').click()
    
                // button text should change back
                cy.get('.list-cont li').first().getByRole('button').should('have.text', 'Watchlist')
    
                // localStorage should be empty
                cy.getAllLocalStorage().then((result) => {
                    const storedValues = Object.values(result)[0]
                    expect(storedValues).to.deep.equal({
                        'watchlist': '[]'
                    })
                })
            })
    
            it('added film should show on watchlist page', () => {
                cy.visit('/watchlist')
    
                // should no longer show placeholder
                cy.get('.results-placeholder').should('not.exist')
    
                // should have one list element with correct title
                cy.get('ul').children().should('have.length', 1).find('h1').should('have.text', 'Title 1')
            })
        })
    
        describe('pagination works', () => {
            it('has correct base state', () => {
                cy.get('.pagination button')
                    .first()
                    .should('be.hidden')
                    .and('be.disabled')
                cy.get('.pagination span').should('have.text', 'Page 1')
                cy.get('.pagination button')
                    .last()
                    .should('be.visible')
                    .and('not.be.disabled')
            })
    
            it('clicking on next should load next page', () => {
                cy.get('.pagination button').last().click()
    
                cy.wait('@getPage2').its('request.url').should('include', '/api/search/some%20query/2')
                cy.wait('@getFilm20').its('request.url').should('include', '/api/id/20')
    
                // should have right state
                cy.get('.pagination button')
                    .first()
                    .should('be.visible')
                    .and('not.be.disabled')
                cy.get('.pagination span').should('have.text', 'Page 2')
                cy.get('.pagination button')
                    .last()
                    .should('be.hidden')
                    .and('be.disabled')
            })
        })
    })
})