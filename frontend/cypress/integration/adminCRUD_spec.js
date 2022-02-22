describe("Admin creates Item", () => {
  it("navigate to admin page to create an Item", () => {
    cy.visit("/shop");
    // Click "Admin page" button
    cy.contains("Admin").click();
    // Fill in login/password
    cy.get("form").within(($form) => {
      cy.get('input[placeholder="Email"]').type("john@gmail.com");
      cy.get('input[placeholder="Password"]').type("pass111");
    });
    // Log in
    cy.contains("LOGIN").click();
    // Click "add new product" button
    cy.contains("Add new product").click();
    // Fill in the form
    cy.get("form").within(($form) => {
      cy.get('input[placeholder="Product name"]').type("Test item");
      cy.get('input[placeholder="Description (optional)"]').type(
        "Test description"
      );
      cy.get('input[placeholder="Price"]').type(199);
      cy.get('input[placeholder="Quantity"]').type(1);
    });
    // Click Save button
    cy.get("button").contains("Save").click();

    // Modify an item
    //cy.get('button').contains('Update').click(); - this expression doesn't work in all scenarios, figure out why.
    cy.contains("Update").click();
    cy.get("form").within(($form) => {
      cy.get('input[value="Phone XL"]').type(" Modified");
      cy.get('input[value="A large phone with one of the best screens"]').type(
        " Modified"
      );
      cy.get('input[value="799"]').type(1);
      cy.get('input[value="1"]').type(1);
    });
    // Save changes
    cy.get("button").contains("Save change").click();
  });
});

describe("Admin updates Item", () => {
  it("navigate to admin page to update item", () => {
    cy.visit("/shop");
    // Click "Admin page" button
    cy.contains("Admin").click();
    // Fill in login/password
    cy.get("form").within(($form) => {
      cy.get('input[placeholder="Email"]').type("john@gmail.com");
      cy.get('input[placeholder="Password"]').type("pass111");
    });
    // Log in
    cy.contains("LOGIN").click();
    // Click "add new product" button
    cy.contains("Add new product").click();
    // Fill in the form
    cy.get("form").within(($form) => {
      cy.get('input[placeholder="Product name"]').type("Test item");
      cy.get('input[placeholder="Description (optional)"]').type(
        "Test description"
      );
      cy.get('input[placeholder="Price"]').type(199);
      cy.get('input[placeholder="Quantity"]').type(1);
    });
    // Click Save button
    cy.get("button").contains("Save").click();

    // Modify an item
    //cy.get('button').contains('Update').click(); - this expression doesn't work in all scenarios, figure out why.
    cy.contains("Update").click();
    cy.get("form").within(($form) => {
      cy.get('input[value="Phone XL"]').type(" Modified");
      cy.get('input[value="A large phone with one of the best screens"]').type(
        " Modified"
      );
      cy.get('input[value="799"]').type(1);
      cy.get('input[value="1"]').type(1);
    });
    // Save changes
    cy.get("button").contains("Save change").click();
  });
});

describe("Admin deletes Item", () => {
  it("navigate to admin page to delete an Item", () => {
    cy.visit("/shop");
    // Click "Admin page" button
    cy.contains("Admin").click();
    // Fill in login/password
    cy.get("form").within(($form) => {
      cy.get('input[placeholder="Email"]').type("john@gmail.com");
      cy.get('input[placeholder="Password"]').type("pass111");
    });
    // Log in
    cy.contains("LOGIN").click();
    // Click "add new product" button
    cy.contains("Delete").click();
  });
});
