export {};

describe("TODO App Tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should render the TODO-App header", () => {
        cy.get('.App-header').should('contain.text', 'TODO-App');
    });

    it("add a new TODO item", () => {
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

    it("mark a TODO item as completed", () => {
        cy.get('table').should('contain.text', 'Aufräumen');
        cy.get(':nth-child(1) > :nth-child(6) > .ant-btn').click() // DONE Button on "Aufräumen"
        cy.get('.ant-popconfirm-buttons > .ant-btn-primary').click(); // Confirm
        cy.get('table').should('not.contain.text', 'Aufräumen');
    });
    it("sort TODOs by priorities", () => {
        cy.get(':nth-child(3) > .ant-segmented-group > :nth-child(2) > .ant-segmented-item-label')
        cy.get('table').should('contain.text', 'Aufräumen');
        cy.get(':nth-child(3) > .ant-segmented-group > :nth-child(3) > .ant-segmented-item-label')
        cy.get('table').should('contain.text', 'Einkaufen');
        cy.get(':nth-child(3) > .ant-segmented-group > :nth-child(4) > .ant-segmented-item-label')
        cy.get('table').should('contain.text', 'Znacht kochen');
        cy.get(':nth-child(3) > .ant-segmented-group > .ant-segmented-item-selected > .ant-segmented-item-label').click(); // All
        cy.get('table').should('contain.text', 'Aufräumen');
        cy.get('table').should('contain.text', 'Einkaufen');
        cy.get('table').should('contain.text', 'Znacht kochen');
    });

    it("sort TODOs by Category and edit to get custom Category", () => {
        cy.get(':nth-child(5) > .ant-segmented-group > :nth-child(2) > .ant-segmented-item-label').click() // Category
        cy.get('table').should('contain.text', 'Aufräumen');
        cy.get(':nth-child(5) > .ant-segmented-group > :nth-child(4) > .ant-segmented-item-label').click() // Work (none)
        cy.get('table').should('not.contain.text', 'Aufräumen');
        cy.get('table').should('not.contain.text',  'Einkaufen');
        cy.get('table').should('not.contain.text',  'Znacht kochen');
        cy.get(':nth-child(5) > .ant-segmented-group > :nth-child(1) > .ant-segmented-item-label').click() // All
        cy.get(':nth-child(1) > :nth-child(5) > .ant-btn').click() // Edit Button on "Aufräumen"
        cy.get('#categoryInput').type('{selectall}{del}Custom Category{enter}') // create custom category
        cy.get(':nth-child(7) > .ant-segmented-item-label').click() // Sort by Custom Category
        cy.get('table').should('contain.text', 'Aufräumen');
        cy.get('table').should('not.contain.text',  'Znacht kochen');

    });

    it("sort TODOs by Date", () => {
        cy.get('[title="Todo until"] > .ant-table-column-sorters').click() // sort by date (desc) high to low
        cy.get('.ant-table-tbody > :nth-child(1) > .ant-table-column-sort').should('contain.text', '03/09/2021') // first row
        cy.get('.ant-table-tbody > :nth-child(3) > .ant-table-column-sort').should('contain.text', '01/09/2021') // last row
        cy.get('[title="Todo until"] > .ant-table-column-sorters').click() // cancel sort
        cy.get('[title="Todo until"] > .ant-table-column-sorters').click() // sort by date (asc) low to high
        cy.get('.ant-table-tbody > :nth-child(1) > .ant-table-column-sort').should('contain.text', '01/09/2021') // first row
        cy.get('.ant-table-tbody > :nth-child(3) > .ant-table-column-sort').should('contain.text', '03/09/2021') // last row
    });
});
