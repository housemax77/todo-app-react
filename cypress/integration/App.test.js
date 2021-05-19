/// <reference types="cypress" />
function addToDos() {
  addToDo("Blah", "17:30");
  addToDo("Blahhh", "17:29");
}

function addToDo(toDo, time) {
  cy.findByPlaceholderText("To Do").type(toDo);
  cy.findByLabelText("To Do Time").type(time);
  cy.findByRole("button", { name: "Add To Do" }).click();
}

context("To do app", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000/");
  });

  it("should display right text for heading", () => {
    expect(cy.findByLabelText("Page Heading".valueOf("To Do List")));
  });

  it("should support sorting by time", () => {
    addToDos();
    cy.findByLabelText("Sort By Time").click({ force: true });
    cy.findByLabelText("Did you Blahhh?").should("exist");
  });

  it("should support sorting alphabetically", () => {
    addToDo("Bla", "17:20");
    cy.findByLabelText("Sort Alphabeticlly").click({ force: true });
    cy.findByLabelText("Did you Bla?").should("exist");
  });

  it("should support deleting todo", () => {
    addToDos();
    addToDo("Bla", "17:12");
    cy.findByLabelText("Delete Bla To Do?").click();
    cy.on("window:confirm", () => true);
    cy.findByLabelText("Did you Blahhh?").should("exist");
    cy.findByLabelText("Did you Bla?").should("not.exist");
  });

  it("should support cancelling deleting todo", () => {
    addToDos();
    cy.findByLabelText("Delete Blahhh To Do?").click();
    cy.on("window:confirm", () => false);
    cy.findByLabelText("Did you Blahhh?").should("exist");
  });

  it("should support marking as done", () => {
    addToDos();
    cy.findByLabelText("Did you Blahhh?").click();
    cy.findByLabelText("To Do and time text 1").should("have.class", "checked");
    cy.findByLabelText("Did you Blahhh?").click();
  });

  it("should support editing todos", () => {
    addToDos();
    cy.findByText("Blahhh at 17:29").click();
    cy.findByLabelText("Enter New Text For Blahhh Here").type("h");
    cy.wait(150);
    cy.findByRole("button", { name: "Save Changes" }).click();
    cy.findByText("Blahhhh at 17:29").should("exist");
    //Making sure editing toDo doesn't affect other toDo
    cy.findByText("Blah at 17:30").should("exist");
  });

  it("should support editing times", () => {
    addToDos();
    cy.findByText("Blahhh at 17:29").click();
    cy.findByLabelText("Enter New Time For 17:29 Here").type("17:22");
    cy.wait(150);
    cy.findByRole("button", { name: "Save Changes" }).click();
    cy.findByText("Blahhh at 17:22").should("exist");
    //Making sure editing time doesn't affect other toDo
    cy.findByText("Blah at 17:30").should("exist");
  });

  it("should support searching todos", () => {
    addToDos();
    cy.findByLabelText("Text To Search To Do").type("B");
    expect(
      cy.findByLabelText("Text To Search To Do".valueOf("Did you Blahhh?".text))
    );
    addToDo("UwU", "17:42");
    cy.findByText("UwU").should("not.exist");
  });

  it("should support saving changes on page reload", () => {
    addToDos();
    cy.findByText("17:29").click();
    cy.findByLabelText("Enter New Time For 17:29 Here").type("17:22");
    cy.reload();
    cy.findByText("17:22").should("exist");
  });

  it("should support sorting then editing toDos", () => {
    addToDos();
    cy.findByLabelText("Sort By Time").click({ force: true });
    cy.findByLabelText("Did you Blahhh?").should("exist");
    cy.findByText("Blahhh").click();
    cy.findByLabelText("Enter New Text For Blahhh Here").type("h");
    cy.wait(150);
    cy.findByRole("button", { name: "Save Changes" }).click();
    cy.findByText("Blahhhh").should("exist");
  });
});
