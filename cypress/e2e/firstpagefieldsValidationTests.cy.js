import generalPage from "../pages/generalPage";


describe("generalpagefieldsValidationTests", () => {
  var data;
  before(() => {
    cy.fixture("firstpagefieldsValidationData.json").then((value) => {
      data = value;
    });
  });

// this test  validate the general page ( or first page) feilds  

  it("First page fields & data validations ", () => {
    data?.forEach((userdata) => {
      generalPage.visit();
      if (userdata.deploymentName) {
        generalPage.setDeploymentName(userdata.deploymentName);
      }
      generalPage.setEmailAddress(userdata.email);
      generalPage.clickNextToRiskManagementPage();

      if (!userdata.deploymentName) {
        cy.contains("This is a required question").should("exist");
      } else if (
        userdata.email.indexOf("@") > -1 &&
        userdata.email.endsWith(".com")
      ) {
        cy.contains("AI Risk Management").should("exist");
      } else {
        cy.contains("Please enter a valid email address.").should("exist");
      }
    });
  });
  
  // add more page specific fields & data  validation tests here
});
