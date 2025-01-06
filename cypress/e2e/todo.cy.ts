export {};

describe("TODO App Tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should render the TODO-App header", () => {
        cy.get('.App-header').should('contain.text', 'TODO-App');
    });

    it("should add a new TODO item", () => {
        cy.get('button').contains('+').click();
        cy.get('input[placeholder="Task Title"]').type('New Task');
        cy.get('#priority > .ant-segmented-group > :nth-child(3) > .ant-segmented-item-label').click(); // Low
        cy.get('input[id="categoryInput"]').type('{selectall}{del}Per{downarrow}{enter}') // use auto complete
        cy.get('input[placeholder="Select date"]').type('31-12-2025');

        cy.get('button').contains('Add Task').click(); //click out of Date selector
        cy.get('button').contains('Add Task').click();


        //check the 5th row
        cy.get(':nth-child(4) > [title="New Task"]').should('be.visible');
        cy.get(':nth-child(4) > [title="Personal"]').should('be.visible');
        cy.get(':nth-child(4) > [title="low"]').should('be.visible');
    });

    it("should mark a TODO item as completed", () => {
        cy.get('table tr').eq(1).find('button').contains('Done').click();
        cy.get('table').should('not.contain.text', 'Testeee');
    });
});
