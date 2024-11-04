class riskManagementPage {
  elements = {
    sensitiveDataYesRadioButton: () =>
      cy.get("div[role='radio'][data-value='Yes']"),
    sensitiveDataNoRadioButton: () =>
      cy.get("div[role='radio'][data-value='No']"),
    levelOfRiskLowRadioButton: () =>
      cy.get("div[role='radio'][data-value='Low']"),
    levelOfRiskMediumRadioButton: () =>
      cy.get("div[role='radio'][data-value='Medium']"),
    levelOfRiskHighRadioButton: () =>
      cy.get("div[role='radio'][data-value='High']"),
    nextButton: () => cy.contains("Next"),
    backButton: () => cy.contains("Back"),
  };

  selectSensitiveDataYes() {
    this.elements.sensitiveDataYesRadioButton().click();
  }
  selectSensitiveDataNo() {
    this.elements.sensitiveDataNoRadioButton().click();
  }
  selectlevelOfRiskLow() {
    this.elements.levelOfRiskLowRadioButton().click();
  }
  selectlevelOfRiskMedium() {
    this.elements.levelOfRiskMediumRadioButton().click();
  }
  selectlevelOfRiskHigh() {
    this.elements.levelOfRiskHighRadioButton().click();
  }
  clickNextToGoToPage() {
    this.elements.nextButton().click();
  }
  sensitiveDataSelection(value) {
    switch (value) {
      case "Yes":
        this.selectSensitiveDataYes();
        break;
      case "No":
        this.selectSensitiveDataNo();
        break;
    }
  }
  riskLevelSelection(riskValue) {
    switch (riskValue) {
      case "Low":
        this.selectlevelOfRiskLow();
        break;
      case "Medium":
        this.selectlevelOfRiskMedium();
        break;
      case "High":
        this.selectlevelOfRiskHigh();
        break;
    }
  }
}

export default new riskManagementPage();
