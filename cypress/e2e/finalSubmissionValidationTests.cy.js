import generalPage from "../pages/generalPage";
import riskManagementPage from "../pages/riskManagement";
import dataSecurityPage from "../pages/dataSecurity";
import complianceMeasuresPage from "../pages/complianceMeasures";
import { formActionURL } from "../support/constant";

describe("Form Submission", () => {
  var data;
  before(() => {
    cy.fixture("finalSubmissionValidationData.json").then((value) => {
      data = value;
    });
  });
  it("should intercept the form submit request", () => {
    data.forEach((userdata) => {
      generalPage.visit();

      // Intercept the form submit request
      cy.intercept("POST", formActionURL).as("formSubmitData");

      // Fill out the form
      generalPage.setDeploymentName(userdata.deploymentName);
      generalPage.setEmailAddress(userdata.email);
      generalPage.clickNextToRiskManagementPage();

      riskManagementPage.sensitiveDataSelection(userdata.sensitiveData);
      riskManagementPage.riskLevelSelection(userdata.riskLevel);
      riskManagementPage.clickNextToGoToPage();

      if (userdata.sensitiveData === "Yes") {
        dataSecurityPage.setSecurityMeasures(userdata.securityMeasures);
        dataSecurityPage.encryptionDataSelection(userdata.encryption);
        dataSecurityPage.clickNextToComplianceMeasurePage();
      }
      complianceMeasuresPage.riskLevelDataSelection(userdata.riskAssessment);
      complianceMeasuresPage.complianceAuditDataSelection(userdata.audit);
      complianceMeasuresPage.clickSubmit();

      // Wait for the intercepted request and validate it
      if (userdata.sensitiveData === "Yes") {
        cy.wait("@formSubmitData");
      }
      cy.wait("@formSubmitData");
      cy.wait("@formSubmitData");
      cy.wait("@formSubmitData").then((interception) => {
        const requestBody = decodeURIComponent(interception.request.body);
        if (requestBody.indexOf("continue=1") < 0) {
          expect(requestBody).to.include(userdata.deploymentName);
          expect(requestBody).to.include(userdata.email);
          if (userdata.sensitiveData === "Yes") {
            expect(requestBody).to.include(userdata.securityMeasures);
          }
          expect(requestBody).to.include(userdata.riskLevel);
        }
      });
    });
  });
});
