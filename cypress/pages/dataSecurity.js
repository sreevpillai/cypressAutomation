class dataSecurityPage {
  elements = {
    encryptionImplimentYesRadioButton: () =>
      cy.get("div[role='radio'][data-value='Yes']"),
    encryptionImplimentNoRadioButton: () =>
      cy.get("div[role='radio'][data-value='No']"),
    securityMeasureTextbox: () => cy.get("textarea[aria-label='Your answer']"),
    nextButton: () => cy.contains("Next"),
    backButton: () => cy.contains("Back"),
  };

  selectEncryptionYes() {
    this.elements.encryptionImplimentYesRadioButton().click();
  }
  selectEncryptionNo() {
    this.elements.encryptionImplimentNoRadioButton().click();
  }
  setSecurityMeasures(securityMeasures) {
    this.elements.securityMeasureTextbox().type(securityMeasures);
  }
  clickNextToComplianceMeasurePage() {
    this.elements.nextButton().click();
  }

  encryptionDataSelection(value) {
    switch (value) {
      case "Yes":
        this.selectEncryptionYes();
        break;
      case "No":
        this.selectEncryptionNo();
        break;
    }
  }
}

export default new dataSecurityPage();
