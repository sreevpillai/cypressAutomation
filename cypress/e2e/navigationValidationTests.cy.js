import generalPage from "../pages/generalPage";
import riskManagementPage from "../pages/riskManagement";
import dataSecurityPage from "../pages/dataSecurity";
import complianceMeasuresPage from "../pages/complianceMeasures";

describe("navigationValidation", () => {
  var data;
  before(() => {
    cy.fixture("navigationValidationData.json").then((value) => {
      data = value;
    });
  });

  // This tests validate the conditonal navigation depends on the senstive data
  it("conditonal Navigation data driven by sensitive data", () => {
    data?.forEach((userdata) => {
      generalPage.visit();
      generalPage.setDeploymentName(userdata.deploymentName);
      generalPage.setEmailAddress(userdata.email);
      generalPage.clickNextToRiskManagementPage();

      cy.contains("AI Risk Management").should("exist");

      if (userdata.sensitiveData === "Yes") {
        riskManagementPage.sensitiveDataSelection(userdata.sensitiveData);
        riskManagementPage.clickNextToGoToPage();

        cy.contains("Data Security").should("exist");
      } else if (userdata.sensitiveData === "No") {
        riskManagementPage.sensitiveDataSelection(userdata.sensitiveData);
        riskManagementPage.riskLevelSelection(userdata.riskLevel);
        riskManagementPage.clickNextToGoToPage();

        cy.contains("Compliance Measures").should("exist");
        cy.contains("Data Security").should("not.exist");
      }
    });
  });
  // This test validate the end to end  navigation
  it("end to end pages navigation valiation ", () => {
    data?.forEach((userdata) => {
      generalPage.visit();
      generalPage.setDeploymentName(userdata.deploymentName);
      generalPage.setEmailAddress(userdata.email);
      generalPage.clickNextToRiskManagementPage();

      cy.contains("AI Risk Management").should("exist");

      riskManagementPage.sensitiveDataSelection(userdata.sensitiveData);
      riskManagementPage.riskLevelSelection(userdata.riskLevel);
      riskManagementPage.clickNextToGoToPage();

      if (userdata.sensitiveData === "Yes") {
        cy.contains("Data Security").should("exist");
        dataSecurityPage.setSecurityMeasures(userdata.securityMeasures);
        dataSecurityPage.encryptionDataSelection(userdata.encryption);
        dataSecurityPage.clickNextToComplianceMeasurePage();
      }
      cy.contains("Compliance Measures").should("exist");

      complianceMeasuresPage.riskLevelDataSelection(userdata.riskAssessment);
      complianceMeasuresPage.complianceAuditDataSelection(userdata.audit);
      complianceMeasuresPage.clickSubmit();

      cy.contains("Your response has been recorded.").should("exist");
    });
  });
});
