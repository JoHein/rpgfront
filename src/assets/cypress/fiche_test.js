describe('Test Fiche Page', function() {
	
  it('Visit Fiche from Home Page', function() {
    cy.visit('/')
	
	
	    cy.contains('Fiche').click()
		
		cy.url().should('include', '/fiche')

  })
  
  it('Fill Fiche and Register', function() {
	
  	    cy.get('input[name="nom"]')
	    .type('Kyky')
	    .should('have.value', 'Kyky')
		
		cy.get('input[name="prenom"]')
	    .type('Coco')
	    .should('have.value', 'Coco')
		
		cy.get('input[name="age"]')
	    .type('30')
	    .should('have.value', '30')
		
		cy.get('p-inputSwitch[name="gender"]')
	    .click('left')
	    .should('contain', 'Femelle')
		
		cy.get('input[name="agilite"]')
	    .type('10')
	    .should('have.value', '10')
		
		cy.get('input[name="force"]')
	    .type('20')
	    .should('have.value', '20')
		
		cy.get('input[name="intelect"]')
	    .type('30')
	    .should('have.value', '30')
		
		cy.get('input[name="magie"]')
	    .type('40')
	    .should('have.value', '40')
		
		cy.get('input[name="endurance"]')
	    .type('45')
	    .should('have.value', '45')
		
		cy.get('input[name="charisme"]')
	    .type('50')
	    .should('have.value', '50')
		
		cy.get('p-dropdown[name="spe"]')
		.click('right')
		cy.get('.ui-dropdown-items > :nth-child(3)').click('center')		
		cy.get('.ui-dropdown-label')
		.should('have.value', 'Scout')
		
		cy.get('textarea[name="description"]')
		.type('Test valide  dans description')
		.should('have.value', 'Test valide  dans description')
				
  })
  
    it('Save button', function() {
		cy.server()
		cy.route('POST', '/api/champ', {nom: 'Kyky', prenom: 'Coco'}).as('postComment')

		cy.get('p-button').click()
		cy.wait('@postComment')

		cy.get('@postComment').should((xhr) => {
		  expect(xhr.responseBody).to.have.property('nom', 'Kyky')
		  expect(xhr.responseBody).to.have.property('prenom', 'Coco')

		})
		
	})  
	
})
