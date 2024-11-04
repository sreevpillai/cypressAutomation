class complianceMeasuresPage {
  elements = {
    riskAssessmentYesRadioButton: () => cy.get("div[id='i5']"),
    riskAssessmentNoRadioButton: () => cy.get("div[id='i8']"),
    auditedYesRadioButton: () => cy.get("div[id='i15']"),
    auditedNoRadioButton: () => cy.get("div[id='i18']"),
    submitButton: () => cy.contains("Submit"),
    backButton: () => cy.contains("Back"),
  };

  selectRiskAssementYes() {
    this.elements.riskAssessmentYesRadioButton().click();
  }
  selectRiskAssementNo() {
    this.elements.riskAssessmentNoRadioButton().click();
  }

  selectaudtiedYes() {
    this.elements.auditedYesRadioButton().click();
  }
  selectaudtiedNo() {
    this.elements.auditedNoRadioButton().click();
  }

  clickSubmit() {
    this.elements.submitButton().click();
  }
  clickBack() {
    this.elements.backButton().click();
  }

  riskLevelDataSelection(value) {
    switch (value) {
      case "Yes":
        this.selectRiskAssementYes();
        break;
      case "No":
        this.selectRiskAssementNo();
        break;
    }
  }
  complianceAuditDataSelection(value) {
    switch (value) {
      case "Yes":
        this.selectaudtiedYes();
        break;
      case "No":
        this.selectaudtiedNo();
        break;
    }
  }
}

export default new complianceMeasuresPage();
