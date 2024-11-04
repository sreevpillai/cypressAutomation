import { visitURL } from "../support/constant";

class generalPage {
  elements = {
    deploymentNameTextbox: () => cy.get("input[type='text']"),
    emailAdressField: () => cy.get("input[type='email']"),
    nextButton: () => cy.contains("Next"),
    invalidEmailError: () => cy.contains("Please enter a valid email address."),
    nullDeploymentError: () => cy.contains("This is a required question"),
  };

  visit() {
    cy.visit(visitURL);
  }
  setDeploymentName(deploymentName) {
    this.elements.deploymentNameTextbox().type(deploymentName);
  }
  setEmailAddress(email) {
    this.elements.emailAdressField().type(email);
  }
  clickNextToRiskManagementPage() {
    this.elements.nextButton().click();
  }
}

export default new generalPage();
