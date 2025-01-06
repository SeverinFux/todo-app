export {};

describe("todo tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should render the TODO-App header", () => {
        cy.get('.App-header').should('contain.text', 'TODO-App');
    });
});