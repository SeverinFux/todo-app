export {};

describe("TODO App Tests", () => {
    beforeEach(() => {
        cy.visit("/");
    });

    it("should render the TODO-App header", () => {
        cy.get('.App-header').should('contain.text', 'TODO-App');
    });

    it("should add a new TODO item", () => {
        const todoText = "Buy groceries";
        cy.get('input[placeholder="Add a new task..."]').type(`${todoText}{enter}`);
        cy.get('.todo-list').should('contain.text', todoText);
    });

    it("should mark a TODO item as completed", () => {
        const todoText = "Walk the dog";
        cy.get('input[placeholder="Add a new task..."]').type(`${todoText}{enter}`);
        cy.get('.todo-list li').contains(todoText).parent().find('input[type="checkbox"]').check();
        cy.get('.todo-list li').contains(todoText).should('have.class', 'completed');
    });

    it("should delete a TODO item", () => {
        const todoText = "Read a book";
        cy.get('input[placeholder="Add a new task..."]').type(`${todoText}{enter}`);
        cy.get('.todo-list li').contains(todoText).parent().find('.delete-btn').click();
        cy.get('.todo-list').should('not.contain.text', todoText);
    });

    it("should show the correct count of pending tasks", () => {
        cy.get('input[placeholder="Add a new task..."]').type(`Task 1{enter}`);
        cy.get('input[placeholder="Add a new task..."]').type(`Task 2{enter}`);
        cy.get('.task-count').should('contain.text', '2 tasks left');
        cy.get('.todo-list li').contains('Task 1').parent().find('input[type="checkbox"]').check();
        cy.get('.task-count').should('contain.text', '1 task left');
    });
});
